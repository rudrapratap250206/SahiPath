import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAuthTokenGetter,
  setBaseUrl,
  useGetMe,
  useLogin,
  useLogout,
  useRegister,
  useSaveProfile,
  type UserProfile,
} from "@workspace/api-client-react";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const domain = process.env.EXPO_PUBLIC_DOMAIN;
if (domain) setBaseUrl(`https://${domain}`);

const TOKEN_KEY = "sahipath_auth_token";

interface UserRecord {
  id: string;
  email: string;
  profile?: UserProfile | null;
}

interface AuthState {
  user: UserRecord | null;
  token: string | null;
  profile: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;
  setProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  profile: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  saveProfile: async () => {},
  setProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenRef = useRef<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const saveProfileMutation = useSaveProfile();
  const getMeQuery = useGetMe({ query: { enabled: false } });

  useEffect(() => {
    setAuthTokenGetter(() => tokenRef.current);
  }, []);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem(TOKEN_KEY);
        if (stored) {
          tokenRef.current = stored;
          setToken(stored);
          const result = await getMeQuery.refetch();
          const data = result.data as any;
          if (data?.user) {
            setUser(data.user);
            const p = data.user.profile ?? null;
            setProfileState(p);
          } else {
            await AsyncStorage.removeItem(TOKEN_KEY);
            setToken(null);
            tokenRef.current = null;
          }
        }
      } catch {
        await AsyncStorage.removeItem(TOKEN_KEY).catch(() => {});
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginMutation.mutateAsync({ data: { email, password } });
    const d = data as any;
    const tok = d.token as string | undefined;
    if (tok) {
      await AsyncStorage.setItem(TOKEN_KEY, tok);
      tokenRef.current = tok;
      setToken(tok);
    }
    setUser(d.user);
    const p = d.user?.profile ?? null;
    setProfileState(p);
  }, [loginMutation]);

  const register = useCallback(async (email: string, password: string) => {
    const data = await registerMutation.mutateAsync({ data: { email, password } });
    const d = data as any;
    const tok = d.token as string | undefined;
    if (tok) {
      await AsyncStorage.setItem(TOKEN_KEY, tok);
      tokenRef.current = tok;
      setToken(tok);
    }
    setUser(d.user);
    const p = d.user?.profile ?? null;
    setProfileState(p);
  }, [registerMutation]);

  const logout = useCallback(async () => {
    try { await logoutMutation.mutateAsync({}); } catch {}
    await AsyncStorage.removeItem(TOKEN_KEY);
    tokenRef.current = null;
    setToken(null);
    setUser(null);
    setProfileState(null);
  }, [logoutMutation]);

  const saveProfile = useCallback(async (p: UserProfile) => {
    await saveProfileMutation.mutateAsync({ data: p as any });
    setProfileState(p);
    if (user) setUser({ ...user, profile: p });
  }, [saveProfileMutation, user]);

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
    if (user) setUser({ ...user, profile: p });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, profile, isLoading, login, register, logout, saveProfile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
