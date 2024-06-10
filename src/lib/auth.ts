import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import usersData from '../../public/Storage/User/user.json';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const user = usersData.data.find(user => user.username === credentials?.username);
        console.log('User Found:', user);

        if (user) {
          const isValid = await bcrypt.compare(credentials!.password, user.password);
          console.log('Password Valid:', isValid);
          if (isValid) {
            return {
              id: user.id,
              name: user.name,
              username: user.username,
            };
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
      console.log('JWT callback:', { token, user });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      session.user = {
        id: token.id,
        name: token.name,
        username: token.username,
      };
      return session;
    }
  }
};
