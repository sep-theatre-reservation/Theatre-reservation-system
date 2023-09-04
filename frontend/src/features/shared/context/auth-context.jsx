import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  isAdmin: false,
  user: {},
  login: () => {},
  logout: () => {},
});
