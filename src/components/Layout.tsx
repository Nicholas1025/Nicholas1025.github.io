import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CodeTrailCanvas from "./CodeTrailCanvas";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileExperienceNotice from "./MobileExperienceNotice";

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on every route change (multi-page feel).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CodeTrailCanvas />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileExperienceNotice />
      <Footer />
    </div>
  );
}
