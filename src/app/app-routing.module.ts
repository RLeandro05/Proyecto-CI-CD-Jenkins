import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFacturasComponent } from './components/list-facturas/list-facturas.component';
import { FormFacturasComponent } from './components/form-facturas/form-facturas.component';

const routes: Routes = [

  {
    path: "",
    component: ListFacturasComponent
  },
  {
    path: "formFactura/:idDetalle/:idFactura",
    component: FormFacturasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
