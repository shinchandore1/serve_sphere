import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  variant?: 'button' | 'icon';
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ 
  onSuccess, 
  variant = 'button' 
}) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    try {
      login(credentialResponse);
      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('Google Client ID not found');
    return (
      <div className="text-sm text-destructive">
        Google authentication not configured
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          type="icon"
          theme="outline"
          size="large"
          shape="circle"
        />
      </GoogleOAuthProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        type="standard"
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="250"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
