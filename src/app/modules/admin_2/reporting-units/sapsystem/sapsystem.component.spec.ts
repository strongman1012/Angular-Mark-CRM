import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SapsystemComponent} from './sapsystem.component';

describe('SapsystemComponent', () => {
  let component: SapsystemComponent;
  let fixture: ComponentFixture<SapsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SapsystemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SapsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
