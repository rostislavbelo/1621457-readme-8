export interface User {
    email: string;
    name: string;
    registrationDate: Date;
    subscribers: string[];
    publications: number;
    id?: string;
    avatarId?: string;
  }