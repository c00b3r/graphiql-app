interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
}

interface RootState {
  user: UserState;
}
