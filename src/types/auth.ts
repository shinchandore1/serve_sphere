export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  givenName?: string;
  familyName?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentialResponse: any) => void;
  logout: () => void;
}
