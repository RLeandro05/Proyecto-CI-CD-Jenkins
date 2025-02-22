import { Component, EventEmitter, Output } from '@angular/core';

// Importacion de los modelos y servicios y ruta (router) si se usa
import { DetalleFactura } from '../../models/detalle-factura';
import { PAjaxService } from '../../services/p-ajax.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-facturas',
  standalone: false,
  
  templateUrl: './form-facturas.component.html',
  styleUrl: './form-facturas.component.css'
})
export class FormFacturasComponent {

  public detalle: DetalleFactura = <DetalleFactura>{};
  public textoBoton: string = "Añadir";
  public idDetalle: number;
  public idFactura: number;
  //@Output() envIdFacturaEvent = new EventEmitter<number>();

  constructor(private peticion: PAjaxService, private ruta: Router, private activatedRoute: ActivatedRoute) { 

    this.idDetalle = this.activatedRoute.snapshot.params["idDetalle"];
    this.idFactura = this.activatedRoute.snapshot.params["idFactura"];
    
  }

  ngOnInit(): void {
    console.log('idDetalle :>> ', this.idDetalle);
    console.log('idFactura :>> ', this.idFactura);
  
    // Inicializamos las propiedades básicas
    this.detalle = { id: this.idDetalle, id_factura: this.idFactura } as DetalleFactura;
  
    if (this.idDetalle === -1) {
      this.textoBoton = 'Añadir';
    } else {
      this.textoBoton = 'Modificar';
  
      // Llamamos al servicio para obtener el detalle existente
      this.peticion.selDetalleID(this.idDetalle).subscribe({
        next: (res) => {
          // Actualizamos el detalle solo si hay respuesta válida
          if (res) {
            this.detalle = res;
          }
        },
        error: (error) => {
          console.error('Error al cargar el detalle:', error);
          // En caso de error, mantenemos los valores iniciales
          this.detalle = { id: this.idDetalle, id_factura: this.idFactura } as DetalleFactura;
        }
      });
    }
  }

  onSubmit(form: DetalleFactura) {

    console.log('form :>> ', form);
    console.log('detalle Submit :>> ', this.detalle);
    console.log('detalle.id Submit :>> ', this.detalle.id);


    if (this.detalle.id == -1) {
      console.log('ENTRA');
      this.peticion.anade(this.detalle).subscribe(

        dato => {

          console.log('anade :>> ', dato);
          this.ruta.navigate(['/']);

        }

      );

    } else {

      this.peticion.modificarDetalle(this.detalle).subscribe(

        dato => {

          console.log('modificarDetalle :>> ', dato);
          this.ruta.navigate(['/']);

        }

      );

    }

  }

}
