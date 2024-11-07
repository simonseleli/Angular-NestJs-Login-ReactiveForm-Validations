import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {

  constructor(
    private fb:FormBuilder,
    private service:LoginService,
    private router:Router
  )
  {
    this.addStudentForm = this.fb.group({
      name:['',[Validators.required]],
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.required]]
    })
  }

  addStudentForm!:FormGroup;

  get name(){
    return this.addStudentForm.get('name');
  }
  get email(){
    return this.addStudentForm.get('email');
  }
  get password(){
    return this.addStudentForm.get('password');
  }

  addStudent(){
    if(this.addStudentForm.valid){
      const addStudentObject = {
        name:this.addStudentForm.value.name,
        email:this.addStudentForm.value.email,
        password:this.addStudentForm.value.password
      }
      this.service.addStudent(addStudentObject).subscribe({
        next:(response:any)=>{
          console.log(response);
          alert(response.message);
          this.router.navigateByUrl('dashboard');
        },
        error:(error:any)=>{
          console.log(error);
        }
      })
    }else{
      alert("Please fill in the required fields.");
    }
  }

}
