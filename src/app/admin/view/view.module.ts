import {
    NgModule,Component 
  } from '@angular/core';
  import { AdminViewComponent } from './view.component';
  import {NbCardModule, NbStepperModule,NbActionsModule, NbAccordionModule, NbListModule} from '@nebular/theme'; 
  import { CommonModule } from '@angular/common';
  import { transcriptpreview } from './transcriptpreview.component';

  @NgModule({
    imports: [
      NbCardModule,
      NbStepperModule,
      NbActionsModule,
      CommonModule,
      NbAccordionModule,
      NbListModule,
      
    ],
    declarations: [
      AdminViewComponent,
      transcriptpreview
    ],
    entryComponents:[transcriptpreview],
    providers: [],
  })
  export class AdminViewModule {}
