import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddPage } from './add.page';

import { AddPageRoutingModule } from './add-routing.module';
import { MultiFileUploadComponent } from '../multi-file-upload/multi-file-upload.component';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    FileUploadModule,
    MultiFileUploadComponent
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
