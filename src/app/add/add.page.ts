import { Component, ViewChild } from '@angular/core';
import { MultiFileUploadComponent } from '../multi-file-upload/multi-file-upload.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;

  constructor(){}

  // fonction de téléchargement
  upload() {
    let files = this.fileField.getFiles();
    console.log(files);

    let formData = new FormData();
    // append sert à affecter des paires clé/valeur
    formData.append('somekey', 'somevalue');

    files.forEach((file) => {
      // les fichiers + leur nom seront stockés dans le tableau files[]
      formData.append('files[]', file.rawFile, file.name);
    })
  }
}



// COMME C'ÉTAIT AVANT
// export class AddPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
