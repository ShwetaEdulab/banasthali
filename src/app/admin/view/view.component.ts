import {Component, ViewChild} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {Location} from '@angular/common';
import { saveAs } from 'file-saver';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { transcriptpreview } from './transcriptpreview.component';
import { NbDialogService, NbStepperComponent } from '@nebular/theme';
import {config} from './../../../../config';
@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class AdminViewComponent {
  @ViewChild('stepper') stepper: NbStepperComponent;
  serverUrl = config.serverUrl;
  studentData;
  userTranscripts;
  category;
  userId;
  courseId;
  applicationId;
  student_category: any;
  NRI_of_Gulf: string[];
  NRI_of_SEAsia: string[];
  Foreign_National: string[];
  OCI: string[];
  PIO: string[];
  tabcheck1: any;
  tabcheck4: any;
  tabcheck2: any;
  tabcheck3: any;

  products = [
    {name: "Photo", category: "NRI of Gulf"}, {name: "Work Permit", category: "NRI of SEAsia"}, {name: "SSC Certificate", category: "Foreign National"},
    {name: "Sign", category: "NRI of Gulf"}, {name: "Gap Certificate", category: "teNRI of SEAsiach"}, {name: "Photo", category: "Foreign National"},
    {name: "Passport", category: "fruNRI of Gulfit"}, {name: "Migration Certificate", category: "NRI of SEAsia"}, {name: "Country Id Card", category: "Foreign National"},
    {name: "SSC Certificate", category: "NRI of Gulf"}, {name: "Photo", category: "NRI of SEAsia"}, {name: "First Year Certificate", category: "Foreign National"},
    {name: "HSC Certificate", category: "NRI of Gulf"}, {name: "Sponsorship Letter", category: "NRI of SEAsia"}, {name: "Second Year Certificate", category: "Foreign National"},
    {name: "School Passing Certificate", category: "NRI of Gulf"}, {name: "Sign", category: "NRI of SEAsia"}, {name: "Graduation Certificate", category: "Foreign National"},
    {name: "Birth Certificate", category: "NRI of Gulf"}, {name: "Passport of Sponsor Parent", category: "NRI of SEAsia"}, {name: "Convocation Certificate", category: "Foreign National"},
    {name: "Migration Certificate", category: "NRI of Gulf"}, {name: "Employment Letter", category: "NRI of SEAsia"}, {name: "Sign", category: "Foreign National"},
    {name: "Gap Certificate", category: "NRI of Gulf"}, {name: "Residence Proof", category: "NRI of SEAsia"}, {name: "Passing Certificate", category: "Foreign National"},
    {name: "Passport of Sponsor Parent", category: "NRI of Gulf"}, {name: "Bank Statement", category: "NRI of SEAsia"}, {name: "Photo", category: "OCI"},
    {name: "NRI Certificate of Sponsor", category: "NRI of Gulf"}, {name: "Country Id Card", category: "NRI of SEAsia"}, {name: "Birth Certificate", category: "OCI"},
    {name: "Visa of Sponsor Parent", category: "NRI of Gulf"}, {name: "Birth Certificate", category: "NRI of SEAsia"}, {name: "SSC Certificate", category: "OCI"},
    {name: "Work Permit", category: "NRI of Gulf"}, {name: "Admit Card", category: "NRI of SEAsia"}, {name: "Passport", category: "OCI"},
    {name: "Employment Letter", category: "NRI of Gulf"}, {name: "Visa of Sponsor Parent", category: "NRI of SEAsia"}, {name: "Sign", category: "OCI"},
    {name: "Residence Proof", category: "NRI of Gulf"}, {name: "NRI Certificate of Sponsor", category: "NRI of SEAsia"}, {name: "OCI", category: "OCI"},
    {name: "Bank Statement", category: "NRI of Gulf"}, {name: "School Passing Certificate", category: "tNRI of SEAsiaech"}, {name: "HSC Certificate", category: "OCI"},
    {name: "Sponsorship Letter", category: "NRI of Gulf"}, {name: "HSC Certificate", category: "NRI of SEAsia"}, {name: "School Passing Certificate", category: "OCI"},
    {name: "PreBoard Certificate", category: "NRI of Gulf"}, {name: "HSC Certificate", category: "Foreign National"}, {name: "Photo", category: "PIO"},
    {name: "Sign", category: "PIO"},{name: "HSC Certificate", category: "PIO"},{name: "PIO", category: "PIO"},
    {name: "Passport", category: "PIO"},{name: "Birth Certificate", category: "PIO"},{name: "School Passing Certificate", category: "PIO"},
    {name: "PhoSSC Certificateto", category: "PIO"},{name: "Migration Certificate", category: "PIO"},{name: "PhoGap Certificateto", category: "PIO"},
    
  ];
  user_type: string;
  constructor(protected adminApi : AdminApiService,
    private route: ActivatedRoute,
    private _location: Location,
    private authService : NbAuthService,
    private router : Router,
    private dialogService: NbDialogService,
    ) { 
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
          this.router.navigate(['auth/logout'])
        }
      });
  }

  async ngOnInit(){
  try {
    this.category=this.route.snapshot.queryParamMap.get('category');
    this.user_type=this.route.snapshot.queryParamMap.get('user_type');
    this.userId=this.route.snapshot.queryParamMap.get('userId');
    this.courseId=this.route.snapshot.queryParamMap.get('courseId');
    this.applicationId=this.route.snapshot.queryParamMap.get('applicationId');
    var tab = this.route.snapshot.queryParamMap.get('tab');
    if(this.category==="application" || this.category==="eligibility"){
      
      if(this.user_type == 'student'){
        var stepper = await this.adminApi.getAllStudentStepperData(this.userId,this.courseId,this.applicationId,'other');
        this.tabcheck1 = stepper['data']['tab1'];
        if(this.tabcheck1==true){
          this.stepper.selectedIndex = 14
        }
        this.tabcheck2 = stepper['data']['tab2'];
        this.tabcheck3 = stepper['data']['tab3'];
        this.tabcheck4 = stepper['data']['tab4'];
        var viewAllData = await this.adminApi.getAllUserData(this.userId,this.courseId,this.applicationId,tab);
        this.studentData =  viewAllData['data'];
        this.userTranscripts = viewAllData['data']['userTranscripts'];
        this.student_category = viewAllData['data']['nationality_info']['student_category'];
        this.NRI_of_Gulf = this.products.filter(p => p.category == "NRI of Gulf").map(p => p.name);
        this.NRI_of_SEAsia = this.products.filter(p => p.category == "NRI of SEAsia").map(p => p.name);
        this.Foreign_National = this.products.filter(p => p.category == "Foreign National").map(p => p.name);
        this.OCI = this.products.filter(p => p.category == "OCI").map(p => p.name);
        this.PIO = this.products.filter(p => p.category == "PIO").map(p => p.name);
      }else if(this.user_type == 'dte'){
        
        var viewAllData = await this.adminApi.getAllDTEStudentData(this.userId);
        this.studentData =  viewAllData['data'];
        this.userTranscripts = viewAllData['data']['userTranscripts'];
        this.student_category = viewAllData['data']['nationality_info']['student_category'];
        this.NRI_of_Gulf = this.products.filter(p => p.category == "NRI of Gulf").map(p => p.name);
        this.NRI_of_SEAsia = this.products.filter(p => p.category == "NRI of SEAsia").map(p => p.name);
        this.Foreign_National = this.products.filter(p => p.category == "Foreign National").map(p => p.name);
        this.OCI = this.products.filter(p => p.category == "OCI").map(p => p.name);
        this.PIO = this.products.filter(p => p.category == "PIO").map(p => p.name);
      }
    }else if(this.category==="studentmgmt"){   
      if(this.user_type == 'student'){
        var stepper = await this.adminApi.getAllStudentStepperData(this.userId,this.courseId,this.applicationId,'studentmgmt');
        this.tabcheck1 = stepper['data']['tab1'];
        if(this.tabcheck1==true){
          this.stepper.selectedIndex = 14
        }
        this.tabcheck2 = stepper['data']['tab2'];
        this.tabcheck3 = stepper['data']['tab3'];
        this.tabcheck4 = stepper['data']['tab4'];
        var viewAllData = await this.adminApi.getAllStudentData(this.userId);
        this.studentData =  viewAllData['data'];
        this.userTranscripts = viewAllData['data']['userTranscripts'];
        this.student_category = viewAllData['data']['nationality_info']['student_category'];
        this.NRI_of_Gulf = this.products.filter(p => p.category == "NRI of Gulf").map(p => p.name);
        this.NRI_of_SEAsia = this.products.filter(p => p.category == "NRI of SEAsia").map(p => p.name);
        this.Foreign_National = this.products.filter(p => p.category == "Foreign National").map(p => p.name);
        this.OCI = this.products.filter(p => p.category == "OCI").map(p => p.name);
        this.PIO = this.products.filter(p => p.category == "PIO").map(p => p.name);
      }else if(this.user_type == "dte"){
        var viewAllData = await this.adminApi.getAllDTEStudentData(this.userId);
        this.studentData =  viewAllData['data'];
        this.userTranscripts = viewAllData['data']['userTranscripts'];
        this.student_category = viewAllData['data']['nationality_info']['student_category'];
        this.NRI_of_Gulf = this.products.filter(p => p.category == "NRI of Gulf").map(p => p.name);
        this.NRI_of_SEAsia = this.products.filter(p => p.category == "NRI of SEAsia").map(p => p.name);
        this.Foreign_National = this.products.filter(p => p.category == "Foreign National").map(p => p.name);
        this.OCI = this.products.filter(p => p.category == "OCI").map(p => p.name);
        this.PIO = this.products.filter(p => p.category == "PIO").map(p => p.name);
      }
    }else if( this.category==="iccr"){      
      var viewAllData = await this.adminApi.getAllIccrStudentData(this.userId,this.courseId,this.applicationId,tab);
      this.studentData =  viewAllData['data'];
      this.userTranscripts = viewAllData['data']['userTranscripts'];
    }else if(this.category === "dashboard"){
      console.log("dashboard")
      console.log(this.userId);
        var data = await this.adminApi.getUserInformation(this.userId);
        console.log(data['status']);
        if(data['status'] == 200){
          var viewAllData = await this.adminApi.getAllStudentData(this.userId);
          this.studentData =  viewAllData['data'];
          this.userTranscripts = viewAllData['data']['userTranscripts'];
          this.student_category = viewAllData['data']['nationality_info']['student_category'];
          this.NRI_of_Gulf = this.products.filter(p => p.category == "NRI of Gulf").map(p => p.name);
          this.NRI_of_SEAsia = this.products.filter(p => p.category == "NRI of SEAsia").map(p => p.name);
          this.Foreign_National = this.products.filter(p => p.category == "Foreign National").map(p => p.name);
          this.OCI = this.products.filter(p => p.category == "OCI").map(p => p.name);
          this.PIO = this.products.filter(p => p.category == "PIO").map(p => p.name);
        }else{
          alert("Network Error")
        }
      
    }

    } catch (error) {
      console.log("Error", error);
    }

}

imagePopup(imagename){
  this.dialogService.open(transcriptpreview, {
    context: {
     arr : imagename
    },
   });
}

preview(category,user_type){

  if(user_type == 'dte'){
    this.adminApi.dte_preview(this.userId,this.courseId,this.applicationId).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, this.applicationId+'_Preview.pdf');    
        });
       
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }else{
    this.adminApi.preview(this.userId,this.courseId,this.applicationId).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, this.applicationId+'_Preview.pdf');    
        });
       
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }
}

DownloadTranscript(file_path,name){
  this.adminApi.downloadFiles(file_path)
  .subscribe(data => {
    saveAs(data, name);    
  });
}

Back(){
  this._location.back();
}
}
