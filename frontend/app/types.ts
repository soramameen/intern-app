export interface Intern {
  id: number;
  email: string;
  name: string;
  university: string;
  grade: number;
  skills: string;
  bio: string;
}
export interface Interns {
  interns: Intern[];
}
