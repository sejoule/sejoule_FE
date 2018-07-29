import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileReducerState } from '../../middleware/reducers/fileReducer';
import { AppState } from '../../middleware/reducers';
import * as fileAction from '../../middleware/actions/fileActions';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
// import * as userAction from '../../middleware/actions/userActions';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;


  constructor(
    private store : Store<AppState>,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() { 
    this.uploadForm = this.formBuilder.group({
      'fileName' : ['', Validators.required]
    });
  }

  upload(): void {

    this.store.dispatch( new fileAction.UploadfileAction({
          action: fileAction.UPLOADFILE,
          file : {},
          token: this.getUsrToken
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
