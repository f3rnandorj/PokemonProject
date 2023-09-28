export interface MetaDataPage {
  count: number;
  next: string;
  currentPage: number;
  previous: string;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
