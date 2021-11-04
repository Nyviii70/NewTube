import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AddPage } from './add.page';
import { AddPageRoutingModule } from './add-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MultiFileUploadModule } from './multi-file-upload/multi-file-upload.module';

@NgModule({
  declarations: [AddPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AddPageRoutingModule,
    HttpClientModule,
    MultiFileUploadModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
})
export class AddPageModule {}
