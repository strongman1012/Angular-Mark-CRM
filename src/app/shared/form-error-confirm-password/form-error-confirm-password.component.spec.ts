import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  FormErrorConfirmPasswordComponent,
} from './form-error-confirm-password.component';

describe('FormErrorConfirmPasswordComponent', () => {
  let component: FormErrorConfirmPasswordComponent;
  let fixture: ComponentFixture<FormErrorConfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormErrorConfirmPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorConfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
