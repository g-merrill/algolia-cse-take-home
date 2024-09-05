import ResultsPage from './components/results-page';

class SpencerAndWilliamsSearch {
  constructor({ userAcceptsCookies }) {
    this._initSearch(userAcceptsCookies);
  }

  _initSearch(userAcceptsCookies) {
    this.resultPage = new ResultsPage({ userAcceptsCookies });
  }
}

// for demo purposes, assuming user accepts cookies
const userAcceptsCookies = true;

const app = new SpencerAndWilliamsSearch({ userAcceptsCookies });

if (userAcceptsCookies) {
  // assuming there is userAuth set up on their app already, using a dummy user token for now
  const authenticatedUserToken = process.env.ALGOLIA_TEST_USER_TOKEN;
  window.aa('setAuthenticatedUserToken', authenticatedUserToken);

  window.aa('init', {
    partial: true,
    useCookie: true,
  });
}
