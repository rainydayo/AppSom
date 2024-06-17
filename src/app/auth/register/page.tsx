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
          Register
        </div>
        <form className="w-full">
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
          <div className="flex flex-col items-start mb-6">
            <label className="text-2xl mb-2" htmlFor="profilePic">
              Profile Pic
            </label>
            <input
              id="profilePic"
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 text-2xl text-gray-700 bg-white border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            onClick={register}
            type="button"
            className="w-full px-4 py-3 text-2xl text-white bg-som rounded-xl hover:bg-orange-700 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col items-center mt-6 text-xl">
          <span className="text-som">Already have an account?</span>
          <Link href={'/auth/login'} className="text-orange-700 underline hover:text-orange-400 transition duration-300 ease-in-out mt-2">
            Log-in
          </Link>
        </div>
      </div>
    </div>
  );
}
