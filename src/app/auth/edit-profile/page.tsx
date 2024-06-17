'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, getSession, signOut } from 'next-auth/react';

export default function EditProfile() {
  const { data: session, status } = useSession();
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">
            Profile Picture
          </label>
          <input
            id="profilePic"
            type="file"
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push('/board')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
