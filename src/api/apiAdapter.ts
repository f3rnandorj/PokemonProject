import { MetaDataPageApi } from '@api';
import { MetaDataPage } from '@types';

function toMetaDataPage(meta: MetaDataPageApi): MetaDataPage {
  return {
    count: meta.count,
    next: meta.next,
    previous: meta.previous,
  };
}

export const apiAdapter = {
  toMetaDataPage,
};
