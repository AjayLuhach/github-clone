import React from 'react';
import Plot from 'react-plotly.js';
import type { Data } from 'plotly.js';

import profileConfig from '../config/profileConfig.json';
import type { IActivityBreakdown } from '../types/global';

const ActivityOverview: React.FC = () => {
  const activityData = profileConfig.mockData.activityBreakdown as IActivityBreakdown;
  const categories = profileConfig.texts.activityOverview.categories;
  const values = [
    activityData.commits,
    activityData.codeReview,
    activityData.issues,
    activityData.pullRequests,
  ];

  const radarData: Partial<Data>[] = [
    {
      type: 'scatterpolar',
      r: values,
      theta: categories,
      fill: 'toself',
      fillcolor: 'rgba(46, 160, 67, 0.2)',
      line: {
        color: '#2ea043',
        width: 2,
      },
      marker: {
        color: '#2ea043',
        size: 6,
      },
      hovertemplate: '<b>%{theta}</b><br>%{r} contributions<extra></extra>',
    },
  ];

  return (
    <div className="flex gap-8 w-1/2 overflow-hidden">
      <div className="flex-1">
        <div className="flex items-center justify-center" style={{ height: '280px' }}>
          <Plot
            data={radarData}
            layout={{
              width: 280,
              height: 280,
              margin: { l: 60, r: 60, t: 60, b: 60 },
              paper_bgcolor: '#0d1117',
              plot_bgcolor: '#0d1117',
              polar: {
                bgcolor: '#0d1117',
                radialaxis: {
                  visible: false,
                  range: [0, Math.max(...values) * 1.3],
                  showticklabels: false,
                  showline: false,
                  showgrid: false,
                },
                angularaxis: {
                  tickfont: {
                    size: 11,
                    color: '#7d8590',
                    family:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
                  },
                  gridcolor: '#2ea043',
                  gridwidth: 1,
                  linecolor: 'rgba(0,0,0,0)',
                  linewidth: 0,
                  rotation: 90,
                  showline: false,
                },
              },
              showlegend: false,
              hoverlabel: {
                bgcolor: '#1c2128',
                bordercolor: '#30363d',
                font: {
                  color: '#e6edf3',
                  size: 12,
                  family:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
                },
              },
            }}
            config={{
              displayModeBar: false,
              staticPlot: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
