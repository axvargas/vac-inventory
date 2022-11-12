export interface Employee {
  email: string;
  id: string;
  name: string;
  lastname: string;
  mobile?: string;
  birthdate?: Date | string | null;
  address?: string;
  vac?: boolean;
  vacbrand?: string;
  doses?: number;
  vacdate?: Date | string | null;
}