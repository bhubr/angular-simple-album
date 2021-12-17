import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  authForm: FormGroup;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser) {
      this.router.navigate(['']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  submitForm() {
    const credentials = this.authForm.value;
    this.loading = true;
    this.authService
      .login(credentials)
      .then(() => {
        this.router.navigate([this.returnUrl]);
      })
      .catch((err) => {
        this.errorMessage = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
