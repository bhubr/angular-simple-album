import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
}

  ngOnInit(): void {
  }

  onSubmit() {
    // en JavaScript pré-ES6
    // const username = this.loginForm.value.username;
    // const password = this.loginForm.value.password;

    const { username, password } = this.loginForm.value;
    this.authenticationService.login(username, password)
      .subscribe(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      });
  }

}
