import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config } from 'process';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthentificationModule implements ModuleWithProviders <AuthentificationModule> {
  public static forRoot(): ModuleWithProviders<AuthentificationModule>{
    return{
      ngModule: AuthentificationModule,
      providers:[
        {provide: LDAPConfig, useValue: config}
      ]
    }
  }
 }
