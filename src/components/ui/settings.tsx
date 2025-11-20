import { useEffect } from "react";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings - LauraTek";
  }, []);

  return (
    
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Compiler</h1>
      <p className="text-muted-foreground">This is your personalized compiler page. Explore your compiler and more!</p>
    </div>
  );
};

export default Settings;