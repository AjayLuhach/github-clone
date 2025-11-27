import type { IContributionData, IGitHubUser } from '../types/global';

const GITHUB_API = 'https://api.github.com/users';
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

export const fetchGitHubUser = async (username: string): Promise<IGitHubUser> => {
  const response = await fetch(`${GITHUB_API}/${username}`);

  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
};

export const fetchUserContributions = async (username: string): Promise<IContributionData | null> => {
  const response = await fetch(`${CONTRIBUTIONS_API}/${username}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
};
