import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import {Location} from '@angular/common';
import { SupportapiService } from '../../../shared/supportapi.service';
import { ApiService } from '../../../shared/api.service';
import {Data} from '../../../shared/data';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ConfirmationService } from 'primeng/api';
import { config } from '../../../../../config';
import { AdminApiService } from '../../../shared/adminapi.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
//import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'viewTicket',
    styleUrls: ['./viewTicket.component.scss'],
    templateUrl: './viewTicket.component.html',
    providers:[ConfirmationService],
})

export class ViewTicketComponent{
  serverUrl = config.serverUrl;
    ticketData;
    comments;
    today;
    comment="";
    user = {email :"",name:"",role:""};
    ticketStatus;
    status = [{name:"New", value:0},{name:"Open", value:1},{name:"Pending", value:2},{name:"Closed", value:3}];
    currenttoken: NbAuthJWTToken;
    index;
    position;
    status1;
    attachment: any;
    user_id;
    constructor(private toastrService: NbToastrService,
        private router: Router,
        private route : ActivatedRoute,
        private userService: UserService,
        private supportapi : SupportapiService,
        private _location: Location,
        private api : ApiService,
        private globalVar : Data,
        private authService: NbAuthService,
        protected adminApi : AdminApiService,
        private confirmationService: ConfirmationService,
        public themeService : NbThemeService){
          this.authService.onTokenChange()
          .subscribe((token: NbAuthJWTToken) => {
          this.user_id = token.getPayload()['id'];
          });
        }
    
    ngOnInit(){
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
              this.themeService.changeTheme(data['data']);
            }else{
              this.themeService.changeTheme('default');
            }
          });
        this.userService.onUserChange()
        .subscribe((user: any) => {this.user = user
          if(this.user.role==='student'){
            var response =  this.supportapi.getSingleTicket(uid);
            response.subscribe(
                data => {
                    this.ticketData = data['data'];   
                    this.ticketStatus = this.ticketData.status;                
                    this.comments = this.ticketData['comments'];                           
                },
                error => {
                    console.error("ngOnInit get Single Ticket : ", error);
                }
          );

          }
        });
        this.comment="";
        var uid = this.route.snapshot.queryParamMap.get('ticket_uid');
        this.today = new Date().toUTCString();        
        var response =  this.supportapi.getSingleTicket(uid);
        response.subscribe(
            data => {
                this.ticketData = data['data'];   
                this.ticketStatus = this.ticketData.status;                
                this.comments = this.ticketData['comments'];                           
            },
            error => {
                console.error("ngOnInit get Single Ticket : ", error);
            }
        );

        var data = this.supportapi.getAttachment(uid);
        data.subscribe(
          data => {
            if(data['status'] == 200){
              this.attachment = data ['data'];
            }else{
              this.attachment = ''
            }
            
          }
        )
    }

    // backClicked(){
    //     this._location.back();
    // }

    backClicked(){
      if(this.user.role==='student'){
        this._location.back();
      }else{
        var index = this.globalVar.tabIndex;
        if(index == '2'){
          var OpenTicketpageValue = this.globalVar.OpenTicketpageValue;
          this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,OpenTicketpageValue:OpenTicketpageValue}});
        }else if(index == '3'){
          var newTicketpageValue = this.globalVar.newTicketpageValue;
          this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,newTicketpageValue:newTicketpageValue}});
        }else if(index == '4'){
          var CloseTicketpageValue = this.globalVar.CloseTicketpageValue;
          this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,CloseTicketpageValue:CloseTicketpageValue}});
        }else if(index == '5'){
          var page = this.globalVar.ViewpageValue;
          this.router.navigate(['/pages/help'],{queryParams:{page:page}});
        }
      }
      
    }


    writeComment(role,email){
      var response =  this.supportapi.commentOnTicket(this.ticketData.ticket_id,this.comment,role,email);
        response.subscribe(
        data => {
          this.toastrService.show(
            status || 'Success',       
            `Comment added successfully ! ! `, 
          );
        this.ngOnInit();
        
        },
        error => {
          console.error("commentOnTicket : ", error);
        }
      ); 
    }

    changeStatus(event){
      var response =  this.supportapi.updateStatus(this.ticketData.ticket_id,event.value);
        response.subscribe(
        data => {
          
        },
        error => {
          console.error("changeStatus : ", error);
        }
      ); 
    }

    onBeforeSend(event) {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.currenttoken = token;
          event.xhr.setRequestHeader("Authorization", `Bearer ` + this.currenttoken);
        }
      });
    }

    onUpload(event: any) {
      const reader = new FileReader();
      var duration = 10000;
      this.index += 1;
      this.position = 'top-right';
      this.status1 = 'success';
      this.ngOnInit();
      if (event.files && event.files.length) {
        const [file] = event.files;
        reader.readAsDataURL(file);
        var json = JSON.parse(event.xhr.response);
        var yourData = json.Data; // or json["Data"]
        var yourStatus = json.status; // or json["Data"]
        var yourMessage = json.message; // or json["Data"]

        if (yourStatus == 200) {
          this.toastrService.show(
            ` ` + yourMessage, {
              duration
            }
          );
        } else if (yourStatus == 401) {
         // this.loading = false;
          this.toastrService.show(
            ` ` + yourMessage, {
              duration
            }
          );
        } else if (yourStatus == 400) {
         // this.loading = false;
          this.toastrService.show(
            ` ` + yourMessage, {
              duration
            }
          );
        }
      }
  }

    onSelect($event: any,value): void {
      var maxFileSize =  5000000;
      var imgArr = $event.files[0].name.split('.');
      var extension = imgArr[imgArr.length - 1].trim();
      if ($event.files[0].size > maxFileSize) {
        this.confirmationService.confirm({
          message: 'Maximum file size should be 5 MB.',
          header: 'Invalid File Size',
          icon: 'pi pi-info-circle',
          rejectVisible : false,
          acceptLabel: 'Ok'
        });
      }
  
      if(value!=undefined && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' ) ) {
        this.confirmationService.confirm({
          message: 'Please upload your transcript in .jpeg or .jpg or .png formats',
          header: 'Invalid File Type',
          icon: 'pi pi-info-circle',
          rejectVisible : false,
          acceptLabel: 'Ok'
        });
      }
  
      if(value==undefined && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf' && extension!='JPG' && extension!='JPEG' && extension!='PNG' && extension!='PDF' )){
        this.confirmationService.confirm({
          message: 'Please upload your transcript in .jpeg or .jpg or .png or .pdf formats',
          header: 'Invalid File Type',
          icon: 'pi pi-info-circle',
          rejectVisible : false,
          acceptLabel: 'Ok'
        });
      }
    }

    onErrorFileUpload(event: any){
      var duration = 10000;
       if (event.xhr.response == ""){
        this.toastrService.show(
          `Network Error. Please try again after some time.`,
          { duration }
        );
      
      }
      //console.error("onErrorFileUpload Event", event);
    }

    download(path,name){
      this.adminApi.downloadFiles(path)
      .subscribe(data => {
        saveAs(data, name);    
      });
    }

}