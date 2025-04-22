const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const width = 800;
const height = 600;

const generateChart = async ({ labels, data, colors, title }) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        backgroundColor: colors
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  return buffer;
};

module.exports = { generateChart };

//<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAA..." />
//for client
//const base64Image = `data:${financialPlanning.chartImageType};base64,${financialPlanning.chartImage.toString('base64')}`;
