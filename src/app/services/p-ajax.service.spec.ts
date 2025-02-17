import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAjaxService } from './p-ajax.service';

describe('MiComponente', () => {
  let component: PAjaxService;
  let fixture: ComponentFixture<PAjaxService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PAjaxService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PAjaxService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según la lógica de tu componente
});
