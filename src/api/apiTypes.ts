export interface PageParams {
  page?: number;
  per_page?: number;
}

/**
 * @description This interface is responsible to return metadata about pages of api
 */
export interface MetaDataPageApi {
  count: number;
  next: string | null;
  previous: string | null;
}

/**
 * @description This interface is responsible to join return of api in pages
 */
export interface PageApi<Data> extends MetaDataPageApi {
  results: Data[];
}
