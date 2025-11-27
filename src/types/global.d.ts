export interface IGitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  starred_count?: number;
}

export interface IContributionDay {
  date: string;
  count: number;
  level?: number;
}

export interface IContributionWeek {
  contributionDays: IContributionDay[];
}

export interface IContributionCalendar {
  totalContributions: number;
  weeks: IContributionWeek[];
}

export interface IContributionData {
  total: Record<number | string, number>;
  contributions: IContributionDay[];
}

export interface INavTexts {
  searchPlaceholder: string;
  copilot: string;
  create: string;
  profile: string;
  notifications: string;
  menu: string;
  issues: string;
  pullRequests: string;
}

export interface IContributionTexts {
  learnHow: string;
  less: string;
  more: string;
}

export interface IProfilePageTexts {
  loading: string;
  errorTitle: string;
  activityTitle: string;
  contributionActivityTitle: string;
  showMoreActivity: string;
  privateRepoSuffix: string;
}

export interface IPopularRepositoriesText {
  title: string;
  publicLabel: string;
  privateLabel: string;
  forkedFrom: string;
}

export interface IActivityTexts {
  title: string;
  categories: string[];
}

export interface IMockRepository {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  isPublic: boolean;
  isFork: boolean;
  forkedFrom?: string;
}

export interface IActivityBreakdown {
  commits: number;
  codeReview: number;
  issues: number;
  pullRequests: number;
}

export interface IPrivateContributions {
  count: number;
  dateRange: string;
}

export interface IProfileConfig {
  defaultUsername: string;
  tabs: {
    overview: string;
    repositories: string;
    projects: string;
    packages: string;
    stars: string;
  };
  loaderMessages: string[];
  showFollowButton: boolean;
  showSponsorButton: boolean;
  texts: {
    nav: INavTexts;
    contributions: IContributionTexts;
    popularRepositories: IPopularRepositoriesText;
    activityOverview: IActivityTexts;
    profilePage: IProfilePageTexts;
  };
  featureDescriptions: Record<string, string>;
  mockData: {
    repositories: string[];
    projects: string[];
    packages: string[];
    popularRepositories: IMockRepository[];
    activityBreakdown: IActivityBreakdown;
    privateContributions: IPrivateContributions;
  };
}

export interface IProfileContextState {
  user: IGitHubUser | null;
  contributions: IContributionData | null;
  loading: boolean;
  error: string | null;
}

export interface IProfileContextValue extends IProfileContextState {
  fetchUserProfile: (username: string) => Promise<void>;
}
