import { Component } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { SupportapiService } from '../../shared/supportapi.service';
import { NewTicketComponent } from './newTicket/newTicket.component';
import {Data} from '../../shared/data';
import { FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
@Component({
    selector: 'help',
    styleUrls: ['./help.component.scss'],
    templateUrl: './help.component.html',
    providers:[HeaderComponent],
})

export class HelpComponent  {
  tickets;
  show = false;
  p: number = 1;
  user = {role :""};
  length;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  user_id;
  constructor(private dialogService: NbDialogService,
    private router: Router,
    private userService: UserService,
    protected api : ApiService,
    private supportapi : SupportapiService,
    public themeService : NbThemeService,
    private globalVar : Data,
    private mainsocket: Socket,
    private authService : NbAuthService,
    private route: ActivatedRoute) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      this.user_id = token.getPayload()['id'];
      });
    }
    
  ngOnInit(){
    this.filterText = "";
  this.filterPlaceholder = "Search";
    this.p = parseInt(this.route.snapshot.queryParamMap.get('page'));
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
      this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      var response =  this.supportapi.getUserTickets();
      response.subscribe(
      data => {
        if(data['data']){
          this.show = true;
          this.tickets = data['data'];
          // this.tickets = dataTicket.sort((a, b) => new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime());
          //console.log('this.tickets====='+JSON.stringify(this.tickets))
          
          //console.log(this.tickets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
          this.length = this.tickets.length;
          this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        }); 
        }else{
          this.show = false;
          this.length = 0;
        }
      },
      error => {
        console.error("ngOnInit getUserTickets : ", error);
      }
    )
       
    if(this.route.snapshot.queryParamMap.get('category')){
      this.filterText=this.route.snapshot.queryParamMap.get('userEmail')
    }else{
      if(this.route.snapshot.queryParamMap.get('userEmail')){
        this.createTicket();
      }
    }
  }

  pageChanged(p){
		this.p = p;
		this.globalVar.ViewpageValue=p;
	}
  viewTicket(uid){
    this.globalVar.tabIndex= 5;
    this.router.navigate(['pages/viewTicket'],{queryParams:{ticket_uid:uid}});
  }

  createTicket(){
    this.dialogService.open(NewTicketComponent, {
      context: {
        title : 'Raise Ticket',
        userEmail : this.route.snapshot.queryParamMap.get('userEmail')
      },
    }).onClose.subscribe( data =>{
      this.router.navigate(['pages/help']);
    });
  }
}