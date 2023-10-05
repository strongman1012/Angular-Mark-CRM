import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantRulesComponent } from './variant-rules.component';

describe('VariantRulesComponent', () => {
  let component: VariantRulesComponent;
  let fixture: ComponentFixture<VariantRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
