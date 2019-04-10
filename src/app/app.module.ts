import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterial} from './custom-material/custom-material.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GeoobjectsComponent } from './geoobjects/geoobjects.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    GeoobjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomMaterial,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [SidebarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
