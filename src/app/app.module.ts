import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { HeaderComponent } from './common/header/header.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProjectService } from './profile/profile.service';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { MainPieComponent } from './charts/main-pie/main-pie.component';
import { PiedataService } from './services/piedata.service';
import { LoginComponent } from './auth/login/login.component';
import { MainBarComponent } from './charts/main-bar/main-bar.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TransactionComponent } from './transaction/transaction.component';
import { SopComponent } from './sop/sop.component';
import { TransactionService } from './transaction/transaction.service';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    HeaderComponent,
    EditProfileComponent,
    ProfileViewComponent,
    MainPieComponent,
    LoginComponent,
    MainBarComponent,
    SignupComponent,
    TransactionComponent,
    SopComponent,
    ErrorComponent,
    AddTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    ],
  providers: [HttpClient, ProjectService, 
    PiedataService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }, 
    TransactionService,{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true }, { provide: ToastrService}],
  bootstrap: [AppComponent],
})
export class AppModule { }
