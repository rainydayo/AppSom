import React from 'react';
import { useTheme } from './themeSet';
import Image from 'next/image';
import convertImgUrl from './convertImgUrl';

export default function Sidebar(){
  const { changeTheme } = useTheme();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme({ som: e.target.value });
  };

  const profilePicUrl = 'https://drive.google.com/file/d/17ad4RrjEqQmKiwgwA0PmRLoadt1AiigI/view?usp=drive_link';
  const logoUrl = "https://drive.google.com/file/d/1xNsGNsI9bwcRYSnb5hKCAiHwK0wrkuYD/view?usp=drive_link";

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-som text-white flex flex-col justify-between p-4 font-sans font-bold tracking-wider">
      <div>
        <div className="flex justify-center mt-2 mb-4">
          <Image
            src={convertImgUrl(logoUrl)}
            alt="Logo"
            width={1000}
            height={1000}
            className="object-contain -my-20"
          />
        </div>
        <hr className="border-white mb-4"/>
        <div className="flex justify-center mb-4">
          <div className="bg-white p-2 rounded-lg">
            <Image
              src={convertImgUrl(profilePicUrl)}
              alt="Profile Picture"
              width={150}
              height={150}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <ul>
          <li className="mb-2"><a href="#" className="text-white">Board</a></li>
          <li className="mb-2"><a href="#" className="text-white">Calendar</a></li>
          <li className="mb-2"><a href="#" className="text-white">Starred</a></li>
        </ul>
      </div>
      <div>
      <hr className="border-white mb-4"/>
        <label htmlFor="colorPicker" className="block text-center text-white mb-2">
          Theme Setting
        </label>
        <input
          type="color"
          id="colorPicker"
          name="colorPicker"
          onChange={handleColorChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
