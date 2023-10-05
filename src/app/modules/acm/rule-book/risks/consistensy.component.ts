import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";

@Component({
  selector: "consistensy-component",
  template: ` <div class="w-full p-6">
    <p class="flex text-center ml-2 my-auto text-[25px] mb-4">{{ title }}</p>
    <p-table
      [value]="data"
      [title]="title"
      [tableStyle]="{ 'min-width': '50rem' }"
      [scrollable]="true"
      dataKey="key"
      styleClass="p-datatable-sm"
      scrollHeight="scrollHeight"
      [rowsPerPageOptions]="[10, 20, 30, 50, 100, 150, 200]"
      [rows]="10"
      [loading]="loading"
      [(selection)]="selectedRisk"
      [paginator]="true"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Risk ID</th>
          <th>Message</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-item>
        <tr>
          <td>{{ item.key }}</td>
          <td>{{ item.value[0] }}</td>
        </tr>
      </ng-template>
    </p-table>
  </div>`,
  //   encapsulation: ViewEncapsulation.None,
})
export class ConsistensyComponent implements OnInit, AfterViewInit {
  data = [];
  loading: boolean;
  selectedRisk: any;
  title = "Inconsistensy Risks";
  startingDisplayAmout: number = 10;
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  paginator = true;
  scrollHeight: string = "200px";
  private subject = new Subject<boolean>();

  constructor(private ruleBookService: RuleBookService) {}

  ngOnInit(): void {
    this.loading = true;
    this.ruleBookService
      .riskConsistensy()
      .pipe(
        tap((res) => {
          this.data = Object.keys(res.data).map((key) => {
            return { key: key, value: res.data[key] };
          });

          this.loading = false;
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {}
}
