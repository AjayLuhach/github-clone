import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';

import { fetchGitHubUser, fetchUserContributions, fetchUserRepos } from '../api/profileApi';
import {
  ContributionRange,
  IContributionData,
  IGitHubRepo,
  IGitHubUser,
  IProfileContextValue,
} from '../types/global';

const ProfileContext = createContext<IProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IGitHubUser | null>(null);
  const [contributions, setContributions] = useState<IContributionData | null>(null);
  const [repos, setRepos] = useState<IGitHubRepo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);

    const [userResult, repoResult] = await Promise.allSettled([
      fetchGitHubUser(username),
      fetchUserRepos(username),
    ]);

    if (userResult.status === 'fulfilled') {
      setUser(userResult.value);
    } else {
      const reason = userResult.reason;
      setError(reason instanceof Error ? reason.message : 'An error occurred');
      setUser(null);
      setContributions(null);
    }

    setRepos(repoResult.status === 'fulfilled' ? repoResult.value : null);
    setLoading(false);
  }, []);

  const fetchContributionsByYear = useCallback(
    async (username: string, range: ContributionRange) => {
      try {
        setContributions(await fetchUserContributions(username, range));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      }
    },
    []
  );

  return (
    <ProfileContext.Provider
      value={{
        user,
        contributions,
        repos,
        loading,
        error,
        fetchUserProfile,
        fetchContributionsByYear,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): IProfileContextValue => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
