import Ember from 'ember';
import {
  SUGGESTION_FILTER_BY_CONTENT_TYPES,
  KEY_CODES
} from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['teacher-suggestion-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:api-sdk/navigate-map
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Maintains the state of active content type (C/A/R/Q), default collection
   * @type {String}
   */
  activeContentType: 'collection',

  /**
   * Allowed filter content types
   * @type {Array}
   */
  filterContentType: SUGGESTION_FILTER_BY_CONTENT_TYPES,

  /**
   * Maintains maximum number of search results
   * @type {Number}
   */
  maxSearchResult: 6,

  /**
   * Maintains the search result data
   * @type {Array}
   */
  searchResults: null,

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains list of students selected for  suggest
   * @type {Array}
   */
  students: Ember.A([]),

  /**
   * Maintains  suggest confirmation state
   * @type {Boolean}
   */
  showSuggestConfirmation: false,

  /**
   * Suggest selected collection
   * @type {Collection}
   */
  suggestSelectedCollection: null,

  /**
   * Maintains the context data
   * @type {Object}
   */
  context: null,

  /**
   * Collection details
   * @type {Collection}
   */
  collection: null,

  // -------------------------------------------------------------------------
  // actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Evengt get triggered when filter by content type menu is selected
     * @param  {String} contentType
     */
    onSelectFilterBy(contentType) {
      this.set('activeContentType', contentType);
      this.loadData();
    },

    /**
     * Action get triggered when add suggest icon got clicked
     */
    onSuggestCollection(collection) {
      this.set('suggestSelectedCollection', collection);
      this.set('showSuggestConfirmation', true);
    },

    /**
     * Trigger when cancel suggest  popup
     */
    onCancelSuggest() {
      this.set('showSuggestConfirmation', false);
    },

    /**
     * Trigger when confirm suggest  popup
     */
    onConfirmSuggest() {
      let component = this;
      let collection = this.get('suggestSelectedCollection');
      let userIds = this.get('students').map(student => {
        return student.get('id');
      });
      let contextParams = {
        ctx_user_ids: userIds,
        ctx_class_id: component.get('context.classId'),
        ctx_course_id: component.get('context.courseId'),
        ctx_unit_id: component.get('context.unitId'),
        ctx_lesson_id: component.get('context.lessonId'),
        ctx_collection_id: component.get('collection.id'),
        suggested_content_id: collection.get('id'),
        suggested_content_type: component.get('activeContentType')
      };
      component
        .get('navigateMapService')
        .teacherSuggestions(contextParams)
        .then(() => {
          component.set('students', Ember.A([]));
          component.set('showSuggestConfirmation', false);
          component.set('showPullUp', false);
          component.sendAction('onCloseSuggest');
        });
    },

    onClickSearch() {
      let component = this;
      component.$('.search-input-container').addClass('active');
      let term = component.getSearchTerm();
      if (term.length > 0) {
        component.loadData();
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.handleSearchBar();
  },

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  handleSearchBar() {
    let component = this;
    component.$('.search-input-container').mouseleave(function() {
      let searchText = component.$('#suggestion-search').val();
      if (searchText.length === 0) {
        component.$('.search-input-container').removeClass('active');
      }
    });

    component.$('#suggestion-search').on('keyup', function(e) {
      if (e.which === KEY_CODES.ENTER) {
        component.loadData();
      }
    });
  },

  loadData() {
    let component = this;
    component.set('isLoading', true);
    Ember.RSVP.hash({
      searchResults: component.getSearchServiceByType()
    }).then(({ searchResults }) => {
      component.set('isLoading', false);
      component.set('searchResults', searchResults);
    });
  },

  getSearchServiceByType() {
    let component = this;
    let activeContentType = component.get('activeContentType');
    let filters = component.getFilters();
    let term = component.getSearchTerm() ? component.getSearchTerm() : '*';
    if (activeContentType === 'collection') {
      return component.get('searchService').searchCollections(term, filters);
    } else if (activeContentType === 'assessment') {
      return component.get('searchService').searchAssessments(term, filters);
    }
  },

  getSearchTerm() {
    let searchText = this.$('#suggestion-search').val();
    return searchText;
  },

  getFilters() {
    let component = this;
    let maxSearchResult = component.get('maxSearchResult');
    let params = {
      taxonomies: null,
      pageSize: maxSearchResult
    };
    return params;
  }
});
