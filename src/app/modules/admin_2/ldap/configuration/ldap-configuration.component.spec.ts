import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LdapConfigurationComponent} from './ldap-configuration.component';

describe('ConfigurationComponent', () => {
  let component: LdapConfigurationComponent;
  let fixture: ComponentFixture<LdapConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LdapConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LdapConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
