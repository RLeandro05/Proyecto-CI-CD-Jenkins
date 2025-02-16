import { Injectable } from '@angular/core';

// Importacion de HttpClient
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';
import { DetalleFactura } from '../models/detalle-factura';

@Injectable({
  providedIn: 'root'
})
export class PAjaxService {

  private url: string = "http://localhost:9090/DWC/Angular/Backends/fa/servidor.php";

  constructor(private httpClient: HttpClient) { }

  facturas() {

    let fac = { servicio: 'facturas' };
    console.log('servicio facturas :>> ', fac);

    return this.httpClient.post<Factura[]>(this.url, JSON.stringify(fac));

  }

  listadoDetalle(idFactura: number) {

    let detalle = { servicio: 'detalle', idFactura: idFactura };
    console.log('servicio detalle :>> ', detalle);

    return this.httpClient.post<DetalleFactura[]>(this.url, JSON.stringify(detalle));

  }

  anade(detalle: DetalleFactura) {

    let det = JSON.parse(JSON.stringify(detalle));
    det.servicio = "anade";
    det.idFactura = detalle.id_factura
    console.log('anade :>> ', det);

    return this.httpClient.post<DetalleFactura[]>(this.url, JSON.stringify(det));

  }

  modificarDetalle(detalle: DetalleFactura) {

    let det = JSON.parse(JSON.stringify(detalle));
    det.servicio = "modificarDetalle";
    det.idFactura = detalle.id_factura
    console.log('modificarDetalle :>> ', det);

    return this.httpClient.post<DetalleFactura[]>(this.url, JSON.stringify(det));

  }

  borra(detalle: DetalleFactura) {

    let det = {
      servicio: "borra",
      id: detalle.id,
      idFactura: detalle.id_factura
    }

    return this.httpClient.post<DetalleFactura[]>(this.url, JSON.stringify(det));

  }

  selDetalleID(idDetalle: number) {

    let detalle = {
      servicio: "selDetalleID",
      id: idDetalle
    }

    return this.httpClient.post<DetalleFactura>(this.url, JSON.stringify(detalle));

  }

}
