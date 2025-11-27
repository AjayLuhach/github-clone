import React, { useMemo } from 'react';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';
import type { IContributionDay } from '../types/global';

interface IContributionCell {
  date: string;
  count: number;
  isInYear: boolean;
}

interface IContributionChartProps {
  selectedYear?: number;
}

interface IMonthLabel {
  label: string;
  position: number;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const displayedDayLabels = ['Mon', 'Wed', 'Fri'];

const ContributionChart: React.FC<IContributionChartProps> = ({ selectedYear: propSelectedYear }) => {
  const { contributions } = useProfile();
  const { contributions: contributionTexts } = profileConfig.texts;
  const currentYear = new Date().getFullYear();
  const selectedYear = propSelectedYear ?? currentYear;

  const generateRandomContributions = (year: number): IContributionDay[] => {
    const data: IContributionDay[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const count = Math.random() > 0.3 ? Math.floor(Math.random() * 20) : 0;
      data.push({
        date: currentDate.toISOString().split('T')[0],
        count,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const contributionData = useMemo(() => {
    if (contributions?.contributions?.length) {
      return contributions.contributions.filter((day) => new Date(day.date).getFullYear() === selectedYear);
    }
    return generateRandomContributions(selectedYear);
  }, [contributions, selectedYear]);

  const { weeks, totalContributions, monthLabels } = useMemo(() => {
    const dataMap = new Map<string, number>();
    let total = 0;
    contributionData.forEach((day) => {
      dataMap.set(day.date, day.count);
      total += day.count;
    });

    const startDate = new Date(selectedYear, 0, 1);
    const firstDay = new Date(startDate);
    const dayOfWeek = firstDay.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    firstDay.setDate(firstDay.getDate() + daysToMonday);

    const weeks: IContributionCell[][] = [];
    const monthLabels: IMonthLabel[] = [];
    const seenMonths = new Set<number>();

    const cursor = new Date(firstDay);
    let weekIndex = 0;

    while (true) {
      const week: IContributionCell[] = [];
      let hasYearDays = false;

      for (let weekday = 0; weekday < 7; weekday++) {
        const dateStr = cursor.toISOString().split('T')[0];
        const isInYear = cursor.getFullYear() === selectedYear;

        if (isInYear) {
          hasYearDays = true;
          const month = cursor.getMonth();
          if (!seenMonths.has(month)) {
            monthLabels.push({
              label: monthNames[month],
              position: weekIndex,
            });
            seenMonths.add(month);
          }
        }

        week.push({
          date: dateStr,
          count: isInYear ? dataMap.get(dateStr) || 0 : -1,
          isInYear,
        });

        cursor.setDate(cursor.getDate() + 1);
      }

      if (hasYearDays) {
        weeks.push(week);
        weekIndex++;
      } else if (weekIndex > 0) {
        break;
      }

      if (cursor.getFullYear() > selectedYear && weekIndex > 0) break;
    }

    return {
      weeks,
      totalContributions: total,
      monthLabels,
    };
  }, [contributionData, selectedYear]);

  const getColor = (count: number): string => {
    if (count === -1) return '#0d1117';
    if (count === 0) return '#161b22';
    if (count <= 3) return '#0e4429';
    if (count <= 6) return '#006d32';
    if (count <= 9) return '#26a641';
    return '#39d353';
  };

  const formatTooltip = (cell: IContributionCell): string => {
    if (!cell.isInYear) return '';
    if (cell.count === 0) return `No contributions on ${cell.date}`;
    if (cell.count === 1) return `1 contribution on ${cell.date}`;
    return `${cell.count} contributions on ${cell.date}`;
  };

  return (
    <div className="text-[#e6edf3]">
      <div className="font-semibold text-base mb-4">
        {totalContributions.toLocaleString()} contributions in {selectedYear}
      </div>

      <div className="mb-3">
        <div className="relative inline-block min-w-full">
          <div className="flex mb-2 ml-[26px] h-4 relative">
            {monthLabels.map((month) => (
              <div
                key={month.label}
                className="text-[10px] text-[#e6edf3] font-medium absolute"
                style={{
                  left: `${month.position * 13}px`,
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
                }}
              >
                {month.label}
              </div>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] mr-1 w-[22px]">
              <div className="h-[10px]"></div>
              {displayedDayLabels.map((label) => (
                <React.Fragment key={label}>
                  <div className="h-[10px] text-[9px] text-[#7d8590] flex items-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif' }}>
                    {label}
                  </div>
                  <div className="h-[10px]"></div>
                </React.Fragment>
              ))}
            </div>

            {weeks.map((week, weekIdx) => (
              <div key={`${weekIdx}-${week[0]?.date}`} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className="w-[10px] h-[10px] rounded-[1px]"
                    style={{ backgroundColor: getColor(day.count) }}
                    title={formatTooltip(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <a href="#" className="text-xs text-[#539bf5] hover:underline">
          {contributionTexts.learnHow}
        </a>
        <div className="flex items-center gap-2 text-xs text-[#7d8590]">
          <span>{contributionTexts.less}</span>
          <div className="flex gap-1">
            <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#006d32] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#26a641] rounded-[2px]"></div>
            <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px]"></div>
          </div>
          <span>{contributionTexts.more}</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionChart;
