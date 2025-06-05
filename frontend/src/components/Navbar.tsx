import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-sidebar fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-80 border-b border-primary/30">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-secondary" />
              </div>
              <h1 className="text-lg font-bold">Chattin</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Button
              asChild
              className="flex gap-2 items-center cursor-pointer bg-foreground text-background rounded-2xl"
            >
              <Link to="/settings">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </Button>

            {authUser && (
              <>
                <Button
                  asChild
                  className="flex gap-2 items-center cursor-pointer bg-foreground text-background rounded-2xl"
                >
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </Button>

                <Button
                  className="flex gap-2 items-center cursor-pointer bg-foreground text-background rounded-2xl"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
