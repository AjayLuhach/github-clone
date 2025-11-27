import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import SidebarProfile from '../components/SidebarProfile';
import profileConfig from '../config/profileConfig.json';

const PackagesPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { fetchUserProfile, user } = useProfile();
  const [loaderMessage] = useState(
    profileConfig.loaderMessages[
      Math.floor(Math.random() * profileConfig.loaderMessages.length)
    ]
  );

  useEffect(() => {
    if (username && !user) {
      fetchUserProfile(username);
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <SidebarProfile />

          <div className="flex-1 min-w-0">
            <div className="text-center p-16 animate-pulse text-xl text-[#7d8590] bg-[#0d1117] border border-[#30363d] rounded-md">
              📦 {loaderMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
