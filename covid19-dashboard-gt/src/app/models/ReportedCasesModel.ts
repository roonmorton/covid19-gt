import { Chart } from './ChartModel'; 

export interface ReportedCases {
    totalcases: number;
    deceased: number;
    recovered: number;
    activeCases: number;
}


export class ReportedCasesChart {
    reportedCases: ReportedCases;

    totalcases: Chart;
    deceased: Chart;
    recovered: Chart;
    activeCases: Chart; 

    constructor(reportedCases: ReportedCases) {
        this.reportedCases = reportedCases; 
        this.reportedCases.activeCases = reportedCases.totalcases - (reportedCases.deceased +reportedCases.recovered);
        this.generateChars();
    }

    generateChars() {

        let data: Array<any> = new Array<any>();
        data.push(['Recuperados', (this.reportedCases.recovered * 100) / this.reportedCases.totalcases]);
        data.push(['Espera', (this.reportedCases.totalcases - this.reportedCases.recovered) * 100 / this.reportedCases.totalcases]);
        this.recovered = new Chart('PieChart', data, [],
            {
                legend: 'none',
                pieSliceText: 'none',
            pieStartAngle: 40,
                tooltip: { trigger: 'none' },
                slices: {
                    0: { color: 'green' },
                    1: { color: '#65d3c3' }
                }
            });

        data = new Array<any>();
        data.push(['Fallecidos', (this.reportedCases.deceased * 100) / this.reportedCases.totalcases]);
        data.push(['Espera', (this.reportedCases.totalcases - this.reportedCases.deceased) * 100 / this.reportedCases.totalcases]);
        this.deceased = new Chart('PieChart', data, [], {
            legend: 'none',
            pieSliceText: 'none',
            pieStartAngle: 40,
            tooltip: { trigger: 'none' },
            slices: {
                0: { color: 'black' },
                1: { color: '#dcd7d7' }
                //#dcd7d7 , #b7b1b1
            }
        });

        data = new Array<any>();
        data.push(['Activos', ((this.reportedCases.deceased + this.reportedCases.recovered) * 100) / this.reportedCases.totalcases]);
        data.push(['Espera', (this.reportedCases.totalcases - (this.reportedCases.deceased + this.reportedCases.recovered)) * 100 / this.reportedCases.totalcases]);
        this.activeCases = new Chart('PieChart', data, [], {
            legend: 'none',
            pieSliceText: 'none',
            pieStartAngle: 40,
            tooltip: { trigger: 'none' },
            slices: {
                0: { color: '#ec8398' },
                1: { color: '#e65572' }
            }
        });

        data = new Array<any>();
        data.push(['Fallecidos', (this.reportedCases.totalcases * 100) / this.reportedCases.totalcases]);
        data.push(['Espera', (this.reportedCases.totalcases - this.reportedCases.totalcases) * 100 / this.reportedCases.totalcases]);
        this.totalcases = new Chart('PieChart', data, [], {
            legend: 'none',
            pieSliceText: 'none',
            pieStartAngle: 40,
            tooltip: { trigger: 'none' },
            slices: {
                0: { color: '#c51639' },
                1: { color: '#65d3c3' }
            }
        });
    }

} 