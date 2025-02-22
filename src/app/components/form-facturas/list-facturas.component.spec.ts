import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFacturasComponent } from './form-facturas.component';
import { PAjaxService } from '../../services/p-ajax.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DetalleFactura } from '../../models/detalle-factura';

describe('FormFacturasComponent - Añadir Detalle', () => {
  let component: FormFacturasComponent;
  let fixture: ComponentFixture<FormFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear un mock del servicio PAjaxService y Router
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['añadirDetalle']); // Asegúrate de incluir 'añadirDetalle'
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FormFacturasComponent],
      imports: [FormsModule], // Importar FormsModule para soportar formularios template-driven
      providers: [
        { provide: PAjaxService, useValue: mockPAjaxService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe añadir un detalle correctamente', () => {
    const nuevoDetalle: DetalleFactura = {
      id: -1,
      id_factura: 1, // Asegúrate de incluir id_factura
      cantidad: 2,
      concepto: 'Nuevo Concepto',
      precio: 100,
      tipo_iva: 21,
    };
    mockPAjaxService.anade.and.returnValue(of([nuevoDetalle])); // Devuelve un arreglo
  
    // Simular que el formulario tiene datos válidos
    component.detalle = nuevoDetalle;
  
    // Llamar al método onSubmit (simulando el envío del formulario)
    component.onSubmit(nuevoDetalle);
  
    // Verificar que el servicio fue llamado con los datos correctos
    expect(mockPAjaxService.anade).toHaveBeenCalledWith(nuevoDetalle);
  
    // Verificar que el componente redirige después de añadir el detalle
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});