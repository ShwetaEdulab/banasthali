import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-cartpayment',
  templateUrl: './cartpayment.component.html',
  styleUrls: ['./cartpayment.component.scss']
})
export class CartpaymentComponent implements OnInit {

  constructor(private api : ApiService,
    public themeService : NbThemeService,
    private authService : NbAuthService,
    private dialogService: NbDialogService,) { 
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      this.user_id = token.getPayload()['id'];
    });
  }
  user_id;
  cartList;
  totalPayment;

  async ngOnInit() {
       this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    try{
      var response = await this.api.getCartValue();
      this.cartList = response['data']['course'];
      this.totalPayment = response['data']['totalCartPayment'];
    }catch(error){
      console.error("Error from ngOnInit => "+error);
    }
  }

  paymentProcess(courseId){
    this.dialogService.open(Firstpaymentdialog, {
      context: {
        courseId: courseId,
      },
   });
  }

}
