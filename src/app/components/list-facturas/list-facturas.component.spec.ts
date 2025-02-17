import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFacturasComponent } from './list-facturas.component';

describe('MiComponente', () => {
  let component: ListFacturasComponent;
  let fixture: ComponentFixture<ListFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFacturasComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según la lógica de tu componente
});
