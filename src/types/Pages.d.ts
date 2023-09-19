export interface MetaDataPage {
  count: number;
  next: string;
  previous: string;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
