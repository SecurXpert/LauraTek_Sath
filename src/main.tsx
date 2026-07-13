import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import InstructorApp from '@instructor/App.tsx' // InstructorApp appears to be deleted/moved
import './index.css'

if (!sessionStorage.getItem("is_active_session")) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  sessionStorage.setItem("is_active_session", "true");
}

const Root = () => {
  const role = localStorage.getItem("role");
  const path = window.location.pathname.toLowerCase();
  
  // Ensure we don't accidentally send spelling variants of login to the instructor router
  const isLoginRoute = path.includes("login");

  // Only mount the Instructor App if explicitly logged in as instructor, NOT on the public homepage, and NOT on a login route.
  // This ensures localhost:8080/ always shows the User side <Home /> and all login paths route correctly.
  // if (role === "instructor" && path !== "/" && !isLoginRoute) {
  //   return <InstructorApp />;
  // }
  return <App />;
};

createRoot(document.getElementById("root")!).render(<Root />);
