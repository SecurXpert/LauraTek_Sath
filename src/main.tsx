import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (!sessionStorage.getItem("is_active_session")) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  sessionStorage.setItem("is_active_session", "true");
}

createRoot(document.getElementById("root")!).render(<App />);
