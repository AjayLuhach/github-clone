declare module 'plotly.js/lib/core' {
  const Plotly: {
    register: (modules: unknown[]) => void;
    [key: string]: unknown;
  };
  export default Plotly;
}

declare module 'plotly.js/lib/scatterpolar' {
  const trace: unknown;
  export default trace;
}

declare module 'react-plotly.js/factory' {
  import type { ComponentType } from 'react';
  import type { PlotParams } from 'react-plotly.js';

  const createPlotlyComponent: (plotly: unknown) => ComponentType<PlotParams>;
  export default createPlotlyComponent;
}
