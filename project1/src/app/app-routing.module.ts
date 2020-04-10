import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { PagenotfoundComponent } from './errorhandle/pagenotfound/pagenotfound.component';
import { MainpageComponent } from './main/mainpage/mainpage.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'login', component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'main',component:MainpageComponent, canActivate: [AuthGuard]},
{path:'**',component:PagenotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
