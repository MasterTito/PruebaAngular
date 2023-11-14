import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { llamadaSimuladaService } from './llamada-simulada.service'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListadoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [llamadaSimuladaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
