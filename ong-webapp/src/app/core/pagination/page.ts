export class Page {
  public count: number;
  public actual: number;
  public first: { page: number };
  public previous: { page: number };
  public next: { page: number };
  public last: { page: number };
  public range: {
    active: boolean;
    number: number;
    link: { page: number };
  }[];
}
