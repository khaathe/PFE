import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationActiviteComponent } from './creation-activite.component';

describe('CreationActiviteComponent', () => {
  let component: CreationActiviteComponent;
  let fixture: ComponentFixture<CreationActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
