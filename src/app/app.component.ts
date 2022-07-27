import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ammadfyp';
  currentDiv: string;

  constructor(
    private papa: Papa
  ) {
    this.currentDiv = 'home'
  }

  showNoti(param) {
    alert(param)
  }

  spin: boolean;
  selectedCSVFileName: string;
  isCSV_Valid: boolean;
  data: any;

  fileChangeListener($event: any): void {
    this.spin = true
    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];

          let csvTableData = [...results.data.slice(1, results.data.length)];
          this.data = csvTableData
          this.data = this.data.slice(0, 100)

          this.spin = false
        } else {
          for (let i = 0; i < results.errors.length; i++) {
            this.showNoti('Error Parsing CSV File')
            this.spin = false

          }
        }
      };
    } else {
      this.showNoti('No File Selected')
      this.spin = false

    }

  }


  switchView(param) {
    this.currentDiv = param
  }
  showAlert(param) {
    alert(param)
  }
}
