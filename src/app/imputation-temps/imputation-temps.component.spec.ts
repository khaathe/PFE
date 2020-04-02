import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationTempsComponent } from './imputation-temps.component';

describe('ImputationTempsComponent', () => {
  let component: ImputationTempsComponent;
  let fixture: ComponentFixture<ImputationTempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputationTempsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputationTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
