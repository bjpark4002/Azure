import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Quote } from '../../model/quote.model';
import { QuoteService } from 'src/app/service/quote.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  selectedStatus: string;
  task: Quote = new Quote();
  addTaskForm: FormGroup;
  quote_var: any;
  duedateVar : Date;
  time = { hour: 13, minute: 30 };
  meridian = true; //you can comment. no use.


  constructor(private formBuilder: FormBuilder, private _QuoteService: QuoteService, private _router: Router, private _modalRef : MatDialogRef<AddtaskComponent>) { }

  ngOnInit(): void {
    // this.addTaskForm = this.formBuilder.group({
    //   'Quote_Type' : [this.task.QuoteType, [
    //     Validators.required
    //   ]],
    //   'Quote_Id' : [this.task.QuoteID,[ 
    //     Validators.required,
    //     Validators.min(0)
    //   ]],
    //   'Task_Type' : [this.task.TaskType, [
    //     Validators.required
    //   ]],
    //   'Contact_Name' : [this.task.Contact, [
    //     Validators.required
    //   ]],
    //   'Quote_' : [this.quote_var, [
    //     Validators.required
    //   ]]
    //   ,
    //   'Due_Date' : [this.task.DueDate, [
    //     Validators.required
    //   ]],
    //   'Task' : [this.task.Task, [
    //     Validators.required
    //   ]]
    // });
  }
  addTask() {
    if(this.task.QuoteID==null || this.task.QuoteType == null || this.task.TaskType == null || this.duedateVar == null){
      alert("Quote Num, Quote Type, Task Type and Due Date can't be empty ");
    }
    else{
      console.log("Input Received. : "+this.task);
      this._QuoteService.checkDataWithId(this.task.QuoteID).subscribe((data: any) => {
        console.log("Found data with ID : " + data.QuoteID);
        alert("[Quote Num], you entered, is already existing");
      }, error => {
        //post new task

        //update DueDate with time.
        this.duedateVar.setHours(this.time.hour);
        this.duedateVar.setMinutes(this.time.minute);

        this.task.DueDate = ""+this.duedateVar.getFullYear()+"-"
        +(this.duedateVar.getMonth()+1)+"-"+this.duedateVar.getDate()+" "+this.duedateVar.getHours()+":"+this.duedateVar.getMinutes();

        this._QuoteService.addQuote(this.task).subscribe((data:any) => {
            console.log(data);
            this._modalRef.close();
            this._router.navigate(['main']);
        });
        // console.log("ok! i just added task");
        // alert("Task is added!");
  
      });
    }

  }
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  // refreshResult(){
  //   this._router.onSameUrlNavigation = 'reload';
  // }
}
