import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details/details.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [ListComponent,DetailsComponent,CardsComponent],
  imports: [
    CommonModule
  ]
})
export class ListModule { }
