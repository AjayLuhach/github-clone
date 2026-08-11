import React from 'react';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';
import type { IGitHubRepo, IMockRepository } from '../types/global';

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Java: '#b07219',
  Dart: '#00B4AB',
  'Jupyter Notebook': '#DA5B0B',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Shell: '#89e051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Vue: '#41b883',
};

const FALLBACK_LANGUAGE_COLOR = '#9198a1';

interface ICard {
  key: string;
  name: string;
  href: string | null;
  description: string | null;
  language: string | null;
  languageColor: string;
  isPublic: boolean;
  isFork: boolean;
  forkedFrom?: string;
  stars: number;
  forks: number;
}

const fromApi = (repo: IGitHubRepo): ICard => ({
  key: String(repo.id),
  name: repo.name,
  href: repo.html_url,
  description: repo.description,
  language: repo.language,
  languageColor: repo.language
    ? LANGUAGE_COLORS[repo.language] ?? FALLBACK_LANGUAGE_COLOR
    : FALLBACK_LANGUAGE_COLOR,
  isPublic: !repo.private,
  isFork: repo.fork,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
});

const fromMock = (repo: IMockRepository, login: string): ICard => ({
  key: repo.name,
  name: repo.name,
  href: `https://github.com/${login}/${repo.name}`,
  description: repo.description,
  language: repo.language,
  languageColor: repo.languageColor,
  isPublic: repo.isPublic,
  isFork: repo.isFork,
  forkedFrom: repo.forkedFrom,
  stars: 0,
  forks: 0,
});

const RepoIcon = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="flex-shrink-0" fill="#9198a1">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
  </svg>
);

const PopularRepositories: React.FC = () => {
  const { user, repos } = useProfile();
  if (!user) return null;

  const {
    texts: { popularRepositories: repoTexts },
    mockData,
  } = profileConfig;

  const cards: ICard[] = repos?.length
    ? repos.map(fromApi)
    : (mockData.popularRepositories as IMockRepository[]).map((r) => fromMock(r, user.login));

  return (
    <section className="mb-6" aria-labelledby="popular-repositories-heading">
      <h2 id="popular-repositories-heading" className="text-base font-normal text-fg mb-4">
        {repoTexts.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((repo) => (
          <div
            key={repo.key}
            className="p-4 border border-line rounded-md hover:border-emphasis transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <RepoIcon />
                <a
                  href={repo.href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-semibold text-sm truncate"
                >
                  {repo.name}
                </a>
              </div>
              <span className="ml-2 px-2 py-0.5 text-xs border border-line rounded-full text-muted flex-shrink-0">
                {repo.isPublic ? repoTexts.publicLabel : repoTexts.privateLabel}
              </span>
            </div>

            {repo.isFork && repo.forkedFrom && (
              <div className="flex items-center gap-1 mb-2 text-xs text-muted">
                <span>
                  {repoTexts.forkedFrom}{' '}
                  <a
                    href={`https://github.com/${repo.forkedFrom}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {repo.forkedFrom}
                  </a>
                </span>
              </div>
            )}

            {repo.description && (
              <p className="text-xs text-muted mb-3 line-clamp-2">{repo.description}</p>
            )}

            <div className="flex items-center gap-4 text-xs text-muted mt-auto">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}

              {repo.stars > 0 && (
                <div className="flex items-center gap-1">
                  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="w-4 h-4" fill="currentColor">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                  </svg>
                  <span>{repo.stars}</span>
                </div>
              )}

              {repo.forks > 0 && (
                <div className="flex items-center gap-1">
                  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="w-4 h-4" fill="currentColor">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                  </svg>
                  <span>{repo.forks}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRepositories;
