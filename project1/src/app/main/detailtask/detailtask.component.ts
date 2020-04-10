import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from '../../model/quote.model';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-detailtask',
  templateUrl: './detailtask.component.html',
  styleUrls: ['./detailtask.component.css']
})
export class DetailtaskComponent implements OnInit {

  task: Quote = new Quote();
  defaultDate = new Date();

  IdToUpdate : string;

  constructor(private _modalRef : MatDialogRef<DetailtaskComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private _QuoteService: QuoteService  )  {
    this.IdToUpdate = data.quoteID;
   }

  ngOnInit(): void {
    
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

}
