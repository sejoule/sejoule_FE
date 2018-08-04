import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';
import * as fileAction from '../../middleware/actions/fileActions';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('file') fileElement: any;
  files: Set<File> = new Set();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {}

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

  upload(): void {
    this.files.forEach( (file_to_upload) => {
      const formData = new FormData();
      formData.append('file', file_to_upload, file_to_upload.name);
      this.store.dispatch(new fileAction.UploadfileAction({
        action: fileAction.UPLOADFILE,
        file: formData,
        token: this.getUsrToken
      }));
    });
  }

  get getUsrToken(): string {
    let token = '';
    this.store.select('appReducer').subscribe(
      event => token = event['token']
    );
    return token;
  }

}
