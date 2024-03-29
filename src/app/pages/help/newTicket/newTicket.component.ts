import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService, NbThemeService} from '@nebular/theme';
import { ApiService } from '../../../shared/api.service'
import { Router  } from '@angular/router';
import { SupportapiService } from '../../../shared/supportapi.service';
import { UserService } from '../../../@core/data/users.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
    selector: 'nb-dialog',
    templateUrl: './newTicket.component.html',
    styleUrls: ['./newTicket.component.scss']
})

export class NewTicketComponent implements OnInit {
    @Input() title : string;
    @Input() userEmail :string;
    subject;
    content = "";
    owner;
    user={email:"",role:""};
    groups; 
    group;
    email: any;
    user_id;
    constructor(protected ref: NbDialogRef<NewTicketComponent>,
      private api : ApiService,
      private supportapi : SupportapiService,
      private toastrService: NbToastrService,
      private userService: UserService,
      private authService : NbAuthService,
      public themeService : NbThemeService) { 
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

      this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      var response =  this.supportapi.getGroups();
      response.subscribe(data => {
        this.groups = data['data'];
        this.owner = data['owner'];
        if(this.user.role == "student" || this.user.role == "dte"){
          this.groups.forEach(grp => {
              if(grp.name == this.user.email){
                this.group = grp.id
              }
          });
        } else if(this.user.role == "admin" || this.user.role == "sub_admin"){
            if(this.userEmail){
              this.groups.forEach(grp => {
                if(grp.name == this.userEmail){
                  this.group = grp.id
                }
              });
            } 
        }
      })
    }
    
    dismiss() {
      this.ref.close();
      }
    
    getData(e){
      this.email = e.name;
    }
   
    send(){
      //console.log("this.owner------->"+this.owner)
      if(this.user.role == 'admin' || this.user.role == 'sub_admin'){
        if(this.userEmail == null){
          var response =  this.supportapi.createTicket(this.subject,this.content,this.group.id,this.owner,this.email);
        }else{
          var response =  this.supportapi.createTicket(this.subject,this.content,this.group,this.owner,this.userEmail);
        }
      }else if(this.user.role == 'student' || this.user.role == 'dte'){
        var response =  this.supportapi.createTicket(this.subject,this.content,this.group,this.owner,'');
      }
      //var response =  this.supportapi.createTicket(this.subject,this.content,this.group.id,this.owner,this.email);
      response.subscribe(
        data => {
          if(data['status'] == 200){
            this.toastrService.show(
              status || 'Success',       
              `Ticket Created susccessfully ! ! `, 
            );
            this.ref.close();
          }else{
            this.toastrService.show(
              status || 'Denger',       
              `Ticket Not Created  ! ! `, 
            );
          }
        },
        error => {
          console.error("createTicket : ", error);
        }
      ); 
    }
  
  }