import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRiskComponent } from './import-risk.component';

describe('ImportRiskComponent', () => {
  let component: ImportRiskComponent;
  let fixture: ComponentFixture<ImportRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
