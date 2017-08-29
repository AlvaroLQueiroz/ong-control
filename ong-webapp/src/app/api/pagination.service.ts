import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
@Injectable()
export class PaginationService {
  private subject = new Subject<any>();

  constructor() {}

  sendMessage(message: {}) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
