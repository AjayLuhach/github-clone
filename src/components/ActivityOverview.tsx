import React, { useMemo } from 'react';
import type { Data } from 'plotly.js';
import Plotly from 'plotly.js/lib/core';
import scatterpolar from 'plotly.js/lib/scatterpolar';
import createPlotlyComponent from 'react-plotly.js/factory';

import profileConfig from '../config/profileConfig.json';
import type { IActivityBreakdown } from '../types/global';

Plotly.register([scatterpolar]);
const Plot = createPlotlyComponent(Plotly);

const GREEN = '#2ea043';

const ActivityOverview: React.FC = () => {
  const activityData = profileConfig.mockData.activityBreakdown as IActivityBreakdown;
  const categories = profileConfig.texts.activityOverview.categories;

  const { labels, values } = useMemo(() => {
    const raw = [
      activityData.commits,
      activityData.codeReview,
      activityData.issues,
      activityData.pullRequests,
    ];
    const sum = raw.reduce((a, b) => a + b, 0);

    const labels = categories.map((category, i) => {
      if (!sum || !raw[i]) return category;
      return `${Math.round((raw[i] / sum) * 100)}%<br>${category}`;
    });

    return { labels, values: raw };
  }, [activityData, categories]);

  const radarData: Partial<Data>[] = [
    {
      type: 'scatterpolar',
      r: values,
      theta: labels,
      fill: 'toself',
      fillcolor: 'rgba(46, 160, 67, 0.2)',
      line: { color: GREEN, width: 2 },
      marker: { color: GREEN, size: 6 },
      hovertemplate: '<b>%{theta}</b><br>%{r} contributions<extra></extra>',
    },
  ];

  return (
    <div className="w-full md:w-1/2 min-w-0">
      <Plot
        data={radarData}
        layout={{
          autosize: true,
          margin: { l: 80, r: 80, t: 46, b: 46 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          polar: {
            bgcolor: 'rgba(0,0,0,0)',
            radialaxis: {
              visible: false,
              range: [0, Math.max(...values, 1) * 1.3],
              showticklabels: false,
              showline: false,
              showgrid: false,
            },
            angularaxis: {
              tickfont: {
                size: 11,
                color: '#9198a1',
                family:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
              },
              gridcolor: GREEN,
              gridwidth: 1,
              linecolor: 'rgba(0,0,0,0)',
              linewidth: 0,
              rotation: 90,
              showline: false,
            },
          },
          showlegend: false,
          hoverlabel: {
            bgcolor: '#212830',
            bordercolor: '#3d444d',
            font: {
              color: '#f0f6fc',
              size: 12,
              family:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
            },
          },
        }}
        config={{ displayModeBar: false, responsive: true }}
        useResizeHandler
        style={{ width: '100%', height: '260px' }}
      />
    </div>
  );
};

export default ActivityOverview;
