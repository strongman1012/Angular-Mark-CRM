import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRisksComponent } from './add-risks.component';

describe('AddRisksComponent', () => {
  let component: AddRisksComponent;
  let fixture: ComponentFixture<AddRisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRisksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
