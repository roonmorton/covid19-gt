import * as Chart from 'chart.js'

export class ChartJS {
    canvas: any;
    ctx: any;
    constructor(config: {
      canvas: string,
      title?: string
      type: string,
      data: any,
      options?: any,
      context?: string,
    }) {
      this.canvas = document.getElementById(config.canvas);
      this.ctx = this.canvas.getContext(config.context || '2d');
      let myChart = new Chart(this.ctx, {
        type: config.type,
        data: config.data,
        options: config.options
      });
    }
  }
  