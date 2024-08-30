interface UserState {
  userName: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
}

interface RootState {
  user: UserState;
}
