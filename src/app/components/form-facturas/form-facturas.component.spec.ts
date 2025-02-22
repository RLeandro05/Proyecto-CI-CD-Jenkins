import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFacturasComponent } from './form-facturas.component';
import { PAjaxService } from '../../services/p-ajax.service';
import { of, throwError } from 'rxjs';
import { DetalleFactura } from '../../models/detalle-factura';

describe('FormFacturasComponent', () => {
  let component: FormFacturasComponent;
  let fixture: ComponentFixture<FormFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creamos espías (spies) para el servicio PAjaxService y el Router
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['selDetalleID', 'anade', 'modificarDetalle']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Configuramos el ActivatedRoute para simular parámetros de la URL
    mockActivatedRoute = {
      snapshot: {
        params: {
          idDetalle: -1, // Por defecto, simulamos que no hay un ID de detalle
          idFactura: 100 // Simulamos un ID de factura
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [FormFacturasComponent],
      imports: [FormsModule, RouterTestingModule], // Importamos FormsModule para manejar formularios
      providers: [
        { provide: PAjaxService, useValue: mockPAjaxService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
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
      // Simulamos un ID de detalle existente
      const mockIdDetalle = 5;
      mockActivatedRoute.snapshot.params = { idDetalle: mockIdDetalle, idFactura: 100 }; // Configuramos los parámetros
  
      // Simulamos la respuesta del servicio selDetalleID
      const detalleSimulado: DetalleFactura = {
        id: mockIdDetalle,
        id_factura: 100,
        concepto: 'Producto Existente',
        cantidad: 3,
        precio: 75,
        tipo_iva: 2
      };
      mockPAjaxService.selDetalleID.and.returnValue(of(detalleSimulado));
  
      // Llamamos al método ngOnInit
      component.ngOnInit();
      tick(); // Esperamos a que el observable emita su valor
  
      // Verificamos que el servicio fue llamado con el ID correcto
      expect(mockPAjaxService.selDetalleID).toHaveBeenCalledWith(mockIdDetalle);
  
      // Verificamos que el detalle se cargó correctamente
      expect(component.detalle).toEqual(detalleSimulado);
  
      // Verificamos que el texto del botón sea "Modificar"
      expect(component.textoBoton).toBe('Modificar');
    }));
  
    it('debe manejar errores al cargar los datos del detalle', fakeAsync(() => {
      // Simulamos un error en el servicio selDetalleID
      mockPAjaxService.selDetalleID.and.returnValue(throwError(() => new Error('Error')));
  
      // Simulamos un ID de detalle existente
      const mockIdDetalle = 5;
      mockActivatedRoute.snapshot.params = { idDetalle: mockIdDetalle, idFactura: 100 }; // Configuramos los parámetros
  
      // Llamamos al método ngOnInit
      component.ngOnInit();
      tick(); // Esperamos a que el observable emita su valor
  
      // Verificamos que el servicio fue llamado con el ID correcto
      expect(mockPAjaxService.selDetalleID).toHaveBeenCalledWith(mockIdDetalle);
  
      // Verificamos que el detalle mantiene los valores iniciales en caso de error
      expect(component.detalle.id).toBe(mockIdDetalle); // El ID sigue siendo el mismo
      expect(component.detalle.id_factura).toBe(100); // El ID de factura se mantiene
      expect(component.textoBoton).toBe('Modificar'); // El texto sigue siendo "Modificar"
    }));
  });

  describe('onSubmit', () => {
    it('debe añadir un nuevo detalle correctamente', () => {
      // Simulamos un nuevo detalle
      const nuevoDetalle: DetalleFactura = {
        id: -1,
        id_factura: 100,
        concepto: 'Nuevo Producto',
        cantidad: 2,
        precio: 100,
        tipo_iva: 21
      };
      component.detalle = nuevoDetalle;

      // Simulamos la respuesta del servicio anade
      mockPAjaxService.anade.and.returnValue(of([]));

      // Llamamos al método onSubmit
      component.onSubmit(nuevoDetalle);

      // Verificamos que el servicio anade fue llamado con el detalle correcto
      expect(mockPAjaxService.anade).toHaveBeenCalledWith(nuevoDetalle);

      // Verificamos que se redirige después de añadir el detalle
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('debe modificar un detalle existente correctamente', () => {
      // Simulamos un detalle existente
      const detalleExistente: DetalleFactura = {
        id: 5,
        id_factura: 100,
        concepto: 'Producto Modificado',
        cantidad: 4,
        precio: 80,
        tipo_iva: 1
      };
      component.detalle = detalleExistente;

      // Simulamos la respuesta del servicio modificarDetalle
      mockPAjaxService.modificarDetalle.and.returnValue(of([]));

      // Llamamos al método onSubmit
      component.onSubmit(detalleExistente);

      // Verificamos que el servicio modificarDetalle fue llamado con el detalle correcto
      expect(mockPAjaxService.modificarDetalle).toHaveBeenCalledWith(detalleExistente);

      // Verificamos que se redirige después de modificar el detalle
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});