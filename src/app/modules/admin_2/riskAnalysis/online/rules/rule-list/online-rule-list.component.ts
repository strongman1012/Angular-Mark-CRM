import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  LoadSelectionService,
} from '../../../../../../backend-api/load-selection.service';
import {map, Subject, takeUntil} from 'rxjs';
import {
  RiskAnalysisOnlineService,
} from '../../risk-analysis-online.service';
import {
  OnlineUserDetailComponent,
} from '../../users/user-detail/online-user-detail.component';
import {MatDialog} from '@angular/material/dialog';
import {
  OnlineRuleDetailComponent,
} from '../rule-detail/online-rule-detail.component';
import {
  OnlineRuleSelectionListComponent,
} from '../select-rules/online-rule-selection-list.component';

@Component({
  selector: 'online-rule-list',
  template: ``,
  // templateUrl: './online-rule-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OnlineRuleListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() preSelection;
  cols = [
    {
      name: 'ruleName', type: 'text', header: 'Rule ID',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {name: 'ruleDescription', type: 'text', header: 'Description'},
    {name: 'businessProcess.name', type: 'text', header: 'Business Process'},
    {
      name: 'businessProcess.subProcessNames',
      type: 'text',
      header: 'Sub Process',
    },
    {name: 'ruleType.name', type: 'text', header: 'Rule Type'},
  ];

  items: [];

  totalRecords: any;
  loading: any;
  private subject = new Subject<boolean>();

  private tableEvent: any;
  menuItems = [
    {
      label: 'Remove',
      icon: 'pi pi-user-plus',
      command: () => this.remove(),
    },
    {
      label: 'Remove All',
      icon: 'pi pi-user-edit',
      command: () => this.removeAll(),
    },
    {
      label: 'Select',
      icon: 'pi pi-user-edit',
      command: () => this.openRuleSelection(),
    },
  ];
  private selectedRuleIds = [];


  /**
   * Constructor
   */
  constructor(
      private _loadSelectionService: LoadSelectionService,
      private apiService: RiskAnalysisOnlineService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.preSelection !== null && this.preSelection !== undefined) {

      this.loadData(this.tableEvent);
    }
  }

  loadData = (event): void => {
    this.tableEvent = event;
    if (this.preSelection.selectedRules == null) {
      return;
    }
    this.loading = true;
    const data = {};
    setTimeout(() => {
      this.apiService.selectedRuleList({
        lazyEvent: this.tableEvent,
        ruleIds: this.preSelection.selectedRules,
      }).pipe(
          map((apiResponse) => {
            this.items = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  };

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  onRowSelect = (event): void => {
    this.selectedRuleIds.push(event.data.id);
  };
  onRowUnselect = (event): void => {
    this.selectedRuleIds = this.selectedRuleIds.filter(
        obj => obj !== event.data.id);
  };


  private remove() {

    this.selectedRuleIds.forEach(
        p => this.preSelection.selectedRules =
            this.preSelection.selectedRules.filter(obj => obj !== p));

    this.loadData(this.tableEvent);
  }

  private removeAll() {
    this.selectedRuleIds = [];
    this.preSelection.selectedRules = this.selectedRuleIds;
    this.loadData(this.tableEvent);
  }

  private openDetail(rule) {
    const data = {ruleId: rule.id};
    const dialogRef = this.dialog.open(OnlineRuleDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openRuleSelection() {
    if (this.preSelection !== null && this.preSelection !== undefined) {
      const dialogRef = this.dialog.open(OnlineRuleSelectionListComponent, {
        autoFocus: false,
        maxHeight: '110vh',
        width: '70%',
        disableClose: true,
        data: {
          preSelection: this.preSelection,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.selectedRuleIds !== null) {
          result.selectedRuleIds.forEach(
              p => this.preSelection.selectedRules.push(p));
          this.loadData(this.tableEvent);
        }

      });
    }

  }
}
