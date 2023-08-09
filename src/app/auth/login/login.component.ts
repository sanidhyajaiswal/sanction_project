import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ErrorInterceptor } from 'src/app/error-interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
        }
      );
  }

  
  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.username, form.value.password);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
}

}
