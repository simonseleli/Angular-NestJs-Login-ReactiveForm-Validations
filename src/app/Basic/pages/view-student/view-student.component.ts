import { Component } from '@angular/core';
import { LoginService, StudentResponse } from '../../service/login.service';
import { response } from 'express';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.scss'
})
export class ViewStudentComponent {
  constructor(
    private service:LoginService,
    private route:ActivatedRoute
  ){

  }

  student!:StudentResponse;
  id!:any;

  ngOnInit(): void {
    this.viewStudent();
  }

  viewStudent(){
    this.id= this.route.snapshot.paramMap.get('id');
    alert(this.id);
    this.service.viewSingleStudent(this.id).subscribe({
      next:(response:any)=>{
        console.log(this.id);
        console.log(response,'response');
        this.student=response;
      },
      error:(err:any)=>{
        console.log("Error fetching student data ", err);
      }
    })
  }


}
