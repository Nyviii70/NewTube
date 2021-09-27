import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ListModule } from '../list/list.module';
import { ListComponent } from '../list/list.component';


@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ListModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
