import pipe from 'ramda/src/pipe';
import fetchPageData from '../../../lib/utilities/fetchPageData';
import addIdsToItems from './addIdsToItems';
import filterUnknownContentTypes from './filterContentType';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';
import applySquashTopstories from './topstories';

const processPageData = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
);

export default async path => {
  const { pageData: rawPageData, ...rest } = await fetchPageData(path);

  const processedPageData = processPageData(rawPageData);

  return { pageData: processedPageData, ...rest };
};
