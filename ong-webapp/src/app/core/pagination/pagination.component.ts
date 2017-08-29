import { Subscription } from "rxjs/Rx";
import { PaginationService } from "./../../api/pagination.service";
import { Component, OnInit, Input } from "@angular/core";
import 'rxjs/add/operator/finally';
@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  @Input() firstLast: boolean = false;
  paginationSubscription: Subscription;
  pages: any;
  loading: boolean = true;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationSubscription = this.paginationService
      .getMessage()
      .finally(() => console.log('ola'))
      .subscribe(
        pages => {
          this.pages = pages;
          this.loading = false;
        },
        err => console.log(err),
      );
  }

  ngOnDestroy() {
    this.paginationSubscription.unsubscribe();
  }
}
