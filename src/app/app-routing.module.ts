import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { SopComponent } from './sop/sop.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';

const routes: Routes = [{
  path: 'create-profile',
  component: CreateProfileComponent,
  canActivate: [AuthGuard]
},
{
  path:'profile-view',
  component: ProfileViewComponent,
  canActivate: [AuthGuard]
},
{
  path: 'edit-profile/:projectId',
  component: EditProfileComponent,
  canActivate: [AuthGuard]
},
{
  path: 'transaction/:projectId',
  component: TransactionComponent,
  canActivate : [AuthGuard]
},
{
  path: 'sop/:projectId',
  component: SopComponent,
  canActivate : [AuthGuard]
},
{path:'login',
component: LoginComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path:'edit-trans/:projectId',
  component: AddTransactionComponent
},
{
  path: '',
  component: LoginComponent,
  canActivate: [AuthGuard] 
},
{
path: '**',
component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
