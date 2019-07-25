import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators, FormControl, } from '@angular/forms';
import { DteApiService } from '../../shared/dteapi.service';
import { Observable } from 'rxjs';
import {Data} from '../../shared/data';
import { RouterExtService } from '../../shared/identifyUrl';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../shared/api.service';
//import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
  selector: 'ngx-dtesearch',
  templateUrl: './dtesearch.component.html',
  styleUrls: ['./dtesearch.component.scss']
})
export class DTESearchComponent implements OnInit {

    myControl = new FormControl();
    colleges: any = [];
    p: number = 1;
    collection: any[] = this.colleges;  
    courses : any = [];
    courseCount: number = 0; 
    collegeCount: number = 0;
    courseFlag : any =false;
    collegeFlag : any =false;
    Dropdown = 0;
    searchForm: FormGroup;
    searchCourses: any = [];
    searchSpecialization : any = [];
    loading = true;
    loadingbutton = true;
    filteredOptions: Observable<string[]>;
    Result_title :string = "";
    val;
    d;
    spec;
    public filterText: string;
    public filterPlaceholder: string;
    public filterInput = new FormControl();
    urrl;
    college_url;
    alertFlag= 0;
  search_course: string;
  courseData: any;
    constructor(
      private router : Router,
      protected dteApi : DteApiService, 
      private fb: FormBuilder,
      private route : ActivatedRoute,
      private data : Data,
      private routerExtService : RouterExtService,
      public themeService : NbThemeService,
      private authService: NbAuthService,
      protected api : ApiService, 
      ///private comp: HeaderComponent
      ) {
          this.authService.onTokenChange()
          .subscribe((token: NbAuthJWTToken) => {
            if(token.getPayload()['role'] !="dte"){
                this.router.navigate(['auth/logout'])
            }
          });
     
    }
  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Filter by Course Name";
    this.loading = true;
    this.loadingbutton = true;
    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }

      this.dteApi.getCoursedata().subscribe(data=>{
        if(data['status'] == 200){
          this.loading = false;
          this.courseData = data['data'];
          this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
            this.filterText = term;
          });
        }
      })
    });

   let previous = this.routerExtService.getPreviousUrl();
    this.urrl = previous.substring(0,13)
    this.college_url = previous.substring(0,14)
  }

  redirectCourse(id,specialization){
    this.router.navigate(['pages/DteCourse'],{queryParams : {course_id : id,specialization : specialization}});
  }

 
  }
