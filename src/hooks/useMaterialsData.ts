import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface Material {
  id: number;
  title: string;
  file_type: "pdf" | "url" | "image" | "video" | string;
  url?: string;
  file_url?: string;
  size?: number;
  created_at?: string;
  module_id?: number;
}

export function useMaterialsData(courseId: number) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [moduleIdFilter, setModuleIdFilter] = useState<string>("");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("");

  const token = localStorage.getItem("access_token") || localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  const fetchMaterials = async () => {
    if (!token) {
      setError("No authentication token found. Please sign in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: Record<string, any> = {};

      if (moduleIdFilter.trim()) params.module_id = moduleIdFilter.trim();
      if (fileTypeFilter.trim()) params.file_type = fileTypeFilter.trim();
      if (searchQuery.trim()) params.q = searchQuery.trim();

      const res = await axiosInstance.get(`/courses/${courseId}/materials`, { params });

      const fetchedData = res.data;
      const materialsArray = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || fetchedData?.materials || []);
      setMaterials(Array.isArray(materialsArray) ? materialsArray : []);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Failed to load course materials"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (materialId: number, title: string) => {
    if (!token) {
      alert("Please sign in to download files.");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/courses/${courseId}/materials/${materialId}/download?expires_seconds=3600`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to download material");
      }

      const contentType = res.headers.get('content-type') || '';

      const downloadBlob = (blobData: Blob, cType: string, fileTitle: string, urlToExtractExt?: string) => {
        const url = window.URL.createObjectURL(blobData);
        const link = document.createElement("a");
        link.href = url;
        
        let fileName = `${fileTitle.replace(/\\s+/g, "_") || "material"}`;
        if (!fileName.includes('.')) {
          if (cType.includes('wordprocessingml.document') || cType.includes('msword')) {
            fileName += '.docx';
          } else if (cType.includes('spreadsheetml.sheet') || cType.includes('ms-excel')) {
            fileName += '.xlsx';
          } else if (cType.includes('presentationml.presentation') || cType.includes('ms-powerpoint')) {
            fileName += '.pptx';
          } else if (cType.includes('zip')) {
            fileName += '.zip';
          } else if (cType.includes('pdf')) {
            fileName += '.pdf';
          } else if (cType.includes('image/jpeg')) {
            fileName += '.jpg';
          } else if (cType.includes('image/png')) {
            fileName += '.png';
          } else if (urlToExtractExt) {
            const urlExt = urlToExtractExt.split('.').pop()?.split('?')[0];
            if (urlExt && urlExt.length <= 4 && /^[a-zA-Z0-9]+$/.test(urlExt)) {
              fileName += `.${urlExt}`;
            } else {
              fileName += '.pdf';
            }
          } else {
            fileName += '.pdf';
          }
        }
        
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Downloaded successfully!");
      };

      if (contentType.includes('application/json')) {
        const data = await res.json();
        const urlToOpen = data.url || (typeof data === 'string' ? data : null);
        if (urlToOpen && (urlToOpen.startsWith('http://') || urlToOpen.startsWith('https://'))) {
          try {
            const fileRes = await fetch(urlToOpen);
            if (!fileRes.ok) throw new Error("Failed to fetch from S3");
            const fetchedContentType = fileRes.headers.get('content-type') || '';
            const blob = await fileRes.blob();
            downloadBlob(blob, fetchedContentType, title, urlToOpen);
            return;
          } catch (err) {
            const link = document.createElement("a");
            link.href = urlToOpen;
            link.target = "_blank";
            let fileName = `${title.replace(/\\s+/g, "_") || "material"}`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Downloaded successfully!");
            return;
          }
        }
      } else if (contentType.includes('text/plain') || contentType.includes('text/html')) {
        const text = await res.text();
        if (text.startsWith('http://') || text.startsWith('https://')) {
          try {
            const fileRes = await fetch(text);
            if (!fileRes.ok) throw new Error("Failed to fetch from URL");
            const fetchedContentType = fileRes.headers.get('content-type') || '';
            const blob = await fileRes.blob();
            downloadBlob(blob, fetchedContentType, title, text);
            return;
          } catch (err) {
            const link = document.createElement("a");
            link.href = text;
            link.target = "_blank";
            let fileName = `${title.replace(/\\s+/g, "_") || "material"}`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Downloaded successfully!");
            return;
          }
        }
      }

      const blob = await res.blob();
      downloadBlob(blob, contentType, title);

    } catch (err: any) {
      console.error(err);
      
      let errorMessage = err.message;
      try {
        const json = JSON.parse(err.message);
        errorMessage = json.detail || json.message || errorMessage;
      } catch (e) {
      }
      
      toast.error("Download failed. " + errorMessage);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMaterials();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, moduleIdFilter, fileTypeFilter]);

  const filteredMaterials = (Array.isArray(materials) ? materials : []).filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      m.title?.toLowerCase().includes(q) ||
      m.file_type?.toLowerCase().includes(q)
    );
  });

  return {
    materials,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    moduleIdFilter,
    setModuleIdFilter,
    fileTypeFilter,
    setFileTypeFilter,
    filteredMaterials,
    handleDownload
  };
}
