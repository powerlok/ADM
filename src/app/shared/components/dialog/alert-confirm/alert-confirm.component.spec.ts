import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmComponent } from './alert-confirm.component';

describe('AlertConfirmComponent', () => {
  let component: AlertConfirmComponent;
  let fixture: ComponentFixture<AlertConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
