import { MetaDataPage, MetaDataPageApi } from './apiTypes';

function toMetaDataPage(meta: MetaDataPageApi): MetaDataPage {
  return {
    next: meta.next,
    previous: meta.previous,
  };
}

export const apiAdapter = {
  toMetaDataPage,
};
