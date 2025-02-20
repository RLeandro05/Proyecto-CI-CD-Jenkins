import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFacturasComponent } from './list-facturas.component';
import { DetalleFactura } from '../../models/detalle-factura';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PAjaxService } from '../../services/p-ajax.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ListFacturasComponent - Funciones de Cálculo', () => {
  let component: ListFacturasComponent;
  let fixture: ComponentFixture<ListFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;

  beforeEach(async () => {
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['facturas', 'listadoDetalle', 'borra']);
  
    // Asegurar que los métodos devuelvan observables
    mockPAjaxService.facturas.and.returnValue(of([]));
    mockPAjaxService.listadoDetalle.and.returnValue(of([]));
    mockPAjaxService.borra.and.returnValue(of([]));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListFacturasComponent],
      providers: [{ provide: PAjaxService, useValue: mockPAjaxService }]
    }).compileComponents();
  
    fixture = TestBed.createComponent(ListFacturasComponent);
    component = fixture.componentInstance;
  });

  it('debe borrar un detalle correctamente', () => {
    //Simulamos que tenemos una lista de detalles
    const detalle: DetalleFactura = { id: 1, concepto: 'Detalle 1', cantidad: 2, precio: 100, tipo_iva: 10 } as DetalleFactura;
    component.listaDetall = [detalle];

    // Llamamos al método de borrar
    component.borrar(detalle);

    // Verificamos que el servicio de borrado fue llamado con el detalle correcto
    expect(mockPAjaxService.borra).toHaveBeenCalledWith(detalle);

    // Simulamos que el servicio devuelve una nueva lista sin el detalle borrado
    mockPAjaxService.borra.and.returnValue(of([]));

    // Llamamos a la función nuevamente y verificamos que la lista se actualiza
    component.borrar(detalle);
    fixture.detectChanges();

    // Verificamos que el detalle ya no esté en la lista
    expect(component.listaDetall.length).toBe(0);
  });
});
