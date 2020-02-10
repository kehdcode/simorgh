import React from 'react';
import styled, { css } from 'styled-components';
import { node } from 'prop-types';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { C_GHOST } from '@bbc/psammead-styles/colours';

const group4WrapperMaxWidth = `63rem`; // 1008px
const group5WrapperMaxWidth = `80rem`; // 1280px

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const GelPageGrid = styled(Grid)`
  ${gelMaxWidths}
`;

export const GhostGelPageGrid = styled(Grid)`
  ${gelMaxWidths}
  background-color: ${C_GHOST};
`;

export const GridMaxWidthGroup5 = styled(Grid)`
  margin: 0 auto;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const FrontPageGrid = styled(GridMaxWidthGroup5)`
  padding-bottom: ${GEL_SPACING_QUAD};
  margin-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
`;

export const TwoColumnLayout = ({ firstColItems, secondColItems }) => {
  const gridOffset = {
    group0: 1,
    group1: 1,
    group2: 1,
    group3: 1,
    group4: 2,
    group5: 3,
  };

  const ColFirstLayout = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 7,
    group5: 5,
  };

  const ColSecondLayout = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 3,
    group5: 3,
  };

  return (
    <>
      <Grid
        item
        columns={ColFirstLayout}
        startOffset={gridOffset}
        as="main"
        role="main"
      >
        {firstColItems}
      </Grid>
      <Grid item columns={ColSecondLayout}>
        {secondColItems}
      </Grid>
    </>
  );
};

TwoColumnLayout.propTypes = {
  firstColItems: node.isRequired,
  secondColItems: node.isRequired,
};

export default Grid;
