import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import * as homeNavs from "assets/json/home-nav.json";

@Component({
  selector: "landing",
  templateUrl: "./landing.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  navs: any = (homeNavs as any).default;
  /**
   * Constructor
   */
  constructor() {}

  ngOnInit() {}
}
