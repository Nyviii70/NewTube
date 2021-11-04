import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MultiFileUploadComponent } from "./multi-file-upload.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [MultiFileUploadComponent],
    exports: [MultiFileUploadComponent]
})

export class MultiFileUploadModule { }