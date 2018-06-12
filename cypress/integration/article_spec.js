import { testResponseCode } from './test-helper';

describe('News Article', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render a headline', () => {
    cy.get('h1').should('contain', 'Article Headline');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Article Headline');
  });
});

describe('Page Status', () => {
<<<<<<< HEAD
    it('should display 200', () => {
      testResponseCode('/', 200)
    })
})

describe('Renderer Status', () => {
    it('should display 200', () => {
      testResponseCode('/status', 200)
    })
})
  it('should display 200/OK', () => {
    cy.request('/status').then(response => {
      expect(response.status).to.eq(200);
    });
=======
  it('should display 200', () => {
    testResponseCode('/', 200);
  });
});

describe('Renderer Status', () => {
  it('should display 200', () => {
    testResponseCode('/status', 200);
>>>>>>> fix linting errors in storybook folder
  });
});
