import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSearchComponent } from './rule-search.component';

describe('RuleSearchComponent', () => {
  let component: RuleSearchComponent;
  let fixture: ComponentFixture<RuleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
