import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [ListComponent , CardsComponent],
  imports: [
    CommonModule
  ],
  exports: [ListComponent , CardsComponent],

})
export class ListModule { }
