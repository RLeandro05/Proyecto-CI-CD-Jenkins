import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFacturasComponent } from './form-facturas.component';

describe('MiComponente', () => {
  let component: FormFacturasComponent;
  let fixture: ComponentFixture<FormFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFacturasComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según la lógica de tu componente
});
