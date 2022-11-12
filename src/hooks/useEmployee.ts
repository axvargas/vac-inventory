import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
export const useEmployee = () => {
  return useContext(EmployeeContext)
}