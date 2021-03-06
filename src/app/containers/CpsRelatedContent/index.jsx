import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import { RequestContext } from '#contexts/RequestContext';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GhostGrid, GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';
import Grid from '../../components/Grid';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }

  /* z-index needs explicitly set as the psammead section label component uses negative z-indices */
  z-index: 0;
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

const formatItem = (item, env) => {
  if (env === 'live') return item;

  // In non-live environments, we need to pass this querystring to ensure
  // the linked site retrieves its data from the TEST API location
  const uriSuffix = '?_x_candy_override=https%3A%2F%2Fapi.test.bbc.co.uk';
  const baseUri = path(['locators', 'assetUri'], item);

  return assocPath(['locators', 'assetUri'], `${baseUri}${uriSuffix}`, item);
};

const CpsRelatedContent = ({ content }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const { env } = useContext(RequestContext);
  if (!content.length) return null;

  return (
    <GhostGrid
      as="section"
      role="region"
      aria-labelledby="related-content-heading"
    >
      <Wrapper>
        <StyledSectionLabel
          script={script}
          service={service}
          dir={dir}
          labelId="related-content-heading"
        >
          {translations.relatedContent}
        </StyledSectionLabel>
        <Grid
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 8,
            group5: 8,
          }}
          as={StoryPromoUl}
          enableGelGutters
          dir={dir}
        >
          {content
            .map(item => formatItem(item, env))
            .map(item => (
              <Grid
                item
                columns={{
                  group0: 6,
                  group1: 6,
                  group2: 6,
                  group3: 6,
                  group4: 4,
                  group5: 4,
                }}
                as={StoryPromoLi}
                key={item.id || item.uri}
                dir={dir}
              >
                <StoryPromo item={item} dir={dir} />
              </Grid>
            ))}
        </Grid>
      </Wrapper>
    </GhostGrid>
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
};

CpsRelatedContent.defaultProps = {
  content: [],
};

export default CpsRelatedContent;
