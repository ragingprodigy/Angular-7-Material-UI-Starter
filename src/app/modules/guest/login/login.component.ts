import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/global/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showLoader = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isAuthenticated) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showLoader = true;
      // Do Login Here
      this.authService.login(this.loginForm.value).subscribe(
        (isValid) => {
          this.showLoader = false;
          if (isValid) {
            this.router.navigate(['dashboard']);
          }
        }, err => {
          this.showLoader = false;
          this.snackBar.open(typeof err === 'string' ? err : err.message || 'Unable to Login!', 'OK', { duration: 10000 });
        });
    }
  }

}
