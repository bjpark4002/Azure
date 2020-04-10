import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { QuoteService } from '../../service/quote.service';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddtaskComponent } from '../addtask/addtask.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}

export interface QuoteElement {
  QuoteType: string;
  QuoteID: number;
  Contact: string;
  Task: string;
  DueDate: Date;
  TaskType: string;
}
// const ELEMENT_DATA : PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
// ];
const ELEMENT_DATA: QuoteElement[] = [


];


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit {

  constructor(private _quoteService: QuoteService, private _router: Router, private dialog: MatDialog) { }
  // displayedColumns: string[] = ['position', 'name', 'symbol', 'weight'];
  displayedColumns: string[] = ['QuoteType', 'QuoteID', 'Contact', 'Task', 'DueDate', 'TaskType', '-'];

  // dataSource : any;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  data: any;
  QuoteTasks: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  products = [];
  ngOnInit() {
    // this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    // console.log("sort  here");
    // console.log(this._quoteService.getQuotes());
    // console.log(this._quoteService.showTasks);
    // console.log(this._quoteService.showTasks());

    this._quoteService.fetchData().subscribe((data: any[]) => {
      console.log(data);
      console.log(data[0].QuoteID);
      this.dataSource = new MatTableDataSource(data);
      this.data = data;
      this.products = data;
      this.QuoteTasks = data;


    })

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  logData(row) {
    console.log(row);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  logOut() {
    // console.log("log out initiated");
    localStorage.removeItem('userToken');
    this._router.navigate(['/login']);
  }

  addTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(AddtaskComponent,dialogConfig);
  }

}
