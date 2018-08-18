import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaderResponse } from '@angular/common/http';

import { Action } from '@ngrx/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import * as fileActions from '../../middleware/actions/fileActions';
import { SettingsService } from '../config/settings.service';

@Injectable()
export class FileuploadService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) {  }

  uploadYaml(yaml: string, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const yamluploadResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    this.http.post(endpoint + '/tosca/service_templates/', yaml, {headers: {['Authorization']: 'JWT ' + token, 'Content-type': 'application/yaml'}, observe: 'response', responseType: 'text'})
      .subscribe(
        (response) => {
          if (response.status === 201) {
            yamluploadResponse.next(new fileActions.UploadyamlResponse({ name: response.body, done: true}));
          } else {
            yamluploadResponse.next(new fileActions.UploadyamlResponse({ name: '', done: false}));
          }
        },
        (error) => {
          yamluploadResponse.next(new fileActions.UploadyamlResponse({ name: '', done: false}));
        }
      );
    return yamluploadResponse;
  }

  uploadFile(files: Set<File>, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const fileuploadResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    const uploadResponses = [];
    files.forEach( file => {
      uploadResponses.push({filename: file.name, done: false, saved_filename: ''});
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http.post<any>(endpoint + '/tosca/upload', formData, {headers: {['Authorization']: 'JWT ' + token}})
        .subscribe(
          (response) => {
            if (response) {
              const index = uploadResponses.findIndex(o => o.filename === file.name);
              uploadResponses.splice(index, 1, {filename: file.name, done: true, saved_filename: response.file});
              fileuploadResponse.next(new fileActions.UploadfilesResponse(uploadResponses));
            } else {
              const index = uploadResponses.findIndex(o => o.filename === file.name);
              const saved_name = uploadResponses[index].saved_filename;
              uploadResponses.splice(index, 1, {filename: file.name, done: false, saved_filename: saved_name});
              fileuploadResponse.next(new fileActions.UploadfilesResponse(uploadResponses));
            }
          },
          () => {
            const index = uploadResponses.findIndex(o => o.filename === file.name);
            const saved_name = uploadResponses[index].saved_filename;
            uploadResponses.splice(index, 1, {filename: file.name, done: false, saved_filename: saved_name});
            fileuploadResponse.next(new fileActions.UploadfilesResponse(uploadResponses));
          },
          () => {
            if (this.all_done(uploadResponses)) {
              fileuploadResponse.complete();
            }
          });
    });
    return fileuploadResponse;
  }

  uploadFileWithProgess(files: Set<File>, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const fileuploadSubject = new Subject<Action>();
    const progressResponses = [];
    files.forEach( file => {
      progressResponses.push({filename: file.name, percent_upload: 0, done: false, saved_filename: ''});
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http.post<any>(endpoint + '/tosca/upload', formData, {headers: {['Authorization']: 'JWT ' + token},
        observe: 'events', reportProgress: true})
        .subscribe(
          (progress) => {
            if (progress.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * progress.loaded / progress.total);
              const index = progressResponses.findIndex(o => o.filename === file.name);
              const saved_name = progressResponses[index].saved_filename;
              progressResponses.splice(index, 1, {filename: file.name, percent_upload: percentDone,
                done: false, saved_filename: saved_name});
              fileuploadSubject.next(new fileActions.UploadfilesProgress(progressResponses));
            } else if (progress instanceof HttpHeaderResponse) {
              const index = progressResponses.findIndex(o => o.filename === file.name);
              const saved_name = progressResponses[index].saved_filename;
              progressResponses.splice(index, 1, {filename: file.name, percent_upload: 100, done: true, saved_filename: saved_name});
              fileuploadSubject.next(new fileActions.UploadfilesProgress(progressResponses));
            }
          },
          () => {
            const index = progressResponses.findIndex(o => o.filename === file.name);
            progressResponses.splice(index, 1, {filename: file.name, percent_upload: 0, done: true, saved_filename: ''});
            fileuploadSubject.next(new fileActions.UploadfilesProgress(progressResponses));
          },
          () => {
              if (this.all_done(progressResponses)) {
                fileuploadSubject.complete();
              }
          });
    });
    return fileuploadSubject;
  }

  private all_done(uploadsList: any[]): boolean {
    return uploadsList.reduce( (total, currentVal) => {
      return total && currentVal;
    }, true);
  }

}





