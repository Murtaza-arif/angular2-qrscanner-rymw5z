import { Component, ViewChild, ViewEncapsulation, OnInit, Renderer2, ElementRef } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated 
})
export class AppComponent implements OnInit {
  name = 'Angular';
  log = [];
  @ViewChild(QrScannerComponent) QrScannerComponent: QrScannerComponent;
  @ViewChild("img") img: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const _Qr: any = this.QrScannerComponent;
    this.startScanning(_Qr);
    _Qr.capturedQr
      .subscribe((result) => {
        this.log.unshift(result);
        this.img.nativeElement.setAttribute('src', _Qr.qrCanvas.nativeElement.toDataURL(_Qr.stream));
        setTimeout(() => { this.img.nativeElement.src = ''; }, 1000);
      });
  }

  startScanning(_Qr: any) {
    _Qr.foundCameras
      .subscribe((devices) => {
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
            videoDevices.push(device);
          }
        }

        if (videoDevices.length > 0) {
          this.log.unshift(videoDevices);
          const constraints = {
            audio: false,
            video: {
              facingMode: 'environment',
              width: { ideal: 480 },
              height: { ideal: 360 }
            }
          }

          if (!_Qr.videoElement) {
            _Qr.videoElement = this.renderer.createElement('video');
            _Qr.videoElement.setAttribute('muted', 'true');
            _Qr.videoElement.setAttribute('autoplay', 'true');
            _Qr.videoElement.setAttribute('playsinline', 'true');
            // _Qr.videoWrapper.nativeElement.setAttribute('class', 'mirrored');
            this.renderer.appendChild(_Qr.videoWrapper.nativeElement, _Qr.videoElement);
          }

          navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
              _Qr.setStream(stream);
            });
        }
      });
  }
}
