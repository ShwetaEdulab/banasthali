import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbDateService, NbDialogService, NbThemeService } from '@nebular/theme';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'dtecart',
  styleUrls: ['./dtecart.component.scss'],
  templateUrl: './dtecart.component.html',
  providers:[HeaderComponent],
  
})
export class DTECartComponent  {
  items = [
    { title: 'View' },
    { title: 'Checkout' },
  ];
  constructor(private router : Router,
    private api : ApiService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
    public themeService : NbThemeService,
    private authService : NbAuthService,
    private comp: HeaderComponent 
) {
  this.authService.onTokenChange()
  .subscribe((token: NbAuthJWTToken) => {
    this.user_id = token.getPayload()['id'];
  });
   
  }
  user_id;
 cartList;
 totalPayment;
 courseId;
 preferencesList;
 preferences_created;
 total_pref;
 colleges;

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

  async remove(courseId){
    var result = await this.api.cartRemove(courseId);
    result.subscribe(data => {
        this.ngOnInit();
      },
      error => {
        console.error("Error", error);
      }
    )
  }

  async preferencesRedirect(courseId){
    this.router.navigate(['/pages/preferences'],{queryParams:{courseId:courseId}})
  }

  paymentProcess(courseId){
    this.dialogService.open(Firstpaymentdialog, {
      context: {
        courseId: courseId,
      },
   });
  }

}

