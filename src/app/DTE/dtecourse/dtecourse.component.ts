import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  ApiService
} from '../../shared/api.service';
import {
  NbSearchService, NbThemeService, NbDialogService
} from '@nebular/theme';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { DteApiService } from '../../shared/dteapi.service';
import { Firstpaymentdialog } from '../../pages/cart/dialog/Firstpaymentdialog';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'dtecourse',
  styleUrls: ['./dtecourse.component.scss'],
  templateUrl: './dtecourse.component.html',
  styles: [`
  :host nb-layout-column {
    height: 50vw;
  }
  :host nb-layout-column:first-child {
    background: #f4f4f7;
  }
  :host nb-layout-header /deep/ nav {
    justify-content: flex-end;
  }
`],
providers:[HeaderComponent,ConfirmationService],
})
export class DteCourseComponent {
  overview: any;
  courseDetail: any;
  courseDetail_Name: any;
  courseDetail_Degree: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    protected dteApi : DteApiService, 
    private searchService: NbSearchService,
    public themeService : NbThemeService,
    private comp: HeaderComponent,
    private confirmationService: ConfirmationService,
    private dialogService: NbDialogService,
    private authService: NbAuthService) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="dte"){
            this.router.navigate(['auth/logout'])
        }
      });
  }
  loading = true;
  loadingbutton = true;
  specialization;
  name;
  courseid;
  courseoverview: any;
  collegelist;
  collegelistCount;
  courselist;
  college_principal;
  college_vice_principal;
  Dropdownvar = 0;
  collegedata;
  status;
  alertflag = 0;
  course_duration;
  colleges;
  procedure;
  process: any = [];
  course_curriculum;
  placement;
  logo;
  Dropdown = 1;
  msgs : Message[]= [];
  async ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    
    
    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.dteApi.getCourseDetails(this.courseid, this.specialization);
      this.courseDetail_Name = response['data'].name;
      this.courseDetail_Degree = response['data'].degree;
      this.procedure = response['data']['admission_procedure'];
      this.overview =  response['data'].overview;
       this.process = this.procedure.slice(1, -1);
      this.course_curriculum = response['data']['course_curriculum'];
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }

    
  }

  Apply(courseid,degree){
    this.dteApi.Cart(courseid).subscribe(data=>{
      if(data['status'] == 200){
        this.dteApi.addCart(courseid).subscribe(data=>{
          if(data['status'] == 200){
            this.dialogService.open(Firstpaymentdialog, {
              context: {
                courseId: this.courseid,
              },
            });
          }else if (data['status'] == 300){
            this.confirmationService.confirm({
              message: 'Please add Degree Marks',
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.router.navigate(['pages/DTEProfile'],{queryParams:{courseId:courseid,degree:degree}});
              },
              reject: () => {
                this.ngOnInit();
              }
            });
          }else if(data['status'] == 401){
            this.router.navigate(['pages/DTEProfile']);
          }
        })
      }else{
        this.router.navigate(['pages/DTECart']);
      }
    });
    
  }


  
}
