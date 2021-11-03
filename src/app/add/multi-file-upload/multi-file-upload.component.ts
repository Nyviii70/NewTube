import { Component, OnInit } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss']
})

export class MultiFileUploadComponent {
  // objet qui génère le suivi de tous les fichiers en cours de téléchargement
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5500',
    method: "POST",
  itemAlias: "uploadedfile"});
  // objet qui modifie le style lorsque la zone de dépôt est survolée
  // public hasBaseDropZoneOver: boolean = false;

  constructor() {
  }

  upload(){
    this.uploader.uploadAll()
  }
  // méthode pour récupérer un tableau de tous les fichiers uploadés
//   getFiles(): FileLikeObject[] {
//     return this.uploader.queue.map((fileItem) => {
//       return fileItem.file;
//     });
//   }

//   fileOverBase(ev): void {
//     this.hasBaseDropZoneOver = ev;
//   }

//   // régorganise la liste qui affiche les fichiers téléchargés
//   reorderFiles(reorderEvent: CustomEvent): void {
//     let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
//     this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
//   }
}