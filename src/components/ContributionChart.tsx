import React, { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';

import profileConfig from '../config/profileConfig.json';
import { useProfile } from '../context/ProfileContext';

echarts.use([HeatmapChart, CalendarComponent, TooltipComponent, VisualMapComponent, CanvasRenderer]);

interface IContributionChartProps {
  selectedYear?: number;
}

const CELL = 13;
const PAD_LEFT = 30;
const PAD_RIGHT = 8;
const PAD_TOP = 26;
const DAY_MS = 86_400_000;

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const parseLocalDate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const toLocalISO = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatLongDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS_LONG[m - 1]} ${d}, ${y}`;
};

const readToken = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const LEVEL_FALLBACKS = ['#151b23', '#033a16', '#196c2e', '#2ea043', '#56d364'];

const levelForCount = (count: number): number => {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const ContributionChart: React.FC<IContributionChartProps> = ({ selectedYear }) => {
  const { contributions } = useProfile();
  const { contributions: contributionTexts } = profileConfig.texts;

  const days = contributions?.contributions ?? [];

  const model = useMemo(() => {
    if (!days.length) return null;

    let total = 0;
    let min = days[0].date;
    let max = days[0].date;

    const data = days.map((day) => {
      total += day.count;
      if (day.date < min) min = day.date;
      if (day.date > max) max = day.date;

      return { value: [day.date, day.level ?? levelForCount(day.count), day.count] };
    });

    const start = parseLocalDate(min);
    start.setDate(start.getDate() - start.getDay());
    const end = parseLocalDate(max);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const weeks = Math.round((end.getTime() - start.getTime()) / (7 * DAY_MS)) + 1;

    return {
      data,
      total,
      range: [toLocalISO(start), toLocalISO(end)],
      width: PAD_LEFT + weeks * CELL + PAD_RIGHT,
      spansTwoYears: min.slice(0, 4) !== max.slice(0, 4),
    };
  }, [days]);

  const option = useMemo(() => {
    if (!model) return null;

    const muted = readToken('--fgColor-muted', '#9198a1');
    const canvas = readToken('--bgColor-default', '#0d1117');
    const surface = readToken('--button-default-bgColor-rest', '#212830');
    const border = readToken('--borderColor-default', '#3d444d');
    const fg = readToken('--fgColor-default', '#f0f6fc');

    return {
      aria: {
        enabled: true,
        label: {
          description: `Contribution calendar: ${model.total} contributions between ${formatLongDate(model.range[0])} and ${formatLongDate(model.range[1])}.`,
        },
      },
      tooltip: {
        backgroundColor: surface,
        borderColor: border,
        borderWidth: 1,
        padding: [6, 8],
        textStyle: { color: fg, fontSize: 12 },
        formatter: (params: { value: [string, number, number] }) => {
          const [date, , count] = params.value;
          const label =
            count === 0 ? 'No contributions' : `${count} contribution${count === 1 ? '' : 's'}`;
          return `${label} on ${formatLongDate(date)}`;
        },
      },
      visualMap: {
        show: false,
        type: 'piecewise',
        dimension: 1,
        seriesIndex: 0,
        pieces: LEVEL_FALLBACKS.map((fallback, i) => ({
          value: i,
          color: readToken(`--contribution-L${i}`, fallback),
        })),
      },
      calendar: {
        top: PAD_TOP,
        left: PAD_LEFT,
        right: PAD_RIGHT,
        cellSize: [CELL, CELL],
        range: model.range,
        splitLine: { show: false },
        itemStyle: { color: 'transparent', borderWidth: 0 },
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 0,
          nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
          color: muted,
          fontSize: 9,
          margin: 6,
        },
        monthLabel: {
          color: muted,
          fontSize: 10,
          align: 'left',
          margin: 8,
        },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: model.data,
          itemStyle: {
            borderRadius: 2,
            borderWidth: 2,
            borderColor: canvas,
          },
          emphasis: {
            itemStyle: {
              borderColor: muted,
              borderWidth: 1,
            },
          },
        },
      ],
    };
  }, [model]);

  if (!model || !option) {
    return (
      <div className="text-muted text-sm py-8" role="status">
        No contribution data available.
      </div>
    );
  }

  const heading = model.spansTwoYears
    ? `${model.total.toLocaleString()} contributions in the last year`
    : `${model.total.toLocaleString()} contributions in ${selectedYear ?? model.range[0].slice(0, 4)}`;

  return (
    <div className="text-fg">
      <h2 className="font-normal text-base mb-3">{heading}</h2>

      <div style={{ minWidth: model.width }}>
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          notMerge
          style={{ width: model.width, height: PAD_TOP + 7 * CELL + 10 }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-accent hover:underline"
        >
          {contributionTexts.learnHow}
        </a>
        <div className="flex items-center gap-1 text-xs text-muted">
          <span className="mr-1">{contributionTexts.less}</span>
          {LEVEL_FALLBACKS.map((_, i) => (
            <span
              key={i}
              className="w-[10px] h-[10px] rounded-[2px] inline-block"
              style={{ backgroundColor: `var(--contribution-L${i})` }}
            />
          ))}
          <span className="ml-1">{contributionTexts.more}</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionChart;
