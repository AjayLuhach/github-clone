import type {
  ContributionRange,
  IContributionData,
  IGitHubRepo,
  IGitHubUser,
} from '../types/global';

const GITHUB_API = 'https://api.github.com/users';
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

export const fetchGitHubUser = async (username: string): Promise<IGitHubUser> => {
  const response = await fetch(`${GITHUB_API}/${username}`);

  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
};

export const fetchUserRepos = async (username: string): Promise<IGitHubRepo[]> => {
  const response = await fetch(
    `${GITHUB_API}/${username}/repos?per_page=100&sort=updated&type=owner`
  );

  if (!response.ok) {
    throw new Error('Could not load repositories');
  }

  const repos: IGitHubRepo[] = await response.json();

  return repos
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.updated_at) - Date.parse(a.updated_at)
    )
    .slice(0, 6);
};

export const fetchUserContributions = async (
  username: string,
  range: ContributionRange = 'last'
): Promise<IContributionData | null> => {
  const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=${range}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
};
