export interface PageParams {
  page?: number;
  per_page?: number;
}

/**
 * @description This interface is responsible to return metadata about pages of api
 */
export interface MetaDataPageApi {
  count: number;
  next: string;
  previous: string;
}

/**
 * @description This interface is responsible to join return of api in pages
 */
export interface PageApi<Data> {
  meta: MetaDataPageApi;
  data: Data[];
}

/**
 * @description This interface is responsible to return metadata about pages of app
 */
export interface MetaDataPage {
  next: string;
  previous: string;
}

/**
 * @description This interface is responsible to join return of app in pages
 */
export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
