import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from './../../../shared/api.service';
import { NbAuthService } from '@nebular/auth';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="400" [style.height.px]="400" status="success" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge">
  <nb-card-header>
    <div class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <h3 style="color:#ffffff">Download Provisional Eligiblity Letter</h3>
      </div>
      <div class="col-md-3">
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row">
      <div class="col-xl-12">
        <button nbButton class="col-md-4 col-sm-4 col-xs-4 offset-md-4" size="small" hero status="info" style="margin-top:10px;" (click)="downloadletter('Provisional Letter')">Download Letter</button>
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
      <div class="col-xl-12">
        <button nbButton class="col-md-4 col-sm-4 col-xs-4 offset-md-4" size="small" hero status="info" style="margin-top:10px;" (click)="dismiss()">Close</button>
      </div>
    </div>
  </nb-card-footer>
</nb-card>
<div>
<form id="nonseamless" method="post" name="redirect" action="{{secureUrl}}"> <input type="hidden" id="encRequest" name="encRequest" value="{{encRequest}}"><input type="hidden" name="access_code" id="access_code" value="{{accessCode}}"></form>
</div>
`,
})
export class DteAcceptApplicationdialog {
@Input() appId: string;
@Input() courseID: string;
user_data;
amount;
applicationId;
accessCode;
secureUrl;
encRequest;
loading = false;
constructor(protected ref: NbDialogRef<DteAcceptApplicationdialog>,
  protected api : ApiService,
  private router: Router,
  private route: ActivatedRoute,
  ) {
  }

  dismiss() {
  this.ref.close();
  }
  ngOnInit() {
    this.api.getProfileValue('Personal')
      .subscribe(
        (data: any) => {  
          this.user_data =  data['data']['user_data'];
          err => console.log(err)
      });
  }

  async downloadletter(letter){
    this.applicationId = this.appId;
    this.courseID = this.courseID;
    var document_name;
    var save_name;
    if(letter == 'Provisional Letter'){
      this.loading = true;
      document_name = '_Confirmation_provisional_Letter.pdf';
      save_name = '_Prima_Facie_Letter.pdf';
    }
    var file_name = this.applicationId + document_name;
    var save_file_name = this.applicationId + save_name;
    var recordactivity = await this.api.recordactivity(this.applicationId,this.courseID,letter);
    recordactivity.subscribe(
        data => {
          this.api.downloadFiles(file_name)
          .subscribe(data => {
           saveAs(data, save_file_name);
           this.loading = false;
          });
        },
        error => {
            console.error("Error", error);
        }
    ); 
   
  }

  
}
