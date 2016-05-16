import Ember from 'ember';
const { get, set } = Ember;
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  tagName: 'button',
  classNames:'btn btn-default btn-icon gru-share-pop-over',
  attributeBindings: ['dataToggle:data-toggle'],
  dataToggle:'popover',
  placement: 'bottom',

  clipboardEvents: ['success', 'error'],

  // -------------------------------------------------------------------------
  // Properties


  /**
   * @property {string} type
   */
  type:null,


  /**
   * @property {string} type
   */
  url:null,


  /**
   * @property {string} template to be used for the popover window
   */
  template: Ember.computed('type', function() {
   return `<div class="gru-share-pop-over-content">
    <p>`+this.get('i18n').t('gru-share-pop-over.share-'+this.get('type')).string+`</p>
    <div class="share-actions">
      <input id="`+this.get('type')+`-popover-input" value="`+this.get('shareUrl')+`" readonly type="text">
      <input type="button" data-clipboard-target="#`+this.get('type')+`-popover-input" class="btn btn-primary copy-btn" value="`+this.get('i18n').t('gru-share-pop-over.copy').string+`">
    </div>
   </div>`;
 }),

  shareUrl: Ember.computed('type', function(){
    switch(this.get('type')) {
      case 'course':
        const courseId = this.get('router.router.state.params')['content.courses.edit'].courseId;
        return window.location.protocol+ `//`+ window.location.host+`/content/courses/play/`+courseId;
        break;
      case 'assessment':
        break;
      case 'collection':
        break;
      default:
      break;
    };
  }),

  // -------------------------------------------------------------------------
  // Methods

  getTemplate: function(){
    return `<div class="gru-share-pop-over-window popover" role="tooltip">
      <div class="arrow"></div>
      <h3 class="popover-title"></h3>
      <div class="popover-content"></div>
    </div>`
},

 // -------------------------------------------------------------------------
 // Events

 /**
  * Overwrites didInsertElement hook to add clipboard and popover functionality
  */

  didInsertElement: function () {
    var component = this;
    component.$().popover({
      animation: false,
      placement: component.get('placement'),
      html: true,
      template:component.get('getTemplate')(),
      content: function() {
          return component.get('template');
        }
    });
    let clipboard = new Clipboard('.copy-btn');
    set(this, 'clipboard', clipboard);

    get(this, 'clipboardEvents').forEach(action => {
      clipboard.on(action, Ember.run.bind(this, function(e) {
        try {
          this.sendAction(action, e);
        }
        catch(error) {
          Ember.Logger.debug(error.message);
        }
      }));
    });

  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * Overwrites willDestroyElement hook. Destroys popover instance
   */
  willDestroyElement: function () {
    this.$().popover('destroy');
  }


});
