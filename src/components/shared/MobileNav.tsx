import { useNavigate, useLocation } from "react-router-dom";
import { Home, Target, BarChart3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  if (!isMobile || !user) return null;

  const hiddenPaths = ["/auth", "/loading"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const items = [
    { path: "/", icon: <Home className="w-4 h-4" />, label: "HOME" },
    { path: "/input", icon: <Target className="w-4 h-4" />, label: "VALIDATE" },
    { path: "/dashboard", icon: <BarChart3 className="w-4 h-4" />, label: "ARCHIVE" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 print:hidden safe-bottom">
      <div className="luxury-panel rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_20px_60px_-20px_hsl(45_93%_47%_/_0.35)]">
        {items.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              <span
                className="font-light tracking-[0.28em]"
                style={{ fontSize: "0.6rem" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
