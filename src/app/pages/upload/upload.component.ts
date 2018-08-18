import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';
import * as fileAction from '../../middleware/actions/fileActions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  uploads: any = {};
  yamlForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.yamlForm = this.formBuilder.group({
      yaml: '',
    });

    // this.store.select('fileUploadReducer').subscribe(
    //   event => {
    //     event.fileUploads.forEach( (fileUploadEvent) => {
    //          if (fileUploadEvent.done === true) {
    //           this.files.forEach( (file) => {
    //             if (file.name === fileUploadEvent.filename) {
    //               this.files.delete(file);
    //             }
    //           });
    //         }
    //       }
    //     );
    //   },
    //   error => {
    //     // todo do something on error
    //   }
    // );

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
    // TODO: need to change this to POST the body as text to the url http://kena.sejoule.com/tosca/service_templates/
    // const yaml_to_upload: File = new File(this.yamlForm.controls.yaml.value, 'yaml_upload');
    // this.store.dispatch(new fileAction.UploadfilesAction({
    //   action: fileAction.UPLOADFILES,
    //   files: new Set().add(yaml_to_upload),
    //   token: this.getUsrToken,
    //   with_progress: false
    // }));
  }

  upload(with_progress: boolean): void {
    this.store.dispatch(new fileAction.UploadfilesAction({
      action: fileAction.UPLOADFILES,
      files: this.files,
      token: this.getUsrToken,
      with_progress: with_progress
    }));
  }

  get getUsrToken(): string {
    let token = '';
    this.store.select('appReducer').subscribe(
      event => token = event['token']
    );
    return token;
  }

}
