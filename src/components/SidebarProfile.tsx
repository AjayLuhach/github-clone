import React from "react";
import { useProfile } from "../context/ProfileContext";
import profileConfig from "../config/profileConfig.json";

const SidebarProfile: React.FC = () => {
  const { user } = useProfile();

  if (!user) return null;

  return (
    <div className="w-full lg:w-[296px] flex-shrink-0">
      <div className="sticky top-4">
        <div className="relative mb-4">
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="w-full aspect-square rounded-full border border-[#30363d]"
          />
        </div>

        <div className="mb-4">
          <h1 className="text-[26px] font-semibold text-[#e6edf3] mb-0 leading-[1.25]">
            {user.name || user.login}
          </h1>
          <p className="text-xl font-light text-[#7d8590] mt-0">{user.login}</p>
        </div>
        <div className="flex gap-2 mb-4">
          {profileConfig.showFollowButton && (
            <button className="flex-1 px-3 py-[5px] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-sm font-medium text-[#e6edf3] transition-colors">
              Follow
            </button>
          )}
        </div>

        {user.bio && (
          <div className="mb-4">
            <p className="text-[#e6edf3] text-[14px]">{user.bio}</p>
          </div>
        )}

        <div className="mb-4 flex items-center gap-1 text-sm text-[#e6edf3]">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            className="w-4 h-4"
            fill="#7d8590"
          >
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
          </svg>
          <a href="#" className="hover:text-[#539bf5]">
            <strong className="text-[#e6edf3]">{user.followers}</strong>{" "}
            followers
          </a>
          <span className="text-[#7d8590]">·</span>
          <a href="#" className="hover:text-[#539bf5]">
            <strong className="text-[#e6edf3]">{user.following}</strong>{" "}
            following
          </a>
        </div>

        <div className="space-y-2 text-sm text-[#e6edf3]">
          {user.company && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-[2px]"
                viewBox="0 0 16 16"
                fill="#7d8590"
              >
                <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path>
              </svg>
              <span className="break-all">{user.company}</span>
            </div>
          )}

          {user.location && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-[2px]"
                viewBox="0 0 16 16"
                fill="#7d8590"
              >
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
              </svg>
              <span>{user.location}</span>
            </div>
          )}

          {user.email && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-[2px]"
                viewBox="0 0 16 16"
                fill="#7d8590"
              >
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
              </svg>
              <a
                href={`mailto:${user.email}`}
                className="hover:text-[#539bf5] hover:underline break-all"
              >
                {user.email}
              </a>
            </div>
          )}

          {user.blog && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-[2px]"
                viewBox="0 0 16 16"
                fill="#7d8590"
              >
                <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
              </svg>
              <a
                href={
                  user.blog.startsWith("http")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#539bf5] hover:underline break-all"
              >
                {user.blog}
              </a>
            </div>
          )}

          {user.twitter_username && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-[2px]"
                viewBox="0 0 16 16"
                fill="#7d8590"
              >
                <path d="M9.5 4h1.75a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75h1.75m0-1.5V1.25a.25.25 0 0 1 .25-.25h2a.25.25 0 0 1 .25.25v1.25m0 8.5v1.25a.25.25 0 0 1-.25.25h-2a.25.25 0 0 1-.25-.25v-1.25"></path>
              </svg>
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#539bf5] hover:underline"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
