import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerMdpUserComponent } from './changer-mdp-user.component';

describe('ChangerMdpUserComponent', () => {
  let component: ChangerMdpUserComponent;
  let fixture: ComponentFixture<ChangerMdpUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerMdpUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerMdpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
