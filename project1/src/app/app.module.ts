import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { MainpageComponent } from './main/mainpage/mainpage.component';
import { PagenotfoundComponent } from './errorhandle/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { QuoteService } from './service/quote.service';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from './auth/auth.guard';
import { AddtaskComponent } from './main/addtask/addtask.component';

import { NgbootstrapModule } from './ngbootstrap/ngbootstrap.module';
import { UpdatetaskComponent } from './main/updatetask/updatetask.component';
import { DetailtaskComponent } from './main/detailtask/detailtask.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
    PagenotfoundComponent,
    AddtaskComponent,
    UpdatetaskComponent,
    UpdatetaskComponent,
    DetailtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbootstrapModule
    
  ],
  providers: [QuoteService,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents : [AddtaskComponent]
})
export class AppModule { }


