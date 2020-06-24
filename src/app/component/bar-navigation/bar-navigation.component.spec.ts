import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarNavigationComponent } from './bar-navigation.component';

describe('BarNavigationComponent', () => {
  let component: BarNavigationComponent;
  let fixture: ComponentFixture<BarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
