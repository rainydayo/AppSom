'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import convertImgUrl from '@/components/ControlSystem/convertImgUrl';

export default function EditProfile() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (profilePic) {
      formData.append('image', profilePic);
    }

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await signOut({ redirect: false });
        router.push('/board');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error("Error:", err);
    }
  };

  const logoUrl = 'https://drive.google.com/file/d/17ad4RrjEqQmKiwgwA0PmRLoadt1AiigI/view?usp=drive_link';

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
          Edit Profile
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-start mb-6">
            <label className="text-2xl mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-2xl text-gray-700 bg-white border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          <div className="flex flex-col items-start mb-6">
            <label className="text-2xl mb-2" htmlFor="profilePic">
              Profile Picture
            </label>
            <input
              id="profilePic"
              type="file"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 text-2xl text-gray-700 bg-white border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-som"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full px-4 py-3 text-2xl text-white bg-som rounded-xl hover:bg-orange-700 transition duration-300 ease-in-out"
          >
            Update Profile
          </button>
          <button
            type="button"
            className="w-full mt-4 px-4 py-3 text-2xl text-white bg-gray-500 rounded-xl hover:bg-gray-700 transition duration-300 ease-in-out"
            onClick={() => router.push('/board')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
