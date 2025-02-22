import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFacturasComponent } from './form-facturas.component';
import { PAjaxService } from '../../services/p-ajax.service';
import { of, throwError } from 'rxjs';
import { DetalleFactura } from '../../models/detalle-factura';
import { HttpClient } from '@angular/common/http';

// Mock para HttpClient
class MockHttpClient {
  post() {
    return of([]); // Retorna una respuesta vacía por defecto, puedes ajustarlo según la prueba
  }
}

describe('FormFacturasComponent', () => {
  let component: FormFacturasComponent;
  let fixture: ComponentFixture<FormFacturasComponent>;
  let mockPAjaxService: jasmine.SpyObj<PAjaxService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creamos un espía (spy) del servicio PAjaxService
    mockPAjaxService = jasmine.createSpyObj('PAjaxService', ['selDetalleID', 'modificarDetalle', 'anade']);

    // Creamos un espía (spy) del servicio Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mockeamos el HttpClient
    const mockHttpClient = new MockHttpClient();

    // Configuramos el ActivatedRoute para simular parámetros de la URL
    mockActivatedRoute = {
      snapshot: {
        params: {
          idDetalle: 5, // Simulamos que hay un ID de detalle existente
          idFactura: 100 // Simulamos un ID de factura
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [FormFacturasComponent],
      imports: [FormsModule, RouterTestingModule], // Importamos FormsModule para manejar formularios
      providers: [
        { provide: PAjaxService, useValue: mockPAjaxService }, // Usamos el spy directamente
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClient, useValue: mockHttpClient }, // Proveemos el mock de HttpClient
        { provide: Router, useValue: mockRouter } // Proveemos el mock de Router
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
      const mockIdDetalle = 5;

      // Simulamos la respuesta del servicio selDetalleID
      const detalleSimulado: DetalleFactura = {
        id: mockIdDetalle,
        id_factura: 100,
        concepto: 'Producto Existente',
        cantidad: 3,
        precio: 75,
        tipo_iva: 2
      };

      // Configuramos la respuesta mockeada
      mockPAjaxService.selDetalleID.and.returnValue(of(detalleSimulado));

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

      component.ngOnInit();
      tick(); // Esperamos a que el observable emita su valor

      // Verificamos que el servicio fue llamado con el ID correcto
      expect(mockPAjaxService.selDetalleID).toHaveBeenCalledWith(5);

      // Verificamos que el detalle no se actualizó
      expect(component.detalle.id).toBe(5);
      expect(component.textoBoton).toBe('Modificar'); // El texto sigue siendo "Modificar"
    }));
  });

  describe('onSubmit', () => {
    it('debe llamar al servicio anade cuando se añade un nuevo detalle', () => {
      const detalleNuevo: DetalleFactura = {
        id: -1,
        id_factura: 100,
        cantidad: 2,
        concepto: 'Nuevo Producto',
        precio: 50,
        tipo_iva: 21
      };
      component.detalle = detalleNuevo;

      // Simulamos la respuesta del servicio anade
      mockPAjaxService.anade.and.returnValue(of([])); // Aquí mockeamos la llamada a anade

      component.onSubmit(component.detalle);

      // Verificamos que el servicio anade fue llamado con el detalle correcto
      expect(mockPAjaxService.anade).toHaveBeenCalledWith(detalleNuevo);

      // Verificamos que la navegación ocurrió después de añadir el detalle
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});