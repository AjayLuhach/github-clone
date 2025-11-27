import React, { createContext, useContext, useState, ReactNode } from 'react';

import { fetchGitHubUser, fetchUserContributions } from '../api/profileApi';
import { IContributionData, IGitHubUser, IProfileContextValue } from '../types/global';

const ProfileContext = createContext<IProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IGitHubUser | null>(null);
  const [contributions, setContributions] = useState<IContributionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);

      const contributionsData = await fetchUserContributions(username);
      setContributions(contributionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setContributions(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchContributionsByYear = async (username: string, year: number) => {
    try {
      const contributionsData = await fetchUserContributions(username, year);
      setContributions(contributionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        contributions,
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
