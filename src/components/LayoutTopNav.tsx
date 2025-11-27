import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { IoTriangleSharp } from 'react-icons/io5';
import { LuSquareMenu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';
import CopilotIcon from './icons/CopilotIcon';
import ProfileTabs from './ProfileTabs';
import Toast from './Toast';

interface IToastData {
  title: string;
  message: string;
}

const featureLabels = {
  menu: 'Menu',
  search: 'Search',
  create: 'Create',
  copilot: 'Copilot',
  issues: 'Issues',
  pullRequests: 'Pull Requests',
  notifications: 'Notifications',
  profile: 'Profile',
} as const;

const LayoutTopNav: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [toast, setToast] = useState<IToastData | null>(null);
  const { user } = useProfile();
  const { nav } = profileConfig.texts;
  const featureDescriptions = profileConfig.featureDescriptions as Record<string, string>;

  const handleDummyClick = (featureKey: keyof typeof featureLabels) => {
    const featureName = featureLabels[featureKey];
    const description = featureDescriptions[featureName] || featureDescriptions.Menu || '';

    setToast({
      title: `${featureName} - Demo Mode`,
      message: `This is a placeholder feature.\n\nIn a real GitHub implementation, this would:\n${description}`,
    });
  };

  return (
    <>
      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <header className="bg-[#010409] border-b border-[#30363d] max-w-full w-full top-0 left-0 right-0 z-50 overflow-hidden max-md:overflow-auto customscrollbar-none">
        <div className="flex items-center p-2 gap-4 w-full justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDummyClick('menu')}
              onMouseEnter={() => setShowTooltip('menu')}
              onMouseLeave={() => setShowTooltip(null)}
              className="p-2 text-[#7d8590] hover:text-white hover:bg-[#21262d] rounded-md transition-colors relative"
              aria-label={nav.menu}
            >
              <LuSquareMenu className="text-3xl" />
              {showTooltip === 'menu' && (
                <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.menu}
                </div>
              )}
            </button>

            <Link
              to="/"
              className="text-white hover:text-[#7d8590] transition-colors"
            >
              <AiFillGithub className="w-8 h-8" />
            </Link>

            {user && (
              <div className="hidden md:flex items-center text-sm">
                <Link
                  to={`/profile/${user.login}`}
                  className="text-white hover:underline font-semibold"
                >
                  {user.login}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => handleDummyClick('search')}
                className="text-left"
              >
                <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm hover:border-[#6e7681] transition-colors w-64">
                  <FiSearch className="w-4 h-4 text-[#7d8590] mr-2" />
                  <span className="text-[#7d8590]">{nav.searchPlaceholder}</span>
                </div>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => handleDummyClick('copilot')}
                onMouseEnter={() => setShowTooltip('copilot')}
                onMouseLeave={() => setShowTooltip(null)}
                className="flex items-center gap-1 text-[#7d8590] hover:text-white hover:bg-[#21262d] border border-[#30363d] rounded-md transition-colors"
                aria-label={nav.copilot}
              >
                <div className="border-r-[#7d8590] border-r-[0.10rem] p-2">
                  <CopilotIcon />
                </div>
                <div className="p-2">
                  <IoTriangleSharp className="w-2 h-2 rotate-180" />
                </div>
              </button>
              {showTooltip === 'copilot' && (
                <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.copilot}
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-[#30363d]"></div>

            <div className="relative">
              <button
                onClick={() => handleDummyClick('create')}
                onMouseEnter={() => setShowTooltip('create')}
                onMouseLeave={() => setShowTooltip(null)}
                className="flex items-center gap-1 p-2 text-[#7d8590] hover:text-white hover:bg-[#21262d] border border-[#30363d] rounded-md transition-colors"
                aria-label={nav.create}
              >
                <FiPlus className="w-4 h-4" />
                <IoTriangleSharp className="w-2 h-2 rotate-180" />
              </button>
              {showTooltip === 'create' && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.create}
                </div>
              )}
            </div>

            <div className="relative hidden md:block">
              <button
                onClick={() => handleDummyClick('issues')}
                onMouseEnter={() => setShowTooltip('issues')}
                onMouseLeave={() => setShowTooltip(null)}
                className="p-2 text-[#7d8590] hover:text-white hover:bg-[#21262d] border border-[#30363d] rounded-md transition-colors"
                aria-label={nav.issues}
              >
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
              </button>
              {showTooltip === 'issues' && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.issues}
                </div>
              )}
            </div>

            <div className="relative hidden md:block">
              <button
                onClick={() => handleDummyClick('pullRequests')}
                onMouseEnter={() => setShowTooltip('pullRequests')}
                onMouseLeave={() => setShowTooltip(null)}
                className="p-2 text-[#7d8590] hover:text-white hover:bg-[#21262d] border border-[#30363d] rounded-md transition-colors"
                aria-label={nav.pullRequests}
              >
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
                </svg>
              </button>
              {showTooltip === 'pullRequests' && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.pullRequests}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDummyClick('notifications')}
                onMouseEnter={() => setShowTooltip('notifications')}
                onMouseLeave={() => setShowTooltip(null)}
                className="relative p-2 text-[#7d8590] hover:text-white hover:bg-[#21262d] border border-[#30363d] rounded-md transition-colors"
                aria-label={nav.notifications}
              >
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z"></path>
                </svg>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#539bf5] ring-1 ring-[#010409]"></span>
              </button>
              {showTooltip === 'notifications' && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.notifications}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDummyClick('profile')}
                onMouseEnter={() => setShowTooltip('profile')}
                onMouseLeave={() => setShowTooltip(null)}
                className="flex items-center gap-1 hover:bg-[#21262d] rounded-full transition-colors"
                aria-label={nav.profile}
              >
                {user ? (
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#21262d]"></div>
                )}
              </button>
              {showTooltip === 'profile' && (
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#1c2128] text-xs text-white rounded shadow-lg whitespace-nowrap z-50 border border-[#30363d]">
                  {nav.profile}
                </div>
              )}
            </div>
          </div>
        </div>
        <ProfileTabs />
      </header>
    </>
  );
};

export default LayoutTopNav;
