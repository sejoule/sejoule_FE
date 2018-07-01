import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IAppConfig } from '../../models/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static settings: IAppConfig;
  constructor(private http: Http) { }

  load() {
    const jsonFile = 'assets/config/app-config.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: Response) => {
        AppConfig.settings = <IAppConfig>response.json();
        resolve();
      }).catch((response: any) => {
        reject('Could not load file config file');
      });
    });
  }
}
