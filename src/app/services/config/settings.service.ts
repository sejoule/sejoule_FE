import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: any;
  private appText: any;

  constructor(private http: HttpClient) {  }

  load(): Promise<any> {
    const jsonFile = 'assets/config/app-config.json';
    let textFile: string;
    return new Promise((resolve, reject) => {
      this.http
        .get(jsonFile)
        .subscribe(
          response => {
            this.settings = response;
            switch (this.settings.lang) {
              case 'en':
                textFile = 'assets/config/app-text-en.json';
                break;
              default: textFile = 'assets/config/app-text-en.json';
            }
            this.http
              .get(textFile)
              .subscribe(
              (resp: any) => {this.appText = resp; },
              error => console.log(error)
            );
            resolve(true);
            console.log(response);
          },
          response => {
            console.log(response);
            reject(true);
          }
        );
    });
  }

  getSettings(): any { return this.settings; }

  getAppText(): any { return this.appText; }

}
