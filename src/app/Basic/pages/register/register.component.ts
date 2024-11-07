import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private service:LoginService,
    private router:Router,
    private fb:FormBuilder
  ){
    this.registerForm=this.fb.group({
      password:['',[Validators.required]],
      name:['',[Validators.required]],
      email:['', [Validators.email, Validators.required]]
    });
  }

  registerForm!:FormGroup;

  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  };
  get password(){
    return this.registerForm.get('password');
  }

  register(){
    if(this.registerForm.valid){
      const registerObj = {
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
      };
  
      this.service.register(registerObj).subscribe({
        next:(response:any)=>{
          console.log(response);
          this.router.navigateByUrl("login");
        }
      })
    }else{
      alert("please fill the required fields!");
    }
   
  }

}
