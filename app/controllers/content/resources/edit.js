import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Controller.extend(ContentEditMixin, {
  // -------------------------------------------------------------------------
  // Properties

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
