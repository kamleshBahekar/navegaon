import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { LoginComponent } from './Page/login/login.component';
import { RegistrationComponent } from './Page/registration/registration.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
