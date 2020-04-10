import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Quote } from '../../model/quote.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  selectedStatus : string;
  task : Quote = new Quote();
  addTaskForm : FormGroup;
  quote_var : any;
  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      'Quote_Type' : [this.task.QuoteType, [
        Validators.required
      ]],
      'Quote_Id' : [this.task.QuoteID,[ 
        Validators.required,
        Validators.min(0)
      ]],
      'Task_Type' : [this.task.TaskType, [
        Validators.required
      ]],
      'Contact_Name' : [this.task.Contact, [
        Validators.required
      ]],
      'Quote_' : [this.quote_var, [
        Validators.required
      ]],
      'Due_Date' : [this.task.DueDate, [
        Validators.required
      ]],
      'Task' : [this.task.Task, [
        Validators.required
      ]]


    });
  }
  addTask(){
    alert("you got it");
    console.log("ok! i just added task");
  }

}
