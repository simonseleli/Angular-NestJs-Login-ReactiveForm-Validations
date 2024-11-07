import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

  export interface StudentResponse{
  
    id:number,
    name: string,
    email: string,
    password:string,
    role:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient:HttpClient
  ) {
   }
  login(loginObj:object){
    return this.httpClient.post(`http://localhost:3000/auth/login`, loginObj);
  }

  getAllUsers(){
    return this.httpClient.get(`http://localhost:3000/auth/findAll`);
  }

  register(registerObj:object){
    return this.httpClient.post(`http://localhost:3000/auth/create`, registerObj);
  }
  deleteStudent(studentId:number){
    return this.httpClient.delete(`http://localhost:3000/auth/delete/${studentId}`);
  }
  viewSingleStudent(studentId:number){
    return this.httpClient.get(`http://localhost:3000/auth/findOne/${studentId}`)
  }
  updateStudent(studentId:number, updateObj:object){
    return this.httpClient.put(`http://localhost:3000/auth/update/${studentId}`, updateObj)
  }
  addStudent(addStudentObj:object){
    return this.httpClient.post(`http://localhost:3000/auth/create`, addStudentObj);
  }
}
