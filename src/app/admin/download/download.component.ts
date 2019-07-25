import {Component ,OnInit} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbAuthService,
  NbAuthJWTToken
} from '@nebular/auth';

@Component({
  selector: 'download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class AdminDownloadComponent {
  currenttoken;
  colleges: any;
  selectedValue;
  college: any;
  loading=false;
  selectedYear ='2019';
  constructor(protected adminApi : AdminApiService,private router : Router,private authService: NbAuthService,) { 
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
        this.router.navigate(['auth/logout'])
      }
    });
  }

  filterYear(year){
    this.selectedYear = year;
  }

  ngOnInit(){
    this.adminApi.getallColleges().subscribe((data)=>{
      this.colleges = data['data'];
    })
  }

  getData(college){
    this.college = college
  }

  downloadFirstPaymentStudentExcel(){
    this.adminApi.downloadFirstPaymentStudentExcel(this.selectedYear).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'FirstPaymentStudent.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

  downloadStudentExcel(){
    this.adminApi.downloadStudentExcel(this.selectedYear).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'Student.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

  showSeatsExcel(){
    this.adminApi.showSeatsExcel().subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'seats_sheet.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

  ICCRExcel(){
    this.adminApi.ICCRExcel().subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'Student_ICCR.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }
  
  paymentDetailsExcel(){
    this.adminApi.paymentDetailsExcel(this.selectedYear).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'All_Payment_Details.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

  showThirdPaymentExcel(){
    this.adminApi.showThirdPaymentExcel(this.selectedYear).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, 'Third_Payment_Details.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

  showCollegeAllocatedExcel(){
    this.loading = true;
    this.adminApi.showCollegeAllocatedExcel(this.selectedYear,this.college).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          this.loading = false;
          saveAs(data, 'College_List.xlsx');    
        });
      }else{
        //alert("You can't download firm letter until you allocate any college.")
      }
    })
  }

}