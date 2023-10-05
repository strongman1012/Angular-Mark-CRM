import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantRisksComponent } from './variant-risks.component';

describe('VariantRisksComponent', () => {
  let component: VariantRisksComponent;
  let fixture: ComponentFixture<VariantRisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantRisksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
