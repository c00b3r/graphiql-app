interface UserState {
  userName: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RootState {
  user: UserState;
}
