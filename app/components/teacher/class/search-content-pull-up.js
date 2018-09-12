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
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * Session object of logged in user
   * @type {Object}
   */
  session: Ember.inject.service(),

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

  /**
   * Maintains the state of more data exists or not
   * @type {Boolean}
   */
  isMoreDataExists: false,

  /**
   * Maintains the current page number of search
   * @type {Number}
   */
  page: 0,

  /**
   * Maintains the value of default search page size.
   * @type {Number}
   */
  defaultSearchPageSize: 20,

  /**
   * Maintains the list of  menu items
   * @type {Array}
   */
  menuItems: Ember.A([
    Ember.Object.create({
      label: 'common.gooru-catalog',
      selected: true
    }),
    Ember.Object.create({
      label: 'common.myContent',
      selected: false
    })
  ]),

  /**
   * It will compute the selected menu item on changes of menu item selection or data change.
   * @type {String}
   */
  selectedMenuItem: Ember.computed('menuItems.@each.selected', function() {
    let menuItems = this.get('menuItems');
    return menuItems.findBy('selected', true);
  }),

  /**
   * Maintains the state of menu list visibility
   * @type {Boolean}
   */
  isMenuEnabled: false,

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
      let contentType = component.get('activeContentType');
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
      let contentType = component.get('activeContentType');
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
    },

    /**
     * Toggle menu list based on the recent selection of the menu.
     */
    toggleMenuList() {
      this.toggleProperty('isMenuEnabled');
    },

    /**
     * Choose the menu item
     */
    onChooseMenuItem(selectedItem) {
      let component = this;
      let menuItems = component.get('menuItems');
      menuItems.forEach(item => {
        item.set('selected', false);
        if (selectedItem.get('label') === item.get('label')) {
          item.set('selected', true);
        }
      });
      component.toggleProperty('isMenuEnabled');
      component.loadData();
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
    this.handleShowMoreData();
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
    component.$('#search-content').on('keyup', function(e) {
      if (e.which === KEY_CODES.ENTER) {
        component.loadData();
      }
    });

    component.$('.search-icon .search').click(function() {
      let term = component.getSearchTerm();
      if (term.length > 0) {
        component.loadData();
      }
    });
  },

  loadData() {
    let component = this;
    component.set('isLoading', true);
    component.set('page', 0);
    component.set('isMoreDataExists', false);

    Ember.RSVP.hash({
      searchResults: component.getSearchService()
    }).then(({ searchResults }) => {
      if (!component.isDestroyed) {
        component.set('isLoading', false);
        component.set('searchResults', searchResults);
        component.$('.search-list-container').scrollTop(0);
        if (
          searchResults &&
          searchResults.length === component.get('defaultSearchPageSize')
        ) {
          component.set('isMoreDataExists', true);
        }
      }
    });
  },

  loadMoreData() {
    let component = this;
    component.set('isLoading', true);
    let page = component.get('page') + 1;
    component.set('page', page);
    Ember.RSVP.hash({
      searchResults: component.getSearchService()
    }).then(({ searchResults }) => {
      if (!component.isDestroyed) {
        component.set('isLoading', false);
        let searchResult = component.get('searchResults');
        component.set('searchResults', searchResult.concat(searchResults));
        if (
          searchResults &&
          searchResults.length === component.get('defaultSearchPageSize')
        ) {
          component.set('isMoreDataExists', true);
        }
      }
    });
  },

  getSearchServiceByType() {
    let component = this;
    let activeContentType = component.get('activeContentType');
    let params = component.getParams();
    let term = component.getSearchTerm() ? component.getSearchTerm() : '*';
    if (activeContentType === 'collection') {
      return component.get('searchService').searchCollections(term, params);
    } else if (activeContentType === 'assessment') {
      return component.get('searchService').searchAssessments(term, params);
    }
  },

  getMyContentByType() {
    let component = this;
    let currentUserId = component.get('session.userId');
    let activeContentType = component.get('activeContentType');
    let params = component.getParams();
    let term = component.getSearchTerm();
    if (term) {
      params.searchText = term;
    }
    if (activeContentType === 'collection') {
      return component
        .get('profileService')
        .readCollections(currentUserId, params);
    } else if (activeContentType === 'assessment') {
      return component
        .get('profileService')
        .readAssessments(currentUserId, params);
    }
  },

  getSearchService() {
    let component = this;
    let searchService = null;
    let label = component.get('selectedMenuItem.label');
    if (label === 'common.myContent') {
      searchService = component.getMyContentByType();
    } else if (label === 'common.gooru-catalog') {
      searchService = component.getSearchServiceByType();
    }
    return searchService;
  },

  getSearchTerm() {
    let searchText = this.$('#search-content').val();
    return searchText;
  },

  getParams() {
    let params = {
      taxonomies: null,
      page: this.get('page'),
      pageSize: this.get('defaultSearchPageSize')
    };
    return params;
  },

  serializerSearchContent(content, contentId, date) {
    content.set('collectionType', this.get('activeContentType'));
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      collection: content,
      isActive: false
    });
  },

  handleShowMoreData() {
    let component = this;
    let container = component.$('.search-list-container');
    component.$(container).scroll(function() {
      let scrollTop = Ember.$(container).scrollTop();
      let listContainerHeight = Ember.$(container).height() + 60;
      let isScrollReachedBottom =
        scrollTop ===
        component.$(container).prop('scrollHeight') - listContainerHeight;
      if (
        isScrollReachedBottom &&
        !component.get('isLoading') &&
        component.get('isMoreDataExists')
      ) {
        component.loadMoreData();
      }
    });
  }
});
