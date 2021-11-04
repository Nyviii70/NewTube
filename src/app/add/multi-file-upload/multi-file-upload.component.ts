import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform } from '@ionic/angular';
// pour utiliser les packages de camera / photos
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';


// là où les images seront stockées
const IMAGE_DIR = 'storage';
 
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
      directory: Directory.Data,
      path: IMAGE_DIR,
    }).then(result => {
      console.log('HERE: ', result);
      this.loadFileData(result.files);
    },
      async err => {
        await Filesystem.mkdir({
          directory: Directory.Data,
          path: IMAGE_DIR,
        });
      }).then(_ => {
      loading.dismiss();
    });
  }
 

  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }
 

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
    });
    console.log(image);
    if (image) {
        this.saveImage(image);
    }
  }
 

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data)
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        directory: Directory.Data,
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data
        
    });
    console.log('saved: ', savedFile)
     this.loadFiles();
  }


  async readAsBase64(photo: Photo) {
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
    formData.append('storage', blob, file.name);
    this.uploadData(formData);
  }
 

  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
        message: "Téléchargement de  l'image...",
    });
    await loading.present();
    const url = 'http://localhost:5000/storage';
    this.http.post(url, formData).pipe(
      finalize(() => {
        loading.dismiss();
       })
    )
      .subscribe(res => {
        console.log(res);
        });
  }


  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
  }
}