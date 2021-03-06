import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgQrScannerModule } from 'angular2-qrscanner';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule, NgQrScannerModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
