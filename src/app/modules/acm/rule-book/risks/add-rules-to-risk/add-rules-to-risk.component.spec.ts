import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRulesToRiskComponent } from './add-rules-to-risk.component';

describe('AddRulesToRiskComponent', () => {
  let component: AddRulesToRiskComponent;
  let fixture: ComponentFixture<AddRulesToRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRulesToRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRulesToRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
