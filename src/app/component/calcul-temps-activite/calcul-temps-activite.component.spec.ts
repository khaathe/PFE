import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculTempsActiviteComponent } from './calcul-temps-activite.component';

describe('CalculTempsActiviteComponent', () => {
  let component: CalculTempsActiviteComponent;
  let fixture: ComponentFixture<CalculTempsActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculTempsActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculTempsActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
