'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  console.log(session)

  return (
    <div className="container mx-auto p-4">
      {session ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
          <p className="text-lg">Username: {session.user.username}</p>
          <button onClick={() => signOut()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">You are not signed in</h1>
          <Link href={'/auth/login'}>Sign In</Link>
        </div>
      )}
    </div>
  );
}
