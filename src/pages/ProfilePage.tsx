import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ContributionActivity from "../components/ContributionActivity";
import PopularRepositories from "../components/PopularRepositories";
import SidebarProfile from "../components/SidebarProfile";
import profileConfig from "../config/profileConfig.json";
import { useProfile } from "../context/ProfileContext";

const ContributionChart = lazy(() => import("../components/ContributionChart"));
const ActivityOverview = lazy(() => import("../components/ActivityOverview"));

const ChartFallback: React.FC<{ height: number }> = ({ height }) => (
  <div className="animate-pulse rounded-md bg-subtle" style={{ height }} aria-hidden="true" />
);

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { fetchUserProfile, fetchContributionsByYear, loading, error } = useProfile();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { profilePage, activityOverview } = profileConfig.texts;

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username, fetchUserProfile]);

  useEffect(() => {
    if (!username) return;
    fetchContributionsByYear(username, selectedYear === currentYear ? 'last' : selectedYear);
  }, [selectedYear, username, currentYear, fetchContributionsByYear]);

  const yearOptions = useMemo(
    () => Array.from({ length: 11 }, (_, i) => currentYear - i),
    [currentYear]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">{profilePage.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger text-xl mb-2">{profilePage.errorTitle}</p>
          <p className="text-muted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <SidebarProfile />

          <div className="flex-1 min-w-0 space-y-6">
            <PopularRepositories />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col bg-canvas border border-line rounded-md flex-1 min-w-0">
                {/* Year selector for mobile/tablet */}
                <div className="md:hidden p-4 border-b border-line">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-subtle text-fg border border-line rounded-md text-sm focus:outline-none focus:border-accentEmphasis"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 overflow-x-auto">
                  <Suspense fallback={<ChartFallback height={160} />}>
                    <ContributionChart selectedYear={selectedYear} />
                  </Suspense>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full p-4 border-t border-t-line">
                  <div className="w-full md:w-1/2 md:border-r md:border-r-line">
                    <h2 className="text-fg font-semibold text-sm">
                      {activityOverview.title}
                    </h2>
                  </div>
                  <Suspense fallback={<div className="w-full md:w-1/2"><ChartFallback height={260} /></div>}>
                    <ActivityOverview />
                  </Suspense>
                </div>
              </div>

              {/* Year selector for desktop */}
              <nav aria-label="Contribution year" className="hidden md:flex flex-col gap-1 w-[88px] shrink-0">
                {yearOptions.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    aria-current={selectedYear === year ? "true" : undefined}
                    className={`px-3 py-1.5 text-sm text-left rounded-md transition-colors ${
                      selectedYear === year
                        ? "bg-accentEmphasis text-white font-semibold"
                        : "bg-transparent text-fg hover:bg-btnHover"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </nav>
            </div>
            <ContributionActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
