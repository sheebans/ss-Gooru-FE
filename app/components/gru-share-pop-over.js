import Ember from 'ember';
const { get, set } = Ember;
export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  tagName: 'button',
  classNames:'btn btn-default btn-icon gru-share-pop-over',
  attributeBindings: ['dataToggle:data-toggle'],
  dataToggle:'popover',
  placement: 'bottom',
  translation: 'test',
  type:null,
  clipboardEvents: ['success', 'error'],

  template: Ember.computed('i18n', function() {
   return `<div class="gru-share-pop-over-content">
    <p>`+this.get('i18n').t('gru-share-pop-over.share'+this.get('type')).string+`</p>
    <div class="share-actions">
      <input id="`+this.get('type')+`-popover" value="`+window.location.href+`" readonly type="text">
      <input type="button" data-clipboard-target="#`+this.get('type')+`-popover" class="btn btn-primary copy-btn" value="`+this.get('i18n').t('gru-share-pop-over.copy').string+`">
    </div>
   </div>`;
 }),

  didInsertElement: function () {
    var component = this;

    component.$().popover({
      animation: false,
      placement: component.get('placement'),
      html: true,
      template:`
      <div class="gru-share-pop-over-window popover" role="tooltip">
        <div class="arrow"></div>
        <h3 class="popover-title"></h3>
        <div class="popover-content"></div>
      </div>`,
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

  willDestroyElement: function () {
    this.$().popover('destroy');
  }


});
