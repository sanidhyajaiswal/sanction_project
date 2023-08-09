import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
        }
      );
  }

  onSignup(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.username, form.value.password);
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
