import { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import { AuthState } from '../interfaces/AuthState';
import { EmployeeContext } from './EmployeeContext';


import { useSetState } from '@mantine/hooks';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Employee } from '../interfaces/Employee';
import { UpdateEmployeeParams } from '../interfaces/UpdateEmployeeParams';


interface EmployeeProviderProps {
  children: JSX.Element | ReactNode | JSX.Element[] | ReactNode[];
}

const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const db = getFirestore()

  const [employees, setEmployees] = useState<Employee[] | undefined>()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>()

  const [loading, setLoading] = useState(false)
  
  const getAllEmployees = async () => {
    setLoading(true)
    const q = query(collection(db, "employee"), where("role", "==", "employee"));
    const querySnapshot = await getDocs(q);
    const employeeDocs = querySnapshot.docs.map(doc => doc.data());
    const newEmployees: Employee[] = employeeDocs.map((employee: any) => {
      let newEmployee = {} as Employee
      if (employee.birthdate) {
        const employeeBirthdate = new Date(employee.birthdate.seconds * 1000)
        newEmployee['birthdate'] = employeeBirthdate
      }
      if(employee.vacdate) {
        const employeeVacdate = new Date(employee.vacdate.seconds * 1000)
        newEmployee['vacdate'] = employeeVacdate
      }
      newEmployee = {
        ...employee,
        ...newEmployee
      }
      return newEmployee
    })
    setEmployees(newEmployees)
    setLoading(false)
  }

  const getEmployeeById = async (id?: string) => {
    setLoading(true)
    const q = query(collection(db, "employee"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const employeeDocs = querySnapshot.docs.map(doc => doc.data());
    const employee = employeeDocs[0]
    const {birthdate, vacdate} = employee
    if(birthdate){
      employee.birthdate = new Date(birthdate?.seconds * 1000)
    }
    if(vacdate){
      employee.vacdate = new Date(vacdate?.seconds * 1000)
    }

    setSelectedEmployee(employee as Employee)
    setLoading(false)
  }

  const updateEmployee = async (payload: Employee) => {
    setLoading(true)
    const { email } = payload
    const employeeRef = doc(db, "employee", email);
    await updateDoc(employeeRef, {
      ...payload
    });
    setLoading(false)
  }

  const deleteEmployees = async (emails: string[]) => {
    setLoading(true)
    const q = query(collection(db, "employee"), where("email", "in", emails));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    setLoading(false)
    const newEmployees = employees?.filter(employee => !emails.includes(employee.email))
    setEmployees(newEmployees)
  }




  return <EmployeeContext.Provider value={{
    employees,
    loading,
    selectedEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployees
  }}>
    {children}
  </EmployeeContext.Provider>;
};

export default EmployeeProvider;