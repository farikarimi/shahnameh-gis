import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomMaterial } from './custom-material/custom-material.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GeoobjectsComponent } from './geoobjects/geoobjects.component';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    GeoobjectsComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbPopoverModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterial,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
  ],
  entryComponents: [SidebarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
