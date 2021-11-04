import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
// pour utiliser les packages de camera / photos
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';
 
const IMAGE_DIR = 'stored-images';
 
interface LocalFile {
  name: string;
  path: string;
  data: string;
}
 
@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss'],
})

export class MultiFileUploadComponent implements OnInit {
  images: LocalFile[] = [];
 
  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }
 

  async ngOnInit() {
    this.loadFiles();
  }
 
  async loadFiles() {
    this.images = [];
 
    const loading = await this.loadingCtrl.create({
      message: 'Chargement des data...',
    });
    await loading.present();
 
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files);
    },
      async (err) => {
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }
 

  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }
 
 
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
 

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
    });
 
    if (image) {
        this.saveImage(image)
    }
  }
 

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });
     this.loadFiles();
  }


  private async readAsBase64(photo: Photo) {
  if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });
      return file.data;
  }
  else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
  }
}


  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
  });


  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
  }
 

  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
        message: "Téléchargement de  l'image...",
    });
    await loading.present();
    const url = 'http://localhost:5000/upload';
    this.http.post(url, formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe(res => {
          if (res['success']) {
            this.presentToast('Téléchargement terminé.')
          } else {
            this.presentToast('Téléchargement échoué.')
          }
        });
  }


  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
    this.presentToast('Fichier supprimé.');
  }
}