import { Component, OnInit, Input } from '@angular/core';
import { FileDownloadService } from '../service/file-download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownloadService]
})

export class FileDownloadComponent implements OnInit {
  @Input() filename: string;
  // files: any = [
  //   { filename: '2020-04-23T19:11:19.558Z_photo-vertical-1d0586b9c0b8.jpeg' },
  //   { filename: '2020-04-23T18:50:16.267Z_Screenshot from 2019-10-27 21-51-36.png' }
  // ]

  constructor(private _downloadService: FileDownloadService) { }

  ngOnInit(): void {
  }
  downloadFile() {
    // let filename = this.files[fileIndex].filename;
    this._downloadService.fileDownload(this.filename)
      .subscribe(
        (file) => {
          saveAs(file, this.filename)
        },
        (error) => {
          console.error(error)
        })
  }
}
