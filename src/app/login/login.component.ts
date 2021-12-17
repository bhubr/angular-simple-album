import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  authForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser) {
      this.router.navigate([''])
    }
  }

  submitForm() {
    const credentials = this.authForm.value;
    this.loading = true;
    this.authService.login(credentials)
      .catch(err => {
        this.errorMessage = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }

}
