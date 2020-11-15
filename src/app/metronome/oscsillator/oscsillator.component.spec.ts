import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscsillatorComponent } from './oscsillator.component';

describe('OscsillatorComponent', () => {
  let component: OscsillatorComponent;
  let fixture: ComponentFixture<OscsillatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OscsillatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscsillatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
