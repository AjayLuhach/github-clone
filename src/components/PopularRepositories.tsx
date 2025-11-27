import React from 'react';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';
import type { IMockRepository } from '../types/global';

const PopularRepositories: React.FC = () => {
  const { user } = useProfile();
  if (!user) return null;

  const {
    texts: { popularRepositories: repoTexts },
    mockData,
  } = profileConfig;

  const repositories = mockData.popularRepositories as IMockRepository[];

  return (
    <div className="mb-6">
      <h2 className="text-base font-normal text-[#e6edf3] mb-4">{repoTexts.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <div
            key={repo.name}
            className="p-4 border border-[#30363d] rounded-md hover:border-[#8b949e] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="flex-shrink-0" fill="#7d8590">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a
                  href={`https://github.com/${user.login}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#539bf5] hover:underline font-semibold text-sm truncate"
                >
                  {repo.name}
                </a>
              </div>
              <span className="ml-2 px-2 py-0.5 text-xs border border-[#30363d] rounded-full text-[#7d8590] flex-shrink-0">
                {repo.isPublic ? repoTexts.publicLabel : repoTexts.privateLabel}
              </span>
            </div>

            {repo.isFork && repo.forkedFrom && (
              <div className="flex items-center gap-1 mb-2 text-xs text-[#7d8590]">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="w-4 h-4">
                  <path fill="currentColor" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                <span>
                  {repoTexts.forkedFrom}{' '}
                  <a href={`https://github.com/${repo.forkedFrom}`} className="text-[#539bf5] hover:underline">
                    {repo.forkedFrom}
                  </a>
                </span>
              </div>
            )}

            {repo.description && (
              <p className="text-xs text-[#7d8590] mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-[#7d8590]">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRepositories;
