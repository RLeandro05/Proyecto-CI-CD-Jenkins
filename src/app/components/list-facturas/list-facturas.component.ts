import { Component } from '@angular/core';

import { Factura } from '../../models/factura';
import { PAjaxService } from '../../services/p-ajax.service';
import { DetalleFactura } from '../../models/detalle-factura';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-facturas',
  standalone: false,
  
  templateUrl: './list-facturas.component.html',
  styleUrl: './list-facturas.component.css'
})
export class ListFacturasComponent {

  public listaFac: Factura[] = [];
  public listaDetall: DetalleFactura[] = [];
  public facturaSel: number = -1;

  constructor(private peticion: PAjaxService, private ruta: Router) {

    this.peticion.facturas().subscribe(

      datos => {

        console.log('Listado facturas :>> ', datos);
        this.listaFac = datos;

      }

    );

  }

  listadoDetalle(idFactura: number): void {
    this.peticion.listadoDetalle(idFactura).subscribe(
      datos => {
        console.log('Listado Detalles :>> ', datos);
        this.listaDetall = datos;
        this.facturaSel = idFactura;
      }
    );
  }

  calIva(precio: number, cantidad: number, tipoIva: number) {

    return (precio * cantidad) * (tipoIva / 100);

  }

  calTotalIva(precio: number, cantidad: number, tipoIva: number) {

    return (precio * cantidad) + this.calIva(precio, cantidad, tipoIva);

  }

  calSumIva() {

    let sumIva: number = 0;

    for (const detalle of this.listaDetall) {
      
      sumIva += this.calIva(detalle.precio, detalle.cantidad, detalle.tipo_iva);

    }

    return sumIva;

  }

  calSumTotalIva() {

    let sumTotal: number = 0;

    for (const detalle of this.listaDetall) {

      sumTotal += this.calTotalIva(detalle.precio, detalle.cantidad, detalle.tipo_iva);
      
    }

    return sumTotal;

  }

  irFormFactura(idDetalle: number) {

    this.ruta.navigate(['formFactura', idDetalle, this.facturaSel]);

  }

  borrar(detalle: DetalleFactura) {

    

      this.peticion.borra(detalle).subscribe(

        dato => {
  
          console.log('res Borra :>> ', dato);
          this.listaDetall = dato;
  
        }
  
      );

    
    

  }

}
