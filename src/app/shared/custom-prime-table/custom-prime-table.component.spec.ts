import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomPrimeTableComponent} from './custom-prime-table.component';

describe('FormErrorComponent', () => {
  let component: CustomPrimeTableComponent;
  let fixture: ComponentFixture<CustomPrimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPrimeTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPrimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
