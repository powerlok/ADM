import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportaDDAItauComponent } from './importa-dda-itau.component';

describe('ImportaDDAItauComponent', () => {
  let component: ImportaDDAItauComponent;
  let fixture: ComponentFixture<ImportaDDAItauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportaDDAItauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportaDDAItauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
