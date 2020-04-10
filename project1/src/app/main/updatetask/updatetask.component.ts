import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from '../../model/quote.model';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  selectedStatus: string;
  task: Quote = new Quote();
  quote_var: any;
  duedateVar = new Date();
  time = { hour: 13, minute: 30 };
  defaultDate = new Date();
  meridian = true; //you can comment. no use.

  IdToUpdate : string;
  constructor(private _modalRef : MatDialogRef<UpdatetaskComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private _QuoteService: QuoteService  )  {
    this.IdToUpdate = data.quoteID;
   }

  ngOnInit(): void {

    //initialize the task values with IdToUpdate.


    this._QuoteService.checkDataWithId(this.IdToUpdate).subscribe((data: any) => {
      console.log("Found data with ID : " + data.QuoteID);
      this.task.QuoteID = data.QuoteID;
      this.task.QuoteType = data.QuoteType;
      this.task.Contact = data.Contact;
      this.task.DueDate = data.DueDate;
      this.task.TaskType = data.TaskType;
      this.task.Task = data.Task;
      this.defaultDate = data.DueDate;
      console.log("defaultdate : "+this.defaultDate);
      // console.log("getHOurs : "+this.defaultDate.getHours());

      // this.time.hour = this.defaultDate.getHours();
      // this.time.minute = this.defaultDate.getMinutes();
    }, error => {
      console.log("nothign to update Error.");
    });


  }


  update(){
    //update duedate
    this.duedateVar.setHours(this.time.hour);
    this.duedateVar.setMinutes(this.time.minute);
    this.task.DueDate = ""+this.duedateVar.getFullYear()+"-"
    +(this.duedateVar.getMonth()+1)+"-"+this.duedateVar.getDate()+" "+this.duedateVar.getHours()+":"+this.duedateVar.getMinutes();


    this._QuoteService.updateQuote(this.task).subscribe((data:any) => {
      console.log(data);
      this._modalRef.close();
  });
  }
}
