import {
  GoBook,
  GoRepo,
  GoProject,
  GoPackage,
  GoStar
} from 'react-icons/go';
import React from 'react';
import { NavLink } from 'react-router-dom';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';

const ProfileTabs: React.FC = () => {
  const { user } = useProfile();
  if (!user) return null;

  const tabs = [
    {
      name: profileConfig.tabs.overview,
      path: `/profile/${user.login}`,
      icon: <GoBook size={16} />,
      end: true
    },
    {
      name: profileConfig.tabs.repositories,
      path: `/profile/${user.login}/repositories`,
      icon: <GoRepo size={16} />,
      count: user.public_repos
    },
    {
      name: profileConfig.tabs.projects,
      path: `/profile/${user.login}/projects`,
      icon: <GoProject size={16} />
    },
    {
      name: profileConfig.tabs.packages,
      path: `/profile/${user.login}/packages`,
      icon: <GoPackage size={16} />
    },
    {
      name: profileConfig.tabs.stars,
      path: `/profile/${user.login}/stars`,
      icon: <GoStar size={16} />,
      count: user.starred_count ?? 0
    }
  ];

  return (
    <nav className="border-b border-[#30363d] lg:-mx-8 px-4 lg:px-8 w-full">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 border-b-2 text-sm transition-colors ${
                isActive
                  ? 'border-[#f78166] text-[#e6edf3] font-semibold'
                  : 'border-transparent text-[#7d8590] hover:text-[#e6edf3] hover:border-[#6e7681]'
              }`
            }
          >
            {tab.icon}
            <span>{tab.name}</span>

            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 text-xs bg-[#21262d] text-[#e6edf3] rounded-full min-w-[20px] text-center">
                {tab.count}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default ProfileTabs;
