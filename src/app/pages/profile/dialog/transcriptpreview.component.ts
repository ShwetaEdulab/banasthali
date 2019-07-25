import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import {  NbToastrService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card [style.width.px]="auto" [style.height.px]="auto" status="primary">
        <nb-card-body>
            <div ><img [src]="arr" height=":800px;" width="100%;" alt="Random first slide"></div>
        </nb-card-body>
    </nb-card>
    `,
    })
export class transcriptpreview {
    @Input() arr: any;
    auto;
    user_id;
    constructor(protected ref: NbDialogRef<transcriptpreview>,
      private router : Router,
      private authService: NbAuthService,
      protected api : ApiService,
      private toastrService: NbToastrService,
      ) {
          this.auto = 'auto';
          this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
            this.user_id = token.getPayload()['id'];
        });
    }

   
    

    
}