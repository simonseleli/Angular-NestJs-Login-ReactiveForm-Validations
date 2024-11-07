import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {
    // 1  THIS IS TO CREAT THE FORMGROUP INSTANCE, WITHOUT THIS, IT WON'T WORK!
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // 2 TO ACCESS THE INPUT FROM THE FORM 
  get email() {
    return this.loginForm.get('email'); // get from formControlName("email")
  }

  get password() {
    return this.loginForm.get('password');  // get from formControlName("password")
  }
 
  login() {
    if (this.loginForm.valid) {
      const loginObj = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.service.login(loginObj).subscribe({
        next: (response: any) => {
          console.log(response);
          // alert("Login successfully!");
          localStorage.setItem("angular18Login", loginObj.email);
          localStorage.setItem("token", response.token);
          this.router.navigateByUrl('dashboard');
        },
        error: (error: any) => {
          console.log(error);
          if (error.status === 401) {
            const HttpErrorResponse = error.error.message;
            alert(HttpErrorResponse);
          }
        }
      });
    } else {
      alert("Please fill in the required fields.");
    }
  }
}

