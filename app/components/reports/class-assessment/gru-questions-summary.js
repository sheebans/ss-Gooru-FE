import Ember from 'ember';
import { GRADING_SCALE } from 'gooru-web/config/config';

/**
 * Questions summary component
 *
 * Component responsible for laying out a set of horizontal bar charts into columns.
 * If the number of columns exceeds the component's visible area, a button is shown
 * that will fire events with the intention of changing the layout to make all
 * bar charts visible.
 *
 * @module
 * @augments ember/Component
 */

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-questions-summary'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:expand
     */
    toggleView: function () {
      var isExpanded = this.get('isExpanded');
      this.set('isExpanded', !isExpanded);
    },

    /**
     * @function actions:selectQuestion
     * @param {Number} questionId
     */
    selectQuestion: function (questionId) {
      Ember.Logger.debug('Question with ID: ' + questionId + ' was selected');
    }

  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function () {
    const delay = 600;  // milliseconds
    var timer = null;

    // Get the component dimensions from the css
    Ember.run.scheduleOnce('afterRender', this, 'updateWidth');

    $(window).resize(function () {
      clearTimeout(timer);
      // The resize callback won't be processed until the resizing has stopped
      timer = setTimeout(this.updateWidth.bind(this), delay);
    }.bind(this));
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Number } visibleColumns - Number of columns of charts visible
   */
  allColumns: Ember.computed('data', 'itemsPerColumn', function () {
    return Math.ceil(this.get('data').length / this.get('itemsPerColumn'));
  }),

  /**
   * @property {boolean} isExpanded - Should all the charts be visible or not?
   */
  isExpanded: false,

  /**
   * @property {Number} itemsPerColumn - Maximum number of items per column
   */
  itemsPerColumn: 5,

  /**
   * @property {Number} itemMinWidth - Minimum width for each chart item
   */
  itemMinWidth: 200,

  /**
   * @prop { Object[] } data - Array with data objects for each one of the charts
   */
  data: null,

  /**
   * @prop { Object[] } processedData - Transform the data objects in 'data' into objects that can be consumed
   * by the template
   */
  processedData: Ember.computed('data', 'visibleColumns', function () {
    const data = this.get('data');
    const dataLen = data.length;
    const visibleIndex = this.get('visibleColumns') * this.get('itemsPerColumn');
    const correctColor = GRADING_SCALE[GRADING_SCALE.length - 1].COLOR;
    const failColor = GRADING_SCALE[0].COLOR;

    var processedData = [];

    for (let i = 0; i < dataLen; i++) {

      if (i < visibleIndex) {
        // Process only the data that will be seen; otherwise, there's no need to process the data
        let dataObj = data[i];
        let questionObj = {
          id: dataObj.id,
          data: [
            {
              color: failColor,
              percentage: Math.round(dataObj.incorrect / dataObj.total * 100)
            },
            {
              color: correctColor,
              percentage: Math.round(dataObj.correct / dataObj.total * 100)
            }
          ],
          completed: dataObj.correct + dataObj.incorrect,
          total: dataObj.total
        };

        processedData.push(questionObj);
      }
    }

    return processedData;
  }),

  showMore: Ember.computed('width', function () {
    return Math.floor(this.get('width') / this.get('itemMinWidth')) < this.get('allColumns');
  }),

  /**
   * @prop { Number } visibleColumns - Number of columns of charts visible
   */
  visibleColumns: Ember.computed('width', 'isExpanded', function () {
    // If expanded, all columns should be visible; otherwise,
    // restrict the visible columns to only those allowed by the component width
    return this.get('isExpanded') ? this.get('allColumns') :
      Math.floor(this.get('width') / this.get('itemMinWidth'));
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Update the width value of the component per the css width value
   */
  updateWidth: function () {
    var width = parseInt(this.$().css('width').split('px')[0]);
    this.set('width', width);
  }

});
