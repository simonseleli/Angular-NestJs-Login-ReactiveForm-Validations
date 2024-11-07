import { Routes } from '@angular/router';
import { LoginComponent } from './Basic/pages/login/login.component';
import { LayoutComponent } from './Basic/pages/layout/layout.component';
import { DashboardComponent } from './Basic/pages/dashboard/dashboard.component';
import { authGuard } from './Basic/pages/Guards/auth.guard';
import { authGuessGuard } from './Basic/pages/Guards/Guest/auth-guess.guard';
import { BinFolderComponent } from './bin-folder/bin-folder.component';
import { RegisterComponent } from './Basic/pages/register/register.component';
import { AddStudentComponent } from './Basic/pages/add-student/add-student.component';
import { ViewStudentComponent } from './Basic/pages/view-student/view-student.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, 
    canActivate: [authGuessGuard] 
  },
  {
    path:'register',component:RegisterComponent,
    canActivate:[ authGuessGuard]
  },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [authGuard]
      },
      {
        path:'bin', component:BinFolderComponent, title:'Meet our bin',
        canActivate: [authGuard]
      },
      {
        path:'addStudent', component:AddStudentComponent
      },
      {
        path:"viewStudent/:id", component:ViewStudentComponent
      }
    ]
  }
];
                //    EXPLANATION OF CODES ABOVE

// export const routes: Routes = [
//   // THIS IS TO SAY THAT, BEFORE SUCCESSFULLY LOGIN, THE USER IS REDIRECTED TO THIS PAGE "login" PAGE, 
//   {
//     //EVEN BY DEFAULT OF THE BLANK URL I HAVE DEFINED IT TO BE login PAGE
//     path: '', redirectTo: 'login', pathMatch: 'full'
//   },
//   {
//     path: 'login', component: LoginComponent, canActivate: [authGuessGuard] 
//     // THE authGuessGuard MAKE PREVENT/SURE THAT, THE LOGGED IN USER WONT BE ABLE TO ACCESS THE LOGIN PAGE AGAIN, 
//     // EVEN BY DIRECTLY TYPING THE URL
//   },

//   // THIS IS TO SAY THAT, UPON SUCCESSFULLY LOGIN, THE USER IS REDIRECTED TO THIS PAGE "dashboard" PAGE
//   {
//     path: '', component: LayoutComponent, children: [
//   // AND FROM HERE NOW, HE CAN NAVIGATE THROUGH THE CHILDREN ROUTES
//       {
//         path: 'dashboard', component: DashboardComponent,
//         canActivate: [authGuard]
//          // THE authGuard MAKE PREVENT/SURE THAT, ONLY THE LOGGED IN USER ABLE TO ACCESS THE DASHBOARD PAGE, 
//          // EVEN BY DIRECTLY TYPING THE URL, IF NOT LOGGED IN, CANT ACCESS IT
//       },
//       {
//         path:'bin', component:BinFolderComponent, title:'Meet our bin',
//         canActivate: [authGuard]
//       }
//     ]
//   }
// ];