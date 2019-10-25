import fetchData from '../utils/fetchData';
import servicesWithRadioOrTv from '../../config';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';
import filterCurrentRadioProgrammes from '#lib/utilities/preprocessor/rules/filterCurrentRadioProgrammes';

const preprocessorRules = [
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
];

const getFrontpageInitialData = async (pathname, service) => {
  const frontPagePromise = fetchData({ pathname, preprocessorRules });

  // only have these 2 APIs to test against
  if (!['afrique', 'korean'].includes(service)) {
    return frontPagePromise;
  }

  // get radio schedule name for that country
  // have some proper config for this
  const radioService = servicesWithRadioOrTv[service].find(channel =>
    channel.includes('radio'),
  );

  const radioSchedulePromise = fetchData({
    // matches schedule path in fixture data - will this match final ares URL?
    pathname: `${pathname}/${radioService}/schedule`,
    preprocessorRules: [filterCurrentRadioProgrammes],
  });

  const [frontPageData, radioScheduleData] = await Promise.all([
    frontPagePromise,
    radioSchedulePromise,
  ]);

  const { pageData } = frontPageData;
  const { schedules } = radioScheduleData.pageData;

  return {
    ...frontPageData,
    pageData: {
      ...pageData,
      schedules,
    },
  };
};

export default getFrontpageInitialData;
