export interface IMetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  public items: T;
  public metaData: IMetaData;
  constructor(items: T, metaData: IMetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
