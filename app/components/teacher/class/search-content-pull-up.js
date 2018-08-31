import Ember from 'ember';
import {
  SEARCH_FILTER_BY_CONTENT_TYPES,
  KEY_CODES
} from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-search-content-pull-up'],

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

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

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
  filterContentType: SEARCH_FILTER_BY_CONTENT_TYPES,

  /**
   * Maintains the search result data
   * @type {Array}
   */
  searchResults: Ember.A([]),

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the context data
   * @type {Object}
   */
  context: null,

  /**
   * Class Id extract from context
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection.standards.[]', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains the state of selected  content type for search
   * @type {String}
   */
  selectedSearchContentType: 'collection',

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
     * Event get triggered when filter by content type menu is selected
     * @param  {String} contentType
     */
    onSelectFilterBy(contentType) {
      this.set('activeContentType', contentType);
      this.loadData();
    },

    /**
     * Action get triggered when add content to DCA got clicked
     */
    onAddContentToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('selectedSearchContentType');
      let contentId = content.get('id');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType)
        .then(newContentId => {
          let date = moment().format('YYYY-MM-DD');
          let data = component.serializerSearchContent(
            content,
            newContentId,
            date
          );
          component.sendAction('addedContentToDCA', data, date);
          component.closePullUp();
        });
    },

    /**
     * Action get triggered when schedule content to DCA got clicked
     */
    onScheduleContentToDCA(content) {
      let component = this;
      let contentType = component.get('selectedSearchContentType');
      let classId = component.get('classId');
      let params = {
        content: content,
        contentType: contentType,
        classId: classId
      };
      component.set('showScheduleDca', true);
      component.set('scheduleDcaContext', params);
    },

    /**
     * Action get triggered when schedule content  added to DCA
     */
    addedScheduleContentToDCA(content, newContentId, addedDate) {
      let component = this;
      let data = component.serializerSearchContent(
        content,
        newContentId,
        addedDate
      );
      component.sendAction('addedContentToDCA', data, addedDate);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.set('activeContentType', this.get('selectedSearchContentType'));
    this.loadData();
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
      let searchText = component.$('#search-content').val();
      if (searchText.length === 0) {
        component.$('.search-input-container').removeClass('active');
      }
    });

    component.$('#search-content').on('keyup', function(e) {
      if (e.which === KEY_CODES.ENTER) {
        component.loadData();
      }
    });

    component.$('.search-icon .search').click(function() {
      let term = component.getSearchTerm();
      if (term.length > 0) {
        component.loadData();
      } else {
        component.$('.search-input-container').addClass('active');
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
    let searchText = this.$('#search-content').val();
    return searchText;
  },

  getFilters() {
    let params = {
      taxonomies: null,
      pageSize: 20
    };
    return params;
  },

  serializerSearchContent(content, contentId, date) {
    content.set('collectionType', this.get('activeContentType'));
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      collection: content
    });
  }
});
