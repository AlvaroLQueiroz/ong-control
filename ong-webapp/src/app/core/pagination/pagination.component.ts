import { Page } from './page';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/finally';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() firstLast: boolean = false;
  @Input() page: Page;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
