import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  pagination,
  refinementList,
} from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page.
 */
class ResultPage {
  constructor({ userAcceptsCookies }) {
    this._registerClient(userAcceptsCookies);
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * Handles creating the search client and creating an instance of instant search.
   *
   * @private
   * @returns {void}
   */
  _registerClient(userAcceptsCookies) {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: userAcceptsCookies,
    });
  }

  /**
   * Adds widgets to the Algolia instant search instance.
   *
   * @private
   * @returns {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
    ]);
  }

  /**
   * Starts instant search after widgets are registered.
   *
   * @private
   * @returns {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;
