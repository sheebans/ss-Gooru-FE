import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-preview-url'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} the calculated resource content height
   */
  calculatedResourceContentHeight: null,

  /**
   * @property {string} bind the height css style for the component
   */
  resourceHeight: Ember.computed('calculatedResourceContentHeight', function() {
    var height = this.get('calculatedResourceContentHeight');
    const heightString = height > 0 ? `${height}px` : '100%';
    return Ember.String.htmlSafe(`height: ${heightString}`);
  }),

  /**
   * @property {string} Resource URL
   */
  url: Ember.computed.alias('resource.url'),

  /**
   * @property {Resource} resource
   */
  resource: null,

  /**
   * The protocol the user is using to access the page (http or https)
   * @property {String}
   */
  currentProtocol: window.location.protocol,

  /**
   * The protocol for the resource url
   * @property {String}
   */
  resourceProtocol: Ember.computed('resource.url', function() {
    const httpsPattern = /^(https:\/\/)/;
    return httpsPattern.test(this.get('resource.url')) ? 'https:' : 'http:';
  })
});
