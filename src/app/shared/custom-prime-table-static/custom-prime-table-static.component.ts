import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "custom-ps-table",
  templateUrl: "./custom-prime-table-static.component.html",
  styleUrls: ["./custom-prime-table-static.component.scss"],
})
export class CustomPrimeTableStaticComponent implements OnInit {
  @Input() columns: any = [];
  @Input() primaryKey: string;
  @Input() items: any = [];
  @Input() header: any;
  @Input() filterEnabled: string = "true";
  @Input() onRowSelect: (args: any) => void;
  @Input() onRowUnselect: (args: any) => void;
  @Input() displaySearch: boolean = false;
  @Input() selectionMode: string = "single";
  @Input() rowsPerPageOptions: any = [5, 10, 25];
  @Input() paginator: boolean = true;
  @Input() startingDisplayAmout: number = 5;

  constructor() {}

  ngOnInit(): void {
    if (this.columns[1].name.includes(".")) {
      console.log(
        this.items[0][this.columns[1].name.split(".")[0]][
          this.columns[1].name.split(".")[1]
        ]
      );
    }
  }
}
