import { createContext, ReactNode, useContext, useState } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthState = {
  accessToken: string | null;
  authenticated: boolean;
};

type AuthContext = {
  authState: AuthState;
  getAccessToken: () => string | null;
  logout: () => void;
  updateAuthState: (state: AuthState) => void;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    authenticated: false,
  });

  const updateAuthState = (updated: AuthState) => {
    setAuthState(updated);
  }

  const logout = () => {
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        updateAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
