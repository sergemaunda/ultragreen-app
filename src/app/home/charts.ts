// import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import { BleClient, numberToUUID, ScanResult, ScanMode } from '@capacitor-community/bluetooth-le';
// import Chart from 'chart.js/auto';

// export class HomePage implements AfterViewInit  {

//   // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable
//  // that we have added to the canvas element in the HTML template.

//  @ViewChild('tempCanvas') private tempCanvas: ElementRef;
//  @ViewChild('humCanvas') private humCanvas: ElementRef;



//  ngAfterViewInit() {
//     this.tempChartMethod();
//     this.humChartMethod();
//   }

//   //VARIABLES
//   tempChart: any;
//   humChart: any;

// //CHART
//   // A method to draw the temperature chart
//   tempChartMethod() {
//     this.tempChart = new Chart(this.tempCanvas.nativeElement, {
//       type: 'line',
//       data: {
//         labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
//                 '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
//         datasets: [
//           {
//             label: 'Temperature',
//             fill: false,
//             backgroundColor: 'rgba(75,192,192,0.4)',
//             borderColor: 'rgba(75,192,192,1)',
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: 'rgba(75,192,192,1)',
//             pointBackgroundColor: '#fff',
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//             pointHoverBorderColor: 'rgba(220,220,220,1)',
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [20,25,26,23,25,26,27,28,29,30,31,32,33,32,31,30,29,28,27,26,25,25,26],
//             spanGaps: false,
//             tension: 0.1
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             display: true,
//             title: {
//               display: true,
//               text: 'Time (h)',
//             }
//           },
//           y: {
//             display: true,
//             title: {
//               display: true,
//               text: 'Temperature (°C)',
//             }
//           }
//         },
//         plugins: {
//           title: {
//             display: true,
//             text: 'Temperature vs Time',
//           },
//           legend: {
//             display: false,
//           }
//         }
//       }
//     });
//   }

//   // A method to draw the humidity chart
//   humChartMethod() {
//     const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
//     const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

//     this.humChart = new Chart(this.humCanvas.nativeElement, {
//       type: 'line',
//       data: {
//         labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
//         '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
//         datasets: [
//           {
//             label: 'Humidity',
//             fill: false,
//             tension: 0.1,
//             backgroundColor: 'rgba(229, 56, 53, 0.63)',
//             borderColor: 'rgb(229 57 53)',
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: 'rgb(229 57 53)',
//             pointBackgroundColor: '#fff',
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: 'rgb(229 57 53)',
//             pointHoverBorderColor: 'rgba(220,220,220,1)',
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [60, 59, 67, 81, 56, 55, 40, 45, 45, 50, 60, 65, 50, 55, 40, 45, 45, 50, 60, 65, 50, 55, 40, 30],
//             spanGaps: false,
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             display: true,
//             title: {
//               display: true,
//               text: 'Time (h)',
//             }
//           },
//           y: {
//             display: true,
//             title: {
//               display: true,
//               text: 'Humidity (%)',
//             }
//           }
//         },
//         plugins: {
//           title: {
//             display: true,
//             text: 'Humidity vs Time',
//           },
//           legend: {
//             display: false,
//           }
//         }
//       }
//     });
//   }
