export interface User {
    id?: string;
    email: string;
    name: string;
    registrationDate: Date;
    subscribers: string[];
    publications: number;
    avatarId?: string;
  }