import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomPrimeTableStaticComponent} from './custom-prime-table-static.component';

describe('FormErrorComponent', () => {
  let component: CustomPrimeTableStaticComponent;
  let fixture: ComponentFixture<CustomPrimeTableStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPrimeTableStaticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPrimeTableStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
