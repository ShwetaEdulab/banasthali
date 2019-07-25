import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { ApiService } from '../../../shared/api.service';
import {DTEOtpComponent } from './otp.component';
import { NbDialogService } from '@nebular/theme';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card style ="font-size: 16px;" [style.height.px]="150">
   
      <nb-card-body>
     
                   You Have been Successfully Registered. Please login with OTP
           
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="primary" (click)="Ok()">OK</button> 
        
      </nb-card-footer>
    </nb-card>
    `,
    })
    export class DTERegisteredComponent {
        @Input() email:string;
        @Input()  password:string;
        @Input()    userCountryCode :string;
        @Input()    userContactNo :string;
        @Input()    user_id :string;
        otp;
        alertflag=0;
            constructor(protected ref: NbDialogRef<DTERegisteredComponent>,
                protected api : ApiService,
                private dialogService: NbDialogService,) {
            }
        
            Ok(){
                this.dialogService.open(DTEOtpComponent, {
                    closeOnBackdropClick : false,
                    context: {
                     email: this.email,
                     password:this.password,
                     userCountryCode:this.userCountryCode,
                     userContactNo :this.userContactNo,
                     user_id  : this.user_id
                    },
                 });
                 this.ref.close();                
            }
        
            close()
            {
                this.alertflag=0;         
            }
            dismiss() {            
                this.ref.close();
                }
            
        }