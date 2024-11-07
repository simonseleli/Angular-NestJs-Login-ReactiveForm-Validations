import { Component } from '@angular/core';
import { LoginService, StudentResponse } from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private service:LoginService,
    private router:Router
  ){}

  logout() {
    // Remove the email and token from local storage
    localStorage.removeItem("angular18Login");
    localStorage.removeItem("token");
    
    // Navigate to the login page
    this.router.navigateByUrl("login");
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllStudents();
     // Reload the component every 10 seconds
    // setInterval(() => {
    //   this.reloadComponent();
    // }, 10000); // 10,000 milliseconds = 10 seconds
  }
  students!:StudentResponse[];

  getAllStudents(){
    this.service.getAllUsers().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.students=response;
      },
      error:(error:any)=>{
        console.log(error);
        if(error.status===401){
          const responseError = error.error.message+"! Your session expired, please log in again";
          alert(responseError);
          localStorage.removeItem("angular18Login");
          localStorage.removeItem("token");
          this.router.navigateByUrl("login");
        }
      }
    })
  }


  delete(studentId:number){
    if(confirm("Are you sure you want to delete ?")){
      this.service.deleteStudent(studentId).subscribe({
        next:(response:any)=>{
          console.log(response);
          alert(response.message);
          this.getAllStudents();
        },
        error:(error:any)=>{
          console.log(error);
        }
      })
    }
    // deleteStudent(event:any, studentId:number){
    //   if(confirm("are you sure you want do delete ?")){
    //     event.target.innerText="Deleting...";
    //     this.studetService.deleteStudent(studentId).subscribe({
    //       next:(response:any)=>{
    //         this.getStudentLists();
    //         alert("Student Delete Successfuly");
    //       }
    //     })
    //   }
    // }
  }

  // reloadComponent(): void {
  //       // Reload the component by navigating to the current route
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate([this.router.url]);
  //       });
  //     }

}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     // Reload the component every 10 seconds
//     setInterval(() => {
//       this.reloadComponent();
//     }, 10000); // 10,000 milliseconds = 10 seconds
//   }

//   reloadComponent(): void {
//     // Reload the component by navigating to the current route
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//       this.router.navigate([this.router.url]);
//     });
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { LoginService, StudentResponse } from '../../service/login.service';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [FormsModule, NgFor],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent implements OnInit {
//   students!: StudentResponse[];
//   sessionExpirationTime = 20 * 1000; // 20 seconds in milliseconds

//   constructor(
//     private service: LoginService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getAllStudents();

//     // Reload the component every 10 seconds
//     setInterval(() => {
//       this.checkSessionExpiry();
//     }, 10 * 1000); // 10 seconds
//   }

//   getAllStudents() {
//     this.service.getAllUsers().subscribe({
//       next: (response: any) => {
//         console.log(response);
//         this.students = response;
//       },
//       error: (error: any) => {
//         console.log(error);
//         if (error.status === 401) {
//           const responseError = error.error.message + "! Your session expired, please log in again";
//           alert(responseError);
//           this.logout();
//         }
//       }
//     });
//   }

//   checkSessionExpiry() {
//     const loginTime = localStorage.getItem('loginTime'); // Retrieve the stored login time
//     const currentTime = Date.now();

//     if (loginTime) {
//       const elapsedTime = currentTime - Number(loginTime);

//       // Check if the elapsed time exceeds the session expiration time
//       if (elapsedTime >= this.sessionExpirationTime) {
//         alert("Session expired! Please log in again.");
//         this.logout(); // Log out the user and redirect to login
//       } else {
//         console.log(`Session still valid. Elapsed time: ${elapsedTime / 1000} seconds.`);
//         this.reloadComponent(); // Reload the component to refresh data instead of reloading the entire page
//       }
//     } else {
//       this.logout();
//     }
//   }

//   reloadComponent(): void {
//     // Reload the component by navigating to the current route
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//       this.router.navigate([this.router.url]);
//     });
//   }

//   logout() {
//     // Remove the email and token from local storage
//     localStorage.removeItem("angular18Login");
//     localStorage.removeItem("token");
//     localStorage.removeItem("loginTime");

//     // Navigate to the login page
//     this.router.navigateByUrl("login");
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { LoginService, StudentResponse } from '../../service/login.service';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [FormsModule, NgFor],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent implements OnInit {
//   students!: StudentResponse[];
//   sessionExpirationTime = 20 * 1000; // 20 seconds in milliseconds

//   constructor(
//     private service: LoginService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getAllStudents();

//     // Reload the page every 10 seconds
//     setInterval(() => {
//       this.checkSessionExpiry();
//     }, 10 * 1000); // 10 seconds
//   }

//   getAllStudents() {
//     this.service.getAllUsers().subscribe({
//       next: (response: any) => {
//         console.log(response);
//         this.students = response;
//       },
//       error: (error: any) => {
//         console.log(error);
//         if (error.status === 401) {
//           const responseError = error.error.message + "! Your session expired, please log in again";
//           alert(responseError);
//           this.logout();
//         }
//       }
//     });
//   }

//   checkSessionExpiry() {
//     const loginTime = localStorage.getItem('loginTime'); // Retrieve the stored login time
//     const currentTime = Date.now();

//     if (loginTime) {
//       const elapsedTime = currentTime - Number(loginTime);

//       // Check if the elapsed time exceeds the session expiration time
//       if (elapsedTime >= this.sessionExpirationTime) {
//         alert("Session expired! Please log in again.");
//         this.logout(); // Log out the user and redirect to login
//       } else {
//         console.log(`Session still valid. Elapsed time: ${elapsedTime / 1000} seconds.`);
//         location.reload(); // Reload the page to refresh data
//       }
//     } else {
//       this.logout();
//     }
//   }

//   logout() {
//     // Remove the email and token from local storage
//     localStorage.removeItem("angular18Login");
//     localStorage.removeItem("token");
//     localStorage.removeItem("loginTime");
//     this.router.navigateByUrl("login");
//   }
// }