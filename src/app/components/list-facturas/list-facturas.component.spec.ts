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
    const detalle1: DetalleFactura = { id: 1, concepto: 'Detalle 1', cantidad: 2, precio: 110, tipo_iva: 1 } as DetalleFactura;
    const detalle2: DetalleFactura = { id: 2, concepto: 'Detalle 2', cantidad: 23, precio: 1020, tipo_iva: 10 } as DetalleFactura;
    const detalle3: DetalleFactura = { id: 3, concepto: 'Detalle 3', cantidad: 21, precio: 1004, tipo_iva: 23 } as DetalleFactura;
    component.listaDetall = [detalle1, detalle2, detalle3];

    //Llamamos al método de borrar
    component.borrar(detalle1);

    //Verificamos que el servicio de borrado fue llamado con el detalle correcto
    expect(mockPAjaxService.borra).toHaveBeenCalledWith(detalle1);

    //Simulamos que el servicio devuelve una nueva lista sin el detalle borrado
    mockPAjaxService.borra.and.returnValue(of([]));

    fixture.detectChanges();

    //Verificamos que el detalle ya no esté en la lista
    expect(component.listaDetall.length).toBe(0);
  });
});
