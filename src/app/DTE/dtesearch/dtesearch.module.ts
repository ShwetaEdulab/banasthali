import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { NbListModule, NbSpinnerModule } from '@nebular/theme'
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NbAlertModule } from '@nebular/theme';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../../../app/pages/shared-authpipe.module';
import { DTESearchComponent } from './dtesearch.component';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NgxPaginationModule,
    FormsModule,
    NbAlertModule,
    MatSelectModule,
    NbSpinnerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    NbListModule
  ],
  declarations: [
    DTESearchComponent
  ],
  providers: [  ]
})
export class DTESearchModule { }


