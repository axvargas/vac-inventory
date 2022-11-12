import { createContext } from "react";
import { Response } from '../interfaces/Response';
export type UserAuthContextProps = {
  user: any;
  loading: boolean;
  registerEmployee: (email: string, password: string, role: string, name: string, lastname: string, id:string) => void;
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => void;
};

export const UserAuthContext = createContext<UserAuthContextProps>({} as UserAuthContextProps);