import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormFacturasComponent } from './form-facturas.component';
import { PAjaxService } from '../../services/p-ajax.service';
import { of, throwError } from 'rxjs';
import { DetalleFactura } from '../../models/detalle-factura';

describe('FormFacturasComponent', () => {
  let component: FormFacturasComponent;
  let fixture: ComponentFixture<FormFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    //Creamos un espía (spy) del servicio PAjaxService
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['selDetalleID', 'modificarDetalle']);

    //Configuramos el ActivatedRoute para simular parámetros de la URL
    mockActivatedRoute = {
      snapshot: {
        params: {
          idDetalle: 5, //Simulamos que hay un ID de detalle existente
          idFactura: 100 //Simulamos un ID de factura
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [FormFacturasComponent],
      imports: [FormsModule, RouterTestingModule], //Importamos FormsModule para manejar formularios
      providers: [
        { provide: PAjaxService, useValue: mockPAjaxService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFacturasComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debe cargar los datos del detalle existente y configurar el texto del botón como "Modificar"', fakeAsync(() => {
      //Simulamos un ID de detalle existente
      const mockIdDetalle = 5;

      //Simulamos la respuesta del servicio selDetalleID
      const detalleSimulado: DetalleFactura = {
        id: mockIdDetalle,
        id_factura: 100,
        concepto: 'Producto Existente',
        cantidad: 3,
        precio: 75,
        tipo_iva: 2
      };
      mockPAjaxService.selDetalleID.and.returnValue(of(detalleSimulado));

      //Llamamos al método ngOnInit
      component.ngOnInit();
      tick(); //Esperamos a que el observable emita su valor

      //Verificamos que el servicio fue llamado con el ID correcto
      expect(mockPAjaxService.selDetalleID).toHaveBeenCalledWith(mockIdDetalle);

      //Verificamos que el detalle se cargó correctamente
      expect(component.detalle).toEqual(detalleSimulado);

      //Verificamos que el texto del botón sea "Modificar"
      expect(component.textoBoton).toBe('Modificar');
    }));

    it('debe manejar errores al cargar los datos del detalle', fakeAsync(() => {
      //Simulamos un error en el servicio selDetalleID
      mockPAjaxService.selDetalleID.and.returnValue(throwError(() => new Error('Error')));

      //Llamamos al método ngOnInit
      component.ngOnInit();
      tick(); //Esperamos a que el observable emita su valor

      //Verificamos que el servicio fue llamado con el ID correcto
      expect(mockPAjaxService.selDetalleID).toHaveBeenCalledWith(5);

      //Verificamos que el detalle no se actualizó
      expect(component.detalle.id).toBe(5);
      expect(component.textoBoton).toBe('Modificar'); //El texto sigue siendo "Modificar"
    }));
  });

  describe('onSubmit', () => {
    it('debe llamar al servicio modificarDetalle cuando se modifica un detalle existente', () => {
      //Simulamos un detalle existente
      const detalleExistente: DetalleFactura = {
        id: 5,
        id_factura: 100,
        concepto: 'Producto Modificado',
        cantidad: 4,
        precio: 80,
        tipo_iva: 1
      };
      component.detalle = detalleExistente;

      //Simulamos la respuesta del servicio modificarDetalle
      mockPAjaxService.modificarDetalle.and.returnValue(of([]));

      //Llamamos al método onSubmit
      component.onSubmit(component.detalle);

      //Verificamos que el servicio modificarDetalle fue llamado con el detalle correcto
      expect(mockPAjaxService.modificarDetalle).toHaveBeenCalledWith(detalleExistente);
    });
  });
});