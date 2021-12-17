import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required],
    })
  }

  ngOnInit(): void {
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
