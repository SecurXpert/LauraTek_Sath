import React from "react";
import { MapPin } from "lucide-react";
import { Address, ResumeFormData } from "../../Resume";

interface AddressSectionProps {
  data: ResumeFormData;
  updateAddress: (field: keyof Address, value: string) => void;
  errors: Record<string, string>;
}

export default function AddressSection({
  data,
  updateAddress,
  errors,
}: AddressSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
        <MapPin size={20} /> Permanent Address
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
          <input
            value={data.permanent_address[0]?.street || ""}
            onChange={(e) => updateAddress("street", e.target.value)}
            maxLength={30}
            className={`w-full px-4 py-2 border rounded-lg ${errors.address_street ? "border-black" : "border-black"}`}
          />
          {errors.address_street && <p className="text-red-500 text-xs mt-1">{errors.address_street}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            value={data.permanent_address[0]?.city || ""}
            onChange={(e) => updateAddress("city", e.target.value)}
            maxLength={10}
            className={`w-full px-4 py-2 border rounded-lg ${errors.address_city ? "border-black" : "border-black"}`}
          />
          {errors.address_city && <p className="text-red-500 text-xs mt-1">{errors.address_city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            value={data.permanent_address[0]?.state || ""}
            onChange={(e) => updateAddress("state", e.target.value)}
            maxLength={10}
            className={`w-full px-4 py-2 border rounded-lg ${errors.address_state ? "border-black" : "border-black"}`}
          />
          {errors.address_state && <p className="text-red-500 text-xs mt-1">{errors.address_state}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            value={data.permanent_address[0]?.country || ""}
            onChange={(e) => updateAddress("country", e.target.value)}
            maxLength={10}
            className={`w-full px-4 py-2 border rounded-lg ${errors.address_country ? "border-black" : "border-black"}`}
          />
          {errors.address_country && <p className="text-red-500 text-xs mt-1">{errors.address_country}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code / PIN</label>
          <input
            value={data.permanent_address[0]?.postal_code || ""}
            onChange={(e) => updateAddress("postal_code", e.target.value)}
            maxLength={6}
            className={`w-full px-4 py-2 border rounded-lg ${errors.postal_code ? "border-black" : "border-black"}`}
          />
          {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
        </div>
      </div>
    </section>
  );
}
