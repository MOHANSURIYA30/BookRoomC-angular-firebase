import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register-user',
    component:SignUpComponent
  },
  {
    path:'forgot-password',
    component:ForgetPasswordComponent
  },
  {
    path:'verify-email-address',
    component:VerifyEmailComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'Rooms', pathMatch: 'full' },
      { path: 'Rooms', component:RoomsComponent },
      { path: 'Booking', component:BookingsComponent },
      { path: 'Rooms/list', component:RoomsListComponent },
      { path: 'Rooms/list/room-detail', component:RoomDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
