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
    }else if (result && !result.error) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col justify-center px-10 py-9 text-3xl font-bold text-center bg-som max-md:px-5">
      <div className="flex flex-col items-center px-16 pb-20 bg-white rounded-2xl shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-center max-w-full w-[838px]">
          <Image
            loading="lazy"
            alt="logo"
            height={1000}
            width={1000}
            src={convertImgUrl(logoUrl)}
            className="self-stretch w-full -my-48 py-10"
          />
          <div className=" text-5xl text-neutral-500 max-md:text-4xl">
            Login
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start px-6 pb-20 mt-6 max-w-full whitespace-nowrap rounded-xl border-solid bg-white bg-opacity-0 border-[5px] border-neutral-400 text-neutral-400 w-[624px] max-md:px-5">
              <label className="z-10 justify-center px-2 py-px -mt-5 bg-white" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-6 mt-2 -mb-8 text-3xl text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-som"
              />
            </div>
            <div className="flex flex-col items-start px-6 pb-20 mt-10 max-w-full whitespace-nowrap rounded-xl border-solid bg-white bg-opacity-0 border-[5px] border-neutral-400 text-neutral-400 w-[624px] max-md:px-5">
              <label className="z-10 justify-center px-2 py-px -mt-5 bg-white" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-6 mt-2 -mb-8 text-3xl text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-som"
              />
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <button type="submit" className="justify-center px-14 py-5 mt-14 text-4xl text-white whitespace-nowrap bg-som rounded-xl max-md:px-5 max-md:mt-10">
              Login
            </button>
          </form>
          <div className="flex gap-5 mt-7 max-md:flex-wrap">
            <div className="flex-auto text-som">
              Don't have an account?
            </div>
            <Link href={'/auth/register'} className="flex-auto text-orange-700 underline">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
