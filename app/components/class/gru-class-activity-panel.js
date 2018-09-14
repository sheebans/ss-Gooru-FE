import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user play collection
     */
    onPlayContent(content) {
      let contentId = content.get('id');
      let collectionType = content.get('collectionType');
      let url = content.get('url');
      if (collectionType === 'assessment-external') {
        window.open(url, '_top');
      } else {
        this.get('router').transitionTo('player', contentId, {
          queryParams: {
            role: 'teacher',
            type: collectionType
          }
        });
      }
    },

    /**
     * Action will trigger to open teacher dca content report.
     * @param  {Object} collection
     */
    openDcaContentReport(selectedClassActivity) {
      this.sendAction('openDcaContentReport', selectedClassActivity);
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    },

    /**
     * @function changeVisibility
     */
    changeVisibility: function() {
      let classActivity = this.get('classActivity');
      this.sendAction('onChangeVisibility', classActivity.get('id'));
    },

    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    },

    /**
     * Action get triggered when add content to DCA got clicked
     */
    onAddContentToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType = content.get('collectionType');
      let contentId = content.get('id');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType)
        .then(newContentId => {
          if (!component.isDestroyed) {
            let date = moment().format('YYYY-MM-DD');
            let data = Ember.Object.create({
              id: newContentId,
              added_date: date,
              collection: content,
              isActive: false,
              isAddedFromPanel: true
            });
            component.sendAction('addedContentToDCA', data, date);
          }
        });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.collection.performance'
  ),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),

  /**
   * Maintains the flag to show go live or not
   * @type {Boolean}
   */
  showGolive: false,

  /**
   * Maintains the flag to show remove content button or not.
   * @type {Boolean}
   */
  showDcaRemoveButton: false,

  /**
   * Maintains the flag to show assign button or not.
   * @type {Boolean}
   */
  showDcaAssignButton: false,

  /**
   * Maintains the flag to show add dca content button or not.
   * @type {Boolean}
   */
  showDcaAddButton: false
});
