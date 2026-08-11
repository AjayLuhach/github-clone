import React from "react";
import { GoLock } from "react-icons/go";

import profileConfig from "../config/profileConfig.json";

const ContributionActivity: React.FC = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 7);
  const shortDate = (date: Date) =>
    date.toLocaleString("default", { month: "short", day: "numeric" });
  const dateRange = `${shortDate(weekStart)} – ${shortDate(today)}`;

  const { texts, mockData } = profileConfig;
  const privateContributions = mockData.privateContributions;

  return (
    <div className="bg-canvas">
      <h2 className="text-fg font-semibold text-base">
        {texts.profilePage.contributionActivityTitle}
      </h2>

      <div className="px-2 py-4">
        <div className=" flex flex-row gap-2 items-center justify-center py-4">
          <h3 className="text-fg font-semibold text-sm whitespace-nowrap">
            {currentMonth}
          </h3>
          <div className="w-full h-[1px] bg-line"></div>
        </div>

        <div className="relative pl-6">

          <div className="relative pb-6 flex flex-row gap-2 items-center">
            <div className="h-[50px] w-[2px] bg-line"></div>
            <div className="absolute translate-x-[-45%] translate-y-[20%] top-[2px] bg-btn p-2 z-10 rounded-full">
              <GoLock className="w-[14px] h-[14px] text-white rounded-full " />
            </div>

            <div className="flex items-start justify-between pl-4 w-full">
              <div className="text-sm">
                <span className="text-fg font-semibold">
                  {privateContributions.count} contributions
                </span>
                <span className="text-muted"> {texts.profilePage.privateRepoSuffix}</span>
              </div>
              <div className="text-xs text-muted whitespace-nowrap ml-4">
                {dateRange}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full text-center text-sm text-accent hover:underline py-2 font-medium border border-gray-600 rounded-md">
            {texts.profilePage.showMoreActivity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributionActivity;
