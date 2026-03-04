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

  // Hide on certain pages
  const hiddenPaths = ["/auth", "/loading"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const items = [
    { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { path: "/input", icon: <Target className="w-5 h-5" />, label: "Validate" },
    { path: "/dashboard", icon: <BarChart3 className="w-5 h-5" />, label: "Reports" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border print:hidden safe-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
