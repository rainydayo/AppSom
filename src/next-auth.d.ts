import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      image: string;
      role: string;
    };
  }

  interface User {
    id: string;
    name: string;
    username: string;
    image: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    username: string;
    image: string;
    role: string;
  }
}