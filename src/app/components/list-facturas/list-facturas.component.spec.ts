import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ListFacturasComponent } from './list-facturas.component';
import { DetalleFactura } from '../../models/detalle-factura';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PAjaxService } from '../../services/p-ajax.service';
import { of } from 'rxjs';

describe('ListFacturasComponent - Funciones de Cálculo', () => {
  let component: ListFacturasComponent;
  let fixture: ComponentFixture<ListFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;

  beforeEach(async () => {
    //Creamos un spy del servicio PAjaxService
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['facturas', 'listadoDetalle', 'borra']);
    
    //Configuramos los métodos del servicio para devolver Observables simulados
    mockPAjaxService.facturas.and.returnValue(of([]));
    mockPAjaxService.listadoDetalle.and.returnValue(of([]));
    mockPAjaxService.borra.and.returnValue(of([]));

    //Configuramos el TestBed con el componente y las dependencias necesarias
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListFacturasComponent],
      providers: [{ provide: PAjaxService, useValue: mockPAjaxService }]
    }).compileComponents();

    //Creamos una instancia del componente
    fixture = TestBed.createComponent(ListFacturasComponent);
    component = fixture.componentInstance;
  });

  it('debe borrar un detalle correctamente', () => {
    //Simulamos que tenemos una lista de detalles
    const detalle1: DetalleFactura = { id: 1, concepto: 'Detalle 1', cantidad: 2, precio: 110, tipo_iva: 1 } as DetalleFactura;
    component.listaDetall = [detalle1];

    //Llamamos al método de borrar
    component.borrar(detalle1);

    //Verificamos que el servicio de borrado fue llamado con el detalle correcto
    expect(mockPAjaxService.borra).toHaveBeenCalledWith(detalle1);

    //Simulamos que el servicio devuelve una nueva lista sin el detalle borrado
    mockPAjaxService.borra.and.returnValue(of([]));

    //Detectamos cambios en el componente
    fixture.detectChanges();

    //Verificamos que el detalle ya no está en la lista
    expect(component.listaDetall.length).toBe(0);
  });

  it('debe listar los detalles correctamente', fakeAsync(() => {
    //Simulamos una lista de detalles
    const detallesSimulados: DetalleFactura[] = [
      { id: 1, id_factura: 100, concepto: 'Producto A', cantidad: 2, precio: 50, tipo_iva: 1 } as DetalleFactura,
      { id: 2, id_factura: 100, concepto: 'Producto B', cantidad: 1, precio: 100, tipo_iva: 2 } as DetalleFactura
    ];

    //Hacemos que el servicio listadoDetalle devuelva la lista simulada
    mockPAjaxService.listadoDetalle.and.returnValue(of(detallesSimulados));

    //Llamamos al método que debería usar listadoDetalle
    component.listadoDetalle(100); // Asumiendo que este es el método para listar detalles

    //Esperamos a que el observable emita su valor
    tick();

    //Verificamos que listadoDetalle fue llamado con el idFactura correcto
    expect(mockPAjaxService.listadoDetalle).toHaveBeenCalledWith(100);

    //Verificamos que la lista del componente contiene los detalles simulados
    expect(component.listaDetall).toEqual(detallesSimulados);
    expect(component.listaDetall.length).toBe(2);
  }));
});