import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[HeaderComponent],
})
export class SettingsComponent implements OnInit {

  user_id;
  constructor(private api : ApiService,
    private route: ActivatedRoute,
     private router: Router,
     private authService : NbAuthService,
     public themeService : NbThemeService,
     private comp: HeaderComponent) { 
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      this.user_id = token.getPayload()['id'];
      });
     }


  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
  }

  changePassword(){
    this.router.navigateByUrl('/auth/changePassword');
  }

}
