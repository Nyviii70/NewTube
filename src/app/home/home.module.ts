import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ListModule } from '../list/list.module';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
// accès au list.component.ts et son service
    ListModule
  ],
 
})
export class HomePageModule {}
