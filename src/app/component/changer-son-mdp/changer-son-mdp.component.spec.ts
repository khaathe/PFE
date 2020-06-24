import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerSonMdpComponent } from './changer-son-mdp.component';

describe('ChangerSonMdpComponent', () => {
  let component: ChangerSonMdpComponent;
  let fixture: ComponentFixture<ChangerSonMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerSonMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerSonMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
