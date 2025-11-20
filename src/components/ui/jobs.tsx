import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { getjobs } from "../../services/apiservices";
import { Lock } from 'lucide-react';
import RegistrationDialog from './RegistrationDialog';

// Wrapper component to handle className for Footer
const FooterWithClassName = ({ className, ...props }: { className?: string }) => (
  <div className={className}>
    <Footer {...props} />
  </div>
);

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [regOpen, setRegOpen] = useState(false);

  useEffect(() => {
    // Check for access token in localStorage
    const token = localStorage.getItem('access_token');
    setAccessToken(!!token);
   
    const fetchJobs = async () => {
      try {
        const data = await getjobs();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load job listings');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 bg-background">
          <Header />
        </div>
        <div className="container py-10 flex-grow">
          <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
          <p>Loading...</p>
        </div>
        <FooterWithClassName className="bg-background" />
      </div>
    );
  }

  // Show registration prompt for both error and no access token cases
  if (error || !accessToken) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 bg-background">
          <Header />
        </div>
        <div className="container py-10 flex-grow">
          <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700">
              Please register to view job openings.{' '}
              <Button onClick={() => setRegOpen(true)}>Register now</Button>
              <RegistrationDialog open={regOpen} setOpen={setRegOpen} />
            </p>
          </div>
        </div>
        <FooterWithClassName className="bg-background" />
      </div>
    );
  }

  // Show first 3 jobs unlocked, rest are locked
  const unlockedJobs = jobs.slice(0, 3);
  const lockedJobs = jobs.slice(3);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
      <div className="container py-10 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unlockedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{job.designation}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2"><strong>Company:</strong> {job.company_name}</p>
                <p className="text-muted-foreground mb-2"><strong>Location:</strong> {job.location}</p>
                <p className="text-muted-foreground mb-2"><strong>Salary:</strong> {job.salary}</p>
                <p className="text-muted-foreground mb-4"><strong>Experience:</strong> {job.experience}</p>
                <Button asChild>
                  <Link to={job.url}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {lockedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow opacity-75">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  {job.designation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Enroll now to unlock this job listing</p>
                <Button asChild>
                  <Link to="/enroll">Enroll Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {lockedJobs.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Want to unlock all job listings?{' '}
              <Link to="/enroll" className="text-blue-600 hover:underline">
                Enroll now
              </Link>
            </p>
          </div>
        )}
      </div>
      <FooterWithClassName className="bg-background" />
    </div>
  );
};

export default JobsPage;