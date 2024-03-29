import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DteCourseComponent } from './dtecourse.component';
import { NbListModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbButtonModule , NbAccordionModule,NbSpinnerModule } from '@nebular/theme';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  imports: [

    ThemeModule,
    CommonModule,
    FormsModule,
    NbListModule,
    NbAlertModule,
    NbButtonModule,
    NbAccordionModule,
    NbSpinnerModule,
    ConfirmDialogModule
  ],
  declarations: [
    DteCourseComponent,
  ],
  providers: []
})
export class DTECourseModule {
}