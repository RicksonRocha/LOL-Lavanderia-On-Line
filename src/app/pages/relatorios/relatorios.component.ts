import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  private endpoint = `https://pdfmyurl.com/api?license=yourlicensekey&url=https://gist.github.com`;
  constructor() {}

  ngOnInit() {}

  public async handleDownload() {
    try {
      const resp = await axios.get(this.endpoint, {
        responseType: 'blob',
      });

      // create temp download url
      const downloadUrl = window.URL.createObjectURL(resp.data);

      // open pdf file on new tab
      window.open(downloadUrl, '__blank');
    } catch (e) {
      throw e;
    }
  }
}
