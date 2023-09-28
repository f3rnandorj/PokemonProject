import { MetaDataPageApi } from '@api';
import { MetaDataPage } from '@types';

function toMetaDataPage(meta: MetaDataPageApi, page: number): MetaDataPage {
  return {
    count: meta.count,
    next: meta.next,
    currentPage: page,
    previous: meta.previous,
  };
}

export const apiAdapter = {
  toMetaDataPage,
};
