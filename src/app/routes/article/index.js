import pipe from 'ramda/src/pipe';
import getInitialData from './getInitialData';
import { articlePath } from '../utils/regex';
import ArticlePage from '../../pages/Article';
import withVariant from '../../containers/PageHandlers/withVariant';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

const enhancedArticlePage = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
  ArticlePage,
);

export default {
  path: articlePath,
  exact: true,
  component: enhancedArticlePage,
  getInitialData,
  pageType: 'article',
};
