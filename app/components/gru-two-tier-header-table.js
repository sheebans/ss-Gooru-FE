import Ember from 'ember';

// Private variables
// Stores the current number of second tier headers that are visible
var currentVisibleHeadersLen = 0;

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-two-tier-header-table'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:selectFirstTierColHeader
     * @param {string} headerId
     */
    selectFirstTierColHeader: function (headerId) {
      this.get('onSelectFirstTierHeader')(headerId);
    },

    /**
     * @function actions:selectSecondTierColHeader
     * @param {string} firstTierHeaderId
     * @param {string} secondTierHeaderId
     */
    selectSecondTierColHeader: function (firstTierHeaderId, secondTierHeaderId) {
      this.get('onSelectSecondTierHeader')(firstTierHeaderId, secondTierHeaderId);
    },

    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    selectRowHeader: function (headerId) {
      this.get('onSelectRowHeader')(headerId);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function () {
    // All columns are hidden by default in the markup so the first step is to show the
    // columns set to visible in the model
    this.updateColumnVisibility();
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Object[] } firstTierHeaders - Array of objects to use as the first tier
   * headers for the table component
   *
   * Each object will consist of:
   * - label: visual representation of the header
   * - value: internal header identifier
   * They will be ordered from left to right in the table header as they appear in the array.
   */
  firstTierHeaders: null,

  onSelectFirstTierHeader: null,

  onSelectSecondTierHeader: null,

  onSelectRowHeader: null,

  /**
   * @prop { Object[] } secondTierHeaders - Second tier headers for the table component.
   * The same second tier headers will appear under each one of the first tier headers
   *
   * Each object will consist of:
   * - label: visual representation of the header
   * - value: internal header identifier
   * - visible: controls the visibility of the header?
   */
  secondTierHeaders: null,

  /**
   * @prop { Object? } rowHeadersHeader - Header for the row headers
   */
  rowHeadersHeader: null,

  /**
   * Array of objects with the information for all of the table rows
   * Objects are of the form:
   * {
   *    id: <row_id>,
   *    header: <row_label>,
   *    content: String[]
   * }
   * ... where 'content' will consist of values for each one of the
   * second tier headers
   */
  tableContent: null,

  /**
   * @prop { Number } secondTierHeadersVisible - Total number of second tier headers
   * that are visible
   */
  secondTierHeadersVisible: Ember.computed('secondTierHeaders.@each.visible', function () {
    return this.get('secondTierHeaders').filterBy('visible', true).get('length');
  }),


  // -------------------------------------------------------------------------
  // Observers

  /**
   * Update the visibility of the table columns based on the secondTierHeaders model
   *
   * @function
   * @returns {undefined}
   */
  updateColumnVisibility: Ember.observer('secondTierHeaders.@each.visible', function () {
    const secondTierHeaders = this.get('secondTierHeaders');
    const secondTierHeadersLen = secondTierHeaders.length;

    var headers = secondTierHeaders.filterBy('visible', true);
    var newVisibleHeadersLen = headers.length;
    var removeColumns = headers.length < currentVisibleHeadersLen;
    var selectors = [];
    var cssSelector;

    if (removeColumns) {
      // There are less second tier headers visible now so the class 'hidden'
      // will be added to the second tier headers that are no longer visible.
      // Otherwise, if there are more second tier headers visible now, the
      // class 'hidden' will be removed from them.
      headers = secondTierHeaders.filterBy('visible', false);
    }

    headers.forEach(function (header, index) {
      var offset = index - 1;
      var offsetStr = (offset < 0) ? offset : '+' + offset;

      selectors.push('table tr.second-tier th.' + header.value);
      selectors.push('table tr.data td:nth-child(' + secondTierHeadersLen + 'n' + offsetStr + ')');
    });
    cssSelector = selectors.join(',');

    if (removeColumns) {
      this.$(cssSelector).addClass('hidden');
    } else {
      this.$(cssSelector).removeClass('hidden');
    }

    currentVisibleHeadersLen = newVisibleHeadersLen;
  })

});
