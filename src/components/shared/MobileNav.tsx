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
      <div className="glass-panel prismatic-edge rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_20px_60px_-20px_hsl(45_93%_47%_/_0.45)]">
        {/* Prismatic top sliver */}
        <span className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none" />
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_hsl(45_93%_47%_/_0.6)]"
                  : "text-muted-foreground hover:text-primary"
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
