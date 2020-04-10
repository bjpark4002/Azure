import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [
  NgbTimepickerModule
]

@NgModule({
  imports: [ bootstrap ],
  exports: [ bootstrap ]
})
export class NgbootstrapModule { }
