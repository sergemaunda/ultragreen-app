import {Component, OnInit} from '@angular/core';
import { BleClient, numberToUUID, ScanMode } from '@capacitor-community/bluetooth-le';

//CONSTANTS
const TEMPERATURE_SERVICE = numberToUUID(0x1809);
const TEMPERATURE_CHARACTERISTIC = numberToUUID(0x2A1C);
const HUMIDITY_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
const HUMIDITY_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';
const NO_DATA = '--';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  temperature: string;
  humidity: string;
  isScanningEnabled: boolean;
  intervalID: any;
  scanResults = [];

  ngOnInit() {
    this.temperature = NO_DATA;
    this.humidity = NO_DATA;
    this.isScanningEnabled= false;

    //initialize scanning for BLE devices
    BleClient.initialize();
  }

  onScanToggle() {
    this.isScanningEnabled = !this.isScanningEnabled;
    if (this.isScanningEnabled) {
      this.beginScanning();
    } else {
      this.endScanning();
    }
  }

  async beginScanning() {
    try {
      this.intervalID = setInterval(async () => {
        //start scanning for advertisment packets from the BLE device
        await BleClient.requestLEScan({name: 'UltraGreen', allowDuplicates: true, scanMode: ScanMode.SCAN_MODE_BALANCED},
        (res) => {this.scanResults.push(`${res.serviceData[TEMPERATURE_SERVICE].getInt16(0, false)} °C`);});

        setTimeout(async () => {
          // end scanning for advertisment packet from the BLE device
          await BleClient.stopLEScan();
        }, 50);
      },100);

    } catch (err) {
      console.log(err.message);
    }
  }

  async endScanning() {
    clearInterval(this.intervalID);
  }

  clearScanResults() {
    this.scanResults = [];
  }
}
