import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="500" [style.width.px]="1500" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge"> 
<nb-card-header>
    <div class="row">
        <div class="col-md-9" style="text-align:center;">Payment Details </div>
    </div>
    <button style="float:right;" nbButton shape="semi-round" size="xsmall" outline class="closeBtn ion-close-round" (click)="dismiss()"></button>
</nb-card-header>
  <nb-card-body>
    <div class="row" *ngIf='third_split == 0'>
        <table class="" border="1" bordercolor="#c4c4c4" style="width:100%">
            <thead>
                <tr>
                    <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                    <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ dateOfPayment }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                    <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ transaction_id }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Currency :</th>
                    <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ currency }}</span></td>
                </tr>
                
                <tr>
                    <th style="width: 30%;padding: 8px;">Total Amount :</th>
                    <td style="width: 60%;padding: 8px;"><span id="amount">{{ amount }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Challan : </th>
                    <td style="width: 60%;padding: 8px;">  
                    <span *ngIf="challanExist!=true">Challan not uploaded</span>
                    <a  (click)="downloadChallan(challan);"  *ngIf="challanExist!=false">Download</a>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
    <div class="row" *ngIf='third_split == 1'>
        <table class="" border="1" bordercolor="#c4c4c4" style="width:100%" *ngFor='let data of payment_details'>
            <thead>
                <tr>
                    <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                    <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ data?.dateOfPayment }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                    <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ data?.transaction_id }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Currency :</th>
                    <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ data?.currency }}</span></td>
                </tr>
                
                <tr>
                    <th style="width: 30%;padding: 8px;">Total Amount :</th>
                    <td style="width: 60%;padding: 8px;"><span id="amount">{{ data?.amount }}</span></td>
                </tr>
                <tr>
                    <th style="width: 30%;padding: 8px;">Challan : </th>
                    <td style="width: 60%;padding: 8px;">  
                    <span *ngIf="data?.challanExist!=true">Challan not uploaded</span>
                    <a  (click)="downloadChallan(data?.challanName);"  *ngIf="data?.challanExist!=false">Download</a>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
    <br>
  </nb-card-body>
</nb-card>
`,
})
export class ThirdPaymentDetailsDialogComponent {
@Input() value: number;
@Input() t_paymentMode: string;
@Input() amount: number;
@Input() currency: number;
@Input() transaction_id: string;
@Input() dateOfPayment: string;
@Input() challanExist: boolean;
@Input() challan: string;
@Input() third_split : any;
@Input() user_id : number;

display: boolean = false;
dialog_Message :string='';
preferences;
Countries: any [];
cbse_country;
sscCountryValidation = true;
loading = false;
max;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;
payment_details;


constructor(protected ref: NbDialogRef<ThirdPaymentDetailsDialogComponent>,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  public themeService : NbThemeService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        var split = ''+this.third_split;
        if(split == '1'){
            this.loading = true;
            this.adminApi.get3rdPaymentDetails(this.user_id)
            .subscribe(data => {
                this.loading = false;
                if(data['status'] == 200){
                    this.payment_details = data['data'];
                }else if(data['status'] == 400){
                    this.ref.close('error');
                }
            });
        }
        
    }

    downloadChallan(challan){
        var name = challan.substring(challan.lastIndexOf("/") + 1, challan.length);
        var a = name.split('.');
        var b = a.pop();
        var c = b.split('_');
        var ext = c[0];
        var filename = a[0] + '.' +ext;
        var challanName = 'upload/transcript/'+this.user_id+'/'+filename;
        this.adminApi.downloadChallan(challanName).subscribe(data => {
           saveAs(data,filename);  
        });
    }
    

}
