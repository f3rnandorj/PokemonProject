export interface MetaDataPage {
  count: number;
  next: string;
  currentPage: number;
  previous: string | null;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
