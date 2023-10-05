import {Component, OnInit, ViewChild} from '@angular/core';
import {
  LdapConfigurationComponent,
} from './configuration/ldap-configuration.component';
import {
  AddSapSystemComponent,
} from '../reporting-units/sapsystem/add-sapsystem/add-sap-system.component';
import {MatDialog} from '@angular/material/dialog';
import {AddLdapComponent} from './add-ldap/add-ldap.component';

@Component({
  selector: 'app-ldap',
  templateUrl: './ldap.component.html',
  styleUrls: ['./ldap.component.scss'],
})
export class LdapComponent implements OnInit {
  menuItems = [
    {label: 'Add', icon: 'pi pi-user-plus', command: () => this.addLdap()},
    {label: 'Edit', icon: 'pi pi-user-edit', command: () => this.editLdap()},
    {label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteLdap()},

  ];
  @ViewChild(
      LdapConfigurationComponent) ldapConfigurationComponent: LdapConfigurationComponent;

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  private addLdap() {
    this.openAddOrEditDialog();
  }

  private openAddOrEditDialog() {
    const dialogRef = this.matDialog.open(AddLdapComponent,
        {
          width: '60%',
        });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result !== '') {
        this.ldapConfigurationComponent.refresh();
      }
    });
  }

  private editLdap() {
    return this.ldapConfigurationComponent.editLDAP();
  }

  private deleteLdap() {
    this.ldapConfigurationComponent.deleteLdap();
  }
}
