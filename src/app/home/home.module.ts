import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ListModule } from '../list/list.module';


@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
// accès au list.component.ts et son service
    ListModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
