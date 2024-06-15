'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Register from '@/lib/Register';
import bcrypt from 'bcryptjs';
import convertImgUrl from '@/components/ControlSystem/convertImgUrl';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState('');

  const router = useRouter();
  const logoUrl = 'https://drive.google.com/file/d/17ad4RrjEqQmKiwgwA0PmRLoadt1AiigI/view?usp=drive_link';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const register = async () => {
    try {
      const uuid = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);

      const formData = new FormData();
      formData.append('id', uuid);
      formData.append('name', username);
      formData.append('username', username);
      formData.append('role', 'USER');
      formData.append('password', hashedPassword);
      if (profilePic) {
        formData.append('image', profilePic);
      }

      const response = await Register(formData);
      if (response.ok) {
        console.log('Registration successful');
        setError('');
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('Registration failed');
      console.error("Error: ", err);
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
            className="self-stretch w-fit -my-72 py-10"
          />
          <div className="text-3xl text-neutral-500 max-md:text-4xl">Register</div>
          <div className="flex flex-col items-start px-4 pb-12 mt-8 max-w-full whitespace-nowrap rounded-xl border-solid bg-white bg-opacity-0 border-[3px] border-neutral-400 text-neutral-400 w-[500px] max-md:px-4">
            <label className="z-10 justify-center px-2 py-px -mt-4 bg-white text-2xl" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-4 mt-2 -mb-6 text-2xl text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          <div className="flex flex-col items-start px-4 pb-12 mt-6 max-w-full whitespace-nowrap rounded-xl border-solid bg-white bg-opacity-0 border-[3px] border-neutral-400 text-neutral-400 w-[500px] max-md:px-4">
            <label className="z-10 justify-center px-2 py-px -mt-4 bg-white text-2xl" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-4 mt-2 -mb-6 text-2xl text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          <div className="flex flex-col items-start px-4 pb-12 mt-6 max-w-full whitespace-nowrap rounded-xl border-solid bg-white bg-opacity-0 border-[3px] border-neutral-400 text-neutral-400 w-[500px] max-md:px-4">
            <label className="z-10 justify-center px-2 py-px -mt-4 bg-white text-2xl" htmlFor="profilePic">
              Profile Pic
            </label>
            <input
              id="profilePic"
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-4 mt-2 -mb-6 text-2xl text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          <button
            onClick={register}
            className="justify-center px-10 py-4 mt-10 text-2xl text-white whitespace-nowrap bg-som rounded-xl max-md:px-4 max-md:mt-8 hover:bg-orange-700 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Register
          </button>
          <div className="flex gap-5 mt-7 max-md:flex-wrap">
            <div className="flex-auto text-som text-xl">Already have an account?</div>
            <Link href={'/auth/login'} className="flex-auto text-orange-700 underline text-xl hover:text-orange-400 hover:shadow-lg transition duration-300 ease-in-out">
              Log-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
