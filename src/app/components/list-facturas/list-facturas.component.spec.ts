import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFacturasComponent } from './list-facturas.component';
import { DetalleFactura } from '../../models/detalle-factura';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PAjaxService } from '../../services/p-ajax.service';
import { of } from 'rxjs';

describe('ListFacturasComponent - Funciones de Cálculo', () => {
  let component: ListFacturasComponent;
  let fixture: ComponentFixture<ListFacturasComponent>;

  beforeEach(async () => {
    const mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['facturas', 'listadoDetalle', 'borra']);
  
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

  it('debe calcular correctamente el IVA', () => {
    expect(component.calIva(100, 2, 10)).toBe(20);
    expect(component.calIva(50, 3, 5)).toBe(7.5);
  });

  it('debe calcular correctamente el total con IVA', () => {
    expect(component.calTotalIva(100, 2, 10)).toBe(220);
    expect(component.calTotalIva(50, 3, 5)).toBe(157.5);
  });

  it('debe calcular la suma del IVA de los detalles', () => {
    component.listaDetall = [
      { precio: 100, cantidad: 2, tipo_iva: 10 } as DetalleFactura,
      { precio: 50, cantidad: 3, tipo_iva: 5 } as DetalleFactura,
    ];

    expect(component.calSumIva()).toBe(27.5);
  });

  it('debe calcular la suma total con IVA de los detalles', () => {
    component.listaDetall = [
      { precio: 100, cantidad: 2, tipo_iva: 10 } as DetalleFactura,
      { precio: 50, cantidad: 3, tipo_iva: 5 } as DetalleFactura,
    ];

    expect(component.calSumTotalIva()).toBe(377.5);
  });
});
