import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportaNfseComponent } from './importa-nfse.component';

describe('ImportaNfseComponent', () => {
  let component: ImportaNfseComponent;
  let fixture: ComponentFixture<ImportaNfseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportaNfseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportaNfseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
