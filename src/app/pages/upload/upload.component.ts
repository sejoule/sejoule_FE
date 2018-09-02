import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';
import * as fileAction from '../../middleware/actions/fileActions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {empty_authuser , IAuthUser} from '../../models/users/user';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss',
  ]
})
export class UploadComponent implements OnInit {
  @ViewChild('file') fileElement: any;
  files: Set<File> = new Set();
  progress: any = {};
  yamlForm: FormGroup;
  auth_user: IAuthUser = empty_authuser;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.yamlForm = this.formBuilder.group({
      yaml: '',
    });

    this.store.select('loginReducer').subscribe(
      response => {
        this.auth_user = response['authuser'];
      },
      error => console.log(error)
    );

    this.store.select('fileProgressReducer').subscribe(
      event => {
        event.fileProgresses.forEach( (fileUploadEvent) => {
          const file = fileUploadEvent.filename;
          this.progress[file] = fileUploadEvent.percent_upload;
          });
      },
      error => {
        // todo do something on error
      }
    );
  }

  addFileDialog(): void {
    this.fileElement.nativeElement.click();
  }

  filesAdded(): void {
    const files: { [key: string]: File } = this.fileElement.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  uploadYml(): void {
    const yaml_to_upload: string = this.yamlForm.controls.yaml.value;
    this.store.dispatch(new fileAction.UploadyamlAction({
      action: fileAction.UPLOADYAML,
      yaml: yaml_to_upload,
      token: this.auth_user.token
    }));
  }

  upload(with_progress: boolean): void {
    this.store.dispatch(new fileAction.UploadfilesAction({
      action: fileAction.UPLOADFILES,
      files: this.files,
      token: this.auth_user.token,
      with_progress: with_progress
    }));
  }

}
