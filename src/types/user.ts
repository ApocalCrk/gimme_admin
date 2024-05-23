export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  [key: string]: unknown;
}
