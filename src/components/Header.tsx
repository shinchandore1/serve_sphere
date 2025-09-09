import { Heart, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/auth/UserProfile";
import LoginModal from "@/components/auth/LoginModal";

const Header = () => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ServeSphere</span>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Discover NGOs
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                How It Works
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Impact Stories
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                For NGOs
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Quick Search - Desktop */}
              <div className="hidden lg:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Quick search..."
                  className="pl-9 w-48 h-9 text-sm"
                />
              </div>
              
              {user ? (
                <>
                  <Button size="sm" className="bg-gradient-hero border-0">
                    Start Giving
                  </Button>
                  <UserProfile />
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden sm:flex"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="bg-gradient-hero border-0"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Start Giving
                  </Button>
                </>
              )}
              
              {/* Mobile Menu */}
              <Button variant="outline" size="sm" className="md:hidden p-2">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
};

export default Header;