import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { DteAcceptApplicationdialog } from '../../DTE/dtemy-application/dialog/AcceptApplicationdialog';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-dtemy-application',
  templateUrl: './dtemy-application.component.html',
  styleUrls: ['./dtemy-application.component.scss'],
  providers:[HeaderComponent],
})
export class DTEMyApplicationComponent implements OnInit {

  id : any;
  status;
  applications = [] ;
  applicationID;
  courseID;
  alertflag = 0;

  constructor(
    private router : Router,
    private apiservice : ApiService,
    private userService: UserService,
    private comp: HeaderComponent,
    private dialogService: NbDialogService,
  ) { }

  async ngOnInit() {
    this.apiservice.getTheme();
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
      });

      var getMyApplicationrsp = await  this.apiservice.getMyApplication(this.id);
      getMyApplicationrsp.subscribe(
        data => {
         
          this.status = data['status'];
          if(this.status == '400'){
            console.error("status 400");
          }else if(this.status == '200'){
          this.applications =  data['data']['userApplications'];
          this.applicationID = this.applications[0]['application']['id'];
          this.courseID = this.applications[0]['application']['course_id'];
          }
          
      },
      error => {
          console.error("Error in wishlist :", error);
      });
  }

  loadsteps(applicationID,courseID){
    this.dialogService.open(DteAcceptApplicationdialog, {
      context: {
        appId : applicationID,
        courseID : courseID
      },
    }).onClose
    .subscribe(
      (data: any) => {
        err => console.error(err)
      })
    //this.router.navigate(['/pages/application/process'],{queryParams:{appId:applicationID,courseID:courseID}})
  }

  showalert(){
    this.alertflag = 1;
  }
  openReject(){
    this.alertflag = 2;
  }
  onClose(){		  		
    this.alertflag = 0;		
  }

}
