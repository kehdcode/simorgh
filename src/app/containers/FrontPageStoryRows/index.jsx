import React from 'react';
import Grid from '@bbc/psammead-grid';
import { arrayOf, shape, bool, oneOf } from 'prop-types';
import { StoryPromoLi } from '@bbc/psammead-story-promo-list';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
  noImageStoryColumns,
} from './storyColumns';
import { storyItem } from '#models/propTypes/storyItem';
import BulletinContainer from '../Bulletin';
import StoryPromoContainer from '../StoryPromo';

const isBulletin = item =>
  item.contentType === 'TVBulletin' || item.contentType === 'RadioBulletin';

const renderPromo = (
  item,
  optional = {
    promoType: 'regular',
    isFirstSection: false,
    displayImage: true,
  },
) => {
  const { promoType, displayImage, isFirstSection } = optional;
  const lazyLoadImage = !(promoType === 'top' && isFirstSection); // don't lazy load image if it is a top story
  const renderedPromo = isBulletin(item) ? (
    <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} />
  ) : (
    <StoryPromoContainer
      item={item}
      promoType={promoType}
      lazyLoadImage={lazyLoadImage}
      displayImage={displayImage}
    />
  );

  return renderedPromo;
};

/*
 * Below are all the different row types that can be used for frontpages.
 * They all take in an array of story items and a dir.
 */

const rowPropTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

const rowDefaultProps = {
  dir: 'ltr',
};

export const TopRow = ({
  stories,
  isFirstSection,
  sectionHasSingleStory,
  dir,
}) => (
  <Grid
    item
    columns={topStoryColumns}
    as={!sectionHasSingleStory && StoryPromoLi}
    dir={dir}
  >
    {renderPromo(stories[0], { promoType: 'top', isFirstSection })}
  </Grid>
);

TopRow.propTypes = {
  ...rowPropTypes,
  isFirstSection: bool,
  sectionHasSingleStory: bool,
};

TopRow.defaultProps = {
  ...rowDefaultProps,
  isFirstSection: false,
  sectionHasSingleStory: false,
};

export const LeadingRow = ({ stories, dir }) => (
  <>
    <Grid
      item
      columns={leadingStoryColumns}
      as={StoryPromoLi}
      isBulletin={isBulletin(stories[0])}
      dir={dir}
    >
      {renderPromo(stories[0], { promoType: 'leading' })}
    </Grid>
    <Grid
      item
      columns={regularStoryColumns}
      as={StoryPromoLi}
      isBulletin={isBulletin(stories[1])}
      dir={dir}
    >
      {renderPromo(stories[1], { promoType: 'regular' })}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  ...rowPropTypes,
};

LeadingRow.defaultProps = {
  ...rowDefaultProps,
};

export const RegularRow = ({ stories, displayImages, dir }) => (
  <>
    {stories.map(story => (
      <Grid
        item
        columns={displayImages ? regularStoryColumns : noImageStoryColumns}
        key={story.id}
        as={StoryPromoLi}
        isBulletin={isBulletin(story)}
        dir={dir}
      >
        {renderPromo(story, {
          promoType: 'regular',
          displayImage: displayImages,
        })}
      </Grid>
    ))}
  </>
);

RegularRow.propTypes = {
  ...rowPropTypes,
  displayImages: bool,
};

RegularRow.defaultProps = {
  ...rowDefaultProps,
  displayImages: false,
};