import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminApiService } from '../../shared/adminapi.service';
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { CountriesService } from '../../@core/data/countries.service';

@Component({
  selector: 'ngx-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss']
})
export class StudentManagementComponent implements OnInit {
  selectedYear ='2019'
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  p: number = 1;
  studentdata: any;
  active: any;
  FromDate: any;
  ToDate: any;
  alert = 1;
  message: string;
  Country
  selectedCountry;
  Countries: any [];
  country_id: any;
  constructor(protected adminApi : AdminApiService,private router : Router,private authService : NbAuthService,protected countries :CountriesService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
          this.router.navigate(['auth/logout'])
        }
        this.Countries = this.countries.getData();
    });
   }

  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.adminApi.getallstudents(this.selectedYear,'','','').subscribe((data)=>{
      this.studentdata = data['data'];
      this.active=data['counts'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  disablestate(country_id){
    this.country_id = country_id
    this.adminApi.getallstudents(this.selectedYear,'','',country_id).subscribe((data)=>{
      this.studentdata = data['data']
      this.active=data['counts'];
    })
  }

  From(data){
    this.FromDate = data.value;
  }

  To(data1){
    this.ToDate = data1.value;
  }

  Search(){
    if(this.FromDate == undefined || this.ToDate == undefined){
      this.alert = 0;
      this.timer();
      this.message = 'Select From And To date';
    }else{
      this.adminApi.getallstudents(this.selectedYear,this.FromDate,this.ToDate,this.country_id).subscribe((data)=>{
        this.studentdata = data['data']
        this.active=data['counts'];
      })
    }
  }

  filterYear(year){
    this.adminApi.getallstudents(year,'','','').subscribe((data)=>{
      this.studentdata = data['data']
      this.active=data['counts'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        
      this.filterText = term;
    });

  }

  viewMore(category,userId,user_type,course_id){
    this.router.navigate(['pages/adminView'],{queryParams:{userId : userId,category:category,user_type:user_type,courseId:course_id}});
  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email,category:'studentgmt'}}); 

  }
  
  status(status,userId){
    this.adminApi.status(status,userId).subscribe((data)=>{
      if (data['status']== 200){
        this.ngOnInit();
        alert(data['message']);
      }else{
        alert('Something Went Wrong !!!');
      }
      
    })
  }

  timer(){
    setTimeout(()=>{
      //this.onClose();
      this.alert = 1;
    },500);
  }
  
 

}
