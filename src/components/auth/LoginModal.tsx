import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoogleLoginButton from "./GoogleLoginButton";
import { Heart } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange }) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Welcome to GiveGuide
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to start making a difference in the world
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-6">
          <GoogleLoginButton onSuccess={handleSuccess} />
          
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
