export interface User {
  email: string;
  name: string;
  registrationDate: Date;
  subscribers: string[];
  id?: string;
  avatarId?: string;
}
