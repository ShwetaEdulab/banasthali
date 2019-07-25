
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'thirdcancel',
  //styleUrls: ['./application.component.scss'],
  template: `
  <div class="row">
    <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
      <nb-card status="success">
        <nb-card-header>
          <h1>THIRD PAYMENT CANCELLED</h1>
        </nb-card-header>
        <nb-card-body>
          <a href="" ng-click="redirect()">Click here</a>
           To Go Back
        </nb-card-body>
      </nb-card>
    </div>
  </div>`,
})
export class ThirdCancelComponent  {
  user_id;
  constructor(private router: Router,
    private authService: NbAuthService,) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      this.user_id = token.getPayload()['id'];
    });
  }
  async ngOnInit() {


  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  

  
  

}

