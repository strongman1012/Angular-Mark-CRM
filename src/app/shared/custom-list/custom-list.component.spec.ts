import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomListComponent} from './custom-list.component';

describe('FormErrorComponent', () => {
  let component: CustomListComponent;
  let fixture: ComponentFixture<CustomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
