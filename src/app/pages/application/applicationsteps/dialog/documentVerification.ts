import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../../../@core/data/users.service';
import { ApiService } from '../../../../shared/api.service';


@Component({
selector: 'nb-dialog',
template: `
<nb-card status="success">
  <nb-card-body>
    <h4>(The next date will be declare by tomorrow)</h4>
    <h3 style="color:red; text-align:center;">Congratulations, You have come a long way!</h3><br/><br/><br/>
    <h4 style="text-align:center;">For futherance of Process, <br/> kindly visit <b><u>University of Mumbai</u></b> office for physical verification of documents</h4>
    <br/>
    <h4  style="color:red;">* Documents to be verified : </h4>
    <div *ngIf = "degree_flag">
      <div *ngIf="student_category == 'NRI of Gulf' || student_category == 'NRI of SEAsia'">
        <h5 style="text-align:center"><b><u>Student's Document</u></b></h5>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. First Year Marksheet</div>
          <div class="col-md-4">8. Second Year Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">9. Third Year Marksheet</div>
          <div class="col-md-6"></div>
        </div>
        <h5 style="text-align:center"><b><u>Parent's Document</u></b></h5>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">10. Sponsor Parent's Passport</div>
          <div class="col-md-4">11. Sponsor Parent's Resident Permit</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">12. Sponsor Parent's NRI certificate</div>
          <div class="col-md-4">13. Sponsor Parent's Work Permit</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">14. Sponsor Parent's Employment</div>
          <div class="col-md-4">15. Sponsor Parent's Resident Proof</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">16. Sponsor Parent's Six Month Bank Statement</div>
          <div class="col-md-4">17. Sponsor Parent's Sponsorship Letter</div>
          <div class="col-md-2"></div>
        </div>
        
      </div>
      <div *ngIf="student_category == 'PIO'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. First Year Marksheet</div>
          <div class="col-md-4">8. Second Year Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">9. Third Year Marksheet</div>
          <div class="col-md-4">10. PIO Card</div>
          <div class="col-md-2"></div>
        </div>
      </div>
      <div *ngIf="student_category == 'OCI'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. First Year Marksheet</div>
          <div class="col-md-4">8. Second Year Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">9. Third Year Marksheet</div>
        <div class="col-md-4">10. OCI Card</div>
        <div class="col-md-2"></div>
      </div>
      </div>
      <div *ngIf="student_category == 'Foreign National'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. SSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. HSC Marksheet</div>
          <div class="col-md-4">6. First Year Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. Second Year Marksheet</div>
          <div class="col-md-4">8. Third Year Marksheet</div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>
    <div *ngIf = "!degree_flag">
      <div *ngIf="student_category == 'NRI of Gulf' || student_category == 'NRI of SEAsia'">
        <h5 style="text-align:center"><b><u>Student's Document</u></b></h5>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <h5 style="text-align:center"><b><u>Parent's Document</u></b></h5>
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">9. Sponsor Parent's Passport</div>
          <div class="col-md-5">10. Sponsor Parent's Resident Permit</div>
          <div class="col-md-1"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">11. Sponsor Parent's NRI certificate</div>
          <div class="col-md-4">12. Sponsor Parent's Work Permit</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">13. Sponsor Parent's Employment</div>
          <div class="col-md-4">14. Sponsor Parent's Resident Proof</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-5">15. Sponsor Parent's Six Month Bank Statement</div>
          <div class="col-md-4">16. Sponsor Parent's Sponsorship Letter</div>
          <div class="col-md-2"></div>
        </div>
      </div>
      <div *ngIf="student_category == 'PIO'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. PIO Card</div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div *ngIf="student_category == 'OCI'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. Birth Certificate</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. SSC Marksheet</div>
          <div class="col-md-4">6. HSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">7. OCI Card</div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div *ngIf="student_category == 'Foreign National'">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">1. Passport Size Photograph</div>
          <div class="col-md-4">2. Student Signature</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4" *ngIf="country != 154 && country != 25">3. Student Passport</div>
          <div class="col-md-4" *ngIf="country == 154 || country == 25">3. Student Country ID Card</div>
          <div class="col-md-4">4. SSC Marksheet</div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4">5. HSC Marksheet</div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <h4  style="color:red;">* Venue :  </h4>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">2nd Floor,</div>
        <div class="col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">Vidyapeeth Vidyarthi Bhavan </div>
        <div class="col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">B Road,Church Gate,</div>
        <div class="col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8"> Mumbai,400020.</div>
        <div class="col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8"><a href="https://www.google.com/maps?q=Vidyapeeth+Vidyarthi+Bhavan+B+Road,Church+Gate,+Mumbai,400020.&um=1&ie=UTF-8&sa=X&ved=0ahUKEwiLufyn4-_iAhXKfSsKHTXfDB0Q_AUIECgB" target="_blank">Click Here To Check in Map</a></div>
        <div class="col-md-2"></div>
      </div>
    <br/>
    <br/>
  <h4  style="color:red;">* Time: </h4>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">10:00 AM To 05:00 PM</div>
    <div class="col-md-2"></div>
  </div>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8"></div>
    <div class="col-md-2"></div>
  </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <button nbButton status="success" (click)="dismiss();">OKAY</button>
      </div>
      <div class="col-md-4"></div>
    </div>
  </nb-card-footer>
</nb-card>
`,
})
export class DocumentVerificationdialog {

  student_category;
  country;
  degree_flag = false;
  constructor(protected ref: NbDialogRef<DocumentVerificationdialog>,
    private userService: UserService,
    protected api : ApiService) {
  }

  ngOnInit(){
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.student_category = user['category'];
        this.country = user['country_birth'];
      });
    
    this.api.getProfileValue('All_Education_Details').subscribe(data =>{
      if(data['data']['degree'] != null)
        this.degree_flag = true;
      else
        this.degree_flag = false;
    });
  }

  dismiss() {
  this.ref.close();
  }
 
  
}
