'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import convertImgUrl from '@/components/ControlSystem/convertImgUrl';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const logoUrl = "https://drive.google.com/file/d/17ad4RrjEqQmKiwgwA0PmRLoadt1AiigI/view?usp=drive_link";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Attempting to sign in with", username, password);
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      console.error('Sign in error:', result.error);
      setError('Invalid username or password');
    } else if (result && !result.error) {
      router.push('/board');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 py-6 bg-som text-3xl font-bold text-center">
      <div className="flex flex-col items-center w-full max-w-lg bg-white rounded-2xl shadow-sm px-6 py-8">
        <Image
          loading="lazy"
          alt="logo"
          height={2000}
          width={2000}
          src={convertImgUrl(logoUrl)}
          className="w-4/6 h-auto"
        />
        <div className="text-3xl text-neutral-500 mb-6">
          Login
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-start mb-6">
            <label className="text-2xl mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-2xl text-gray-700 bg-white border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          <div className="flex flex-col items-start mb-6">
            <label className="text-2xl mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-2xl text-gray-700 bg-white border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full px-4 py-3 text-2xl text-white bg-som rounded-xl hover:bg-orange-700 transition duration-300 ease-in-out">
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-6 text-xl">
          <span className="text-som">Don't have an account?</span>
          <Link href={'/auth/register'} className="text-orange-700 underline hover:text-orange-400 transition duration-300 ease-in-out mt-2">Register</Link>
        </div>
      </div>
    </div>
  );
}
