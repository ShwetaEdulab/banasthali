import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import { RegisterComponent } from './auth/register/register.component'
import { AuthGuard } from './shared/auth-guard.service';
import { OTPComponent } from './auth/otp/otp.component';
import { changePasswordComponent } from "./auth/changePassword/changePassword.component";
import { ForgotPasswordComponent } from './auth/Forgot-password/forgot-password.component'
import { resetPasswordComponent } from './auth/Reset-password/reset-password.component';
import { AdminOtpComponent } from './admin/admin-otp/admin-otp.component';
import { DTERegisterComponent } from './DTE/auth/register/register.component';
import { OptionComponent } from './auth/option/option.component';
const routes: Routes = [
  { path: 'pages',canActivate: [AuthGuard], loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: resetPasswordComponent,
      },
      {
        path: 'otp',
        component: OTPComponent,
      },
      {
        path: 'changePassword',
        component: changePasswordComponent,
      },
      {
        path: 'adminOtp',
        component: AdminOtpComponent,
    
      }, 
      {
        path: 'DTERegister',
        component: DTERegisterComponent,
    
      }, 
      {
        path: 'option',
        component: OptionComponent,
    
      }, 
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
  
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
