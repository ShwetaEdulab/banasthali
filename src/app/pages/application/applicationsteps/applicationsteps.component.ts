
import { Component , OnInit , Input, ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { CountriesService } from '../../../@core/data/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService , NbDialogService, NbStepperComponent, NbThemeService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver';
import { Secondpaymentdialog } from './dialog/Secondpaymentdialog';
import { Thirdpaymentdialog } from './dialog/Thirdpaymentdialog';
import { uploadreceiptdialog } from './dialog/uploadreceiptdialog';
import { uploadthirdreceiptdialog } from './dialog/uploadthirdreceiptdialog';
import { config } from '../../../../../config';
import { RouterExtService } from '../../../shared/identifyUrl';
import { DocumentVerificationdialog } from './dialog/documentVerification';
@Component({
  selector: 'applicationsteps',
  styleUrls: ['./applicationsteps.component.scss'],
  templateUrl: './applicationsteps.component.html',
})
export class ApplicationStepsComponent implements OnInit {
  @ViewChild('stepper') stepper: NbStepperComponent;
  applicationId;
  paymentDone = false;
  id : any;
  courseID;
  specialization;
  letter;
  uploadedFiles: any[] = [];
  userId;
  Countries: any [];
  ProvisionalForm: FormGroup;
  visaForm: FormGroup;
  ApplicationForm: FormGroup;
  EnrollmentForm : FormGroup;
  ThirdPaymentForm : FormGroup;
  FirmLetterForm : FormGroup;
  MedicalUploadForm : FormGroup;
  RPForm : FormGroup;
  submitted = false;
  medicalsubmitted = false;
  rpsubmitted = false;
  min: Date;
  max: Date;
  visadetails;
  visacountry;
  visaissuedate;
  visaissuedate1;
  visaissuedatedetails;
  visaexpirydate1;
  visaexpirydatedetails;
  visaexpirydate;
  medicalissuedate1;
  medicalissuedatedetails;
  MedicalIssueDate;
  document_type;
  imagevalue;
  serverUrl = config.serverUrl;
  secondpaymentdata;
  showonline;
  trans1details = 0;
  trans2details = 0;
  showoffdown = 0;
  showonldown = 0;
  enrollmentdetails;
  showfirmnext = 0;
  medicaldetails;
  rpdetails;
  dont_haveto_appear = 0;
  haveto_appear = 0;
  doctorcountry;
  user_data;
  student_category;
  imageToShow;
  index;
  visaImage;
  passImage;
  thirdpaymentdetails;
  medicalImage;
  medicalImageName;
  RPImage;
  RPImageName;
  countryImage;
  showvisaImage = 0;
  showpassImage = 0;
  showcountryImage = 0;
  showmedicalImage = 0;
  showRPImage = 0;
  loading = false;
  showpassbuttondiv;
  showcidbuttondiv;
  country_birth;
  third_not_available;
  tab1;
  tab2;
  tab3;
  tab4;
  tab5;
  tab6;
  tab7;
  tab8;
  tabcheck1;
  tabcheck2;
  tabcheck3;
  tabcheck4;
  tabcheck5;
  tabcheck6;
  tabcheck7;
  tabcheck8;
  alerttab1;
  alerttab2;
  alerttab3;
  alerttab4;
  alerttab5;
  alerttab6;
  alerttab7;
  alerttab8 = 'true';
  visa_complete = false;
  split_payment;
  split_third_payment;
  third_pay_1 = 0;
  third_pay_2 = 0;
  third_pay_3 = 0;
  third_pay_4 = 0;
  third_fees;
  website_satisfy = 0;
  website_recommend = 0;
  staff_satisfy = 0;
  experience_problem = 0;
  firmLetterdata: any;
  showExperience = false;
  feedback_message ;
  validations_flag = false;
  user_id;
  constructor(private router: Router,
    private route: ActivatedRoute,
    protected api : ApiService,
    protected countries :CountriesService,
    private formBuilder: FormBuilder,
    protected dateService: NbDateService<Date>,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService,
    public themeService : NbThemeService,
    private routerExtService : RouterExtService) {
    this.min = this.dateService.today();
    this.max = this.dateService.today();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      this.user_id = token.getPayload()['id'];
    });
  }

  get f() { return this.visaForm.controls; }
  get m() { return this.MedicalUploadForm.controls; }
  get r() { return this.RPForm.controls; }

  async downloadletter(letter){
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    var document_name;
    var save_name;
    if(letter == 'Provisional Letter'){
      this.loading = true;
      document_name = '_Confirmation_provisional_Letter.pdf';
      save_name = '_Prima_Facie_Letter.pdf';
    }else if(letter == 'Application Form Letter'){
      this.loading = true;
      document_name = '_Preview.pdf'
      save_name = '_Provisional_Admission_Letter.pdf';
    }else if(letter == 'Firm Letter'){
      this.loading = true;
      document_name= '_Final_Letter.pdf'
      save_name = '__Final_Admission_Letter.pdf';
    }
    var file_name = this.applicationId + document_name;
    var save_file_name = this.applicationId + save_name;
    var recordactivity = await this.api.recordactivity(this.applicationId,this.courseID,letter);
    recordactivity.subscribe(
        data => {
          this.api.downloadFiles(file_name)
          .subscribe(data => {
           saveAs(data, save_file_name);
           this.loading = false;
          });
          if(letter == 'Firm Letter'){
            this.alerttab7 = 'false';
            this.showfirmnext=1;
          }
        },
        error => {
            console.error("Error", error);
        }
    ); 
   
  }

  ngOnInit() {
    
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.Countries = this.countries.getData();
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
        this.country_birth = user['country_birth'];
    });
    this.checkPayment();
    this.userId = this.id;
   
  }

  private checkPayment(){
    this.api.check1stpayment(this.courseID,this.applicationId)
    .subscribe(
      (data: any) => {
        if(data['status'] == 200){
          this.paymentDone = true;
          this.secondpaymentdata = data['data'];
        }else{
        }
      });
  }

  downloadReceipt(transaction_id,payment_amount,payment_status,application_id,payment_date_time,enrollment_no,user_id){
    var generatereceipt =  this.api.OnlinePaymentChallan('1',transaction_id,payment_amount,payment_status,application_id,payment_date_time,enrollment_no,user_id);
    generatereceipt.subscribe(
      data => {
        var value = application_id+'_First_Online_Payment_Challan.pdf';
        this.api.downloadFiles(value)
        .subscribe(data => {
          saveAs(data, value);
        });
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }

  payCourseFees(){
    this.api.getFees(this.route.snapshot.queryParamMap.get('courseID'))
    .subscribe(
      (data: any) => {
        //console.log("data['data']['fees']========>"+data['data']['fees']);
       // var fees = data['data']['fees'] + parseInt('10') + parseInt('500') + parseInt('500');
       var fees = data['data']['fees'];
        if(data['status'] == 200){
          this.dialogService.open(Secondpaymentdialog, {
            context: {
              applicationID : this.applicationId,
              courseID : this.courseID,
              payment_amount : ''+fees,
            },
          }).onClose
          .subscribe(
            (data: any) => {
              this.ngOnInit();
              err => console.error(err)
            });
        }
      });
  }
}

