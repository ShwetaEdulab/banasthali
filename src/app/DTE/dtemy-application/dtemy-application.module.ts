import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { DTEMyApplicationComponent } from './dtemy-application.component';
import { NbAccordionModule,NbAlertModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { FormsModule } from '@angular/forms';
import { DteAcceptApplicationdialog } from './dialog/AcceptApplicationdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [DTEMyApplicationComponent,DteAcceptApplicationdialog],
  imports: [
    CommonModule,
    ThemeModule,
    NbAlertModule,
    NbStepperModule,
    FormsModule,
    ConfirmDialogModule,
    NbSpinnerModule,
    NbDialogModule.forRoot(),
  ],
  entryComponents:[DteAcceptApplicationdialog],
  providers: []
})
export class DTEMyApplicationModule { }
