import { createContext } from "react";
import { Employee } from '../interfaces/Employee';
export type EmployeeContextProps = {
  employees: Employee[] | undefined;
  selectedEmployee: Employee | undefined;
  loading: boolean;
  // registerEmployee: (email: string, password: string, role: string, name: string, lastname: string, id:string) => void;
  // updateEmployee: (email: string, password: string, role: string, name: string, lastname: string, id:string) => void;
  // deleteEmployee: (email: string) => void;
  getAllEmployees: () => void;
  getEmployeeById: (id?: string) => void;
  updateEmployee: (payload: Employee) => void;
  deleteEmployees: (emails: string[]) => void;
};

export const EmployeeContext = createContext<EmployeeContextProps>({} as EmployeeContextProps);