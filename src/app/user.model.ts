// src/app/user.model.ts
export interface User {
  id: number;
  username: string;
  email: string;
  role: {
    name: string;
  };
}
