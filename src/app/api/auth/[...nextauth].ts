import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const usersFilePath = path.resolve(process.cwd(), 'public/users.json');
        const usersData: User[] = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

        const user = usersData.find(user => user.email === credentials?.email);

        if (user) {
          const isValid = await bcrypt.compare(credentials!.password, user.password);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});
