import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFacturasComponent } from './components/list-facturas/list-facturas.component';
import { FormFacturasComponent } from './components/form-facturas/form-facturas.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';

// Importaciones adicionales


@NgModule({
  declarations: [
    AppComponent,
    ListFacturasComponent,
    FormFacturasComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
