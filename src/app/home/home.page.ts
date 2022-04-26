import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BleClient, BleDescriptor, BleDevice, numbersToDataView, numberToUUID, ScanResult } from '@capacitor-community/bluetooth-le';
import Chart from 'chart.js/auto';

//CONSTANTS
const TEMPERATURE_SERVICE = numberToUUID(0x1809);
const TEMPERATURE_CHARACTERISTIC = numberToUUID(0x2A1C);
const HUMIDITY_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
const HUMIDITY_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';
const EMPTY = '';
const NO_DATA = '--';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit  {

   // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable
  // that we have added to the canvas element in the HTML template.

  @ViewChild('tempCanvas') private tempCanvas: ElementRef;
  @ViewChild('humCanvas') private humCanvas: ElementRef;

  //VARIABLES
  tempChart: any;
  humChart: any;
  tempValue = NO_DATA;
  isScanning = false;
  connectivity = {status: 'Disconnected', color: 'danger'};
  outputMessage = 'Output Message';
  device: BleDevice;

  constructor() {
  }

  ngAfterViewInit() {
    // this.tempChartMethod();
    // this.humChartMethod();
  }

  //BLE - Bluetooth Low Energy

  async connectToDevice() {
    try {
      await BleClient.initialize()
      .then(
        () => {this.isScanning = true;},
      );

      await BleClient.requestDevice({
        // services: [TEMPERATURE_SERVICE],
        // optionalServices:[HUMIDITY_SERVICE],
        // name: 'UltraGreen',
        // allowDuplicates: true,
      })
      .then(
        (res) => {this.outputMessage = 'res: ' + res.toString(); this.device = res;},
        (err) => {this.outputMessage = 'err: ' + err; this.isScanning = false;}
      );

      // connect to device
      await BleClient.connect(this.device.deviceId, this.onDisconnect)
      .then(
        // device connected
        () => {this.onConnect();},
      );

      await BleClient.read(this.device.deviceId, TEMPERATURE_SERVICE, TEMPERATURE_CHARACTERISTIC)
      .then(
        (res) => {this.outputMessage = 'res: ' + res.getUint8(0).toString();},
        (err) => {this.outputMessage = 'err: ' + err;}
        );

      await BleClient.startNotifications(
        this.device.deviceId,
        TEMPERATURE_SERVICE,
        TEMPERATURE_CHARACTERISTIC,
        (value) => {
          this.tempValue = this.parseTemperatureValue(value).toString() + 'C';
        }
      );

      // disconnect after 10 sec
      setTimeout(async () => {
        await BleClient.stopNotifications(this.device.deviceId, TEMPERATURE_SERVICE, TEMPERATURE_CHARACTERISTIC);
        await BleClient.disconnect(this.device.deviceId);
        this.onDisconnect();
      }, 10000);
    } catch (err) {
      this.outputMessage = 'err: ' + err;
    }
  }

  onConnect(): void {
    this.isScanning = false;
    this.connectivity.status = 'Connected';
    this.connectivity.color = 'success';
  }

  onDisconnect(): void {
    this.isScanning = true;
    this.connectivity.status = 'Disconnected';
    this.connectivity.color = 'danger';
  }

  parseTemperatureValue(value: DataView): number {
    const flags = value.getUint8(0);
    const rate16Bits = flags && 0x1;
    let temperature: number;
    if (rate16Bits > 0) {
      temperature = value.getUint16(1, true);
    } else {
      temperature = value.getUint8(1);
    }
    return temperature;
  }





   //CHART
  // A method to draw the temperature chart
  tempChartMethod() {
    this.tempChart = new Chart(this.tempCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Temperature',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
            tension: 0.1
          }
        ]
      }
    });
  }

  // A method to draw the humidity chart
  humChartMethod() {
    this.humChart = new Chart(this.humCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Humidity',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }
}
