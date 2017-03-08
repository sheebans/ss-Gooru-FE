import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-rubric-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Object[]} headerActions List of action buttons to show
   */
  headerActions: Ember.computed(function(){
    return [{
      name: 'delete',
      text: this.get('i18n').t('common.delete'),
      icon: 'delete'
    }, {
      name: 'copy',
      text: this.get('i18n').t('common.copy'),
      icon: 'content_copy'
    },{
      name: 'link',
      text: this.get('i18n').t('common.link'),
      icon: 'insert_link'
    }, {
      name: 'preview',
      text: this.get('i18n').t('common.preview'),
      icon: 'remove_red_eye'
    }];
  }),
  /**
   * @property {String} headerTitle
   */
  headerTitle: Ember.computed(function() {
    return this.get('i18n').t('common.add-rubric');
  }),

  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'information',
      text: this.get('i18n').t('common.information')
    },{
      name: 'rubric',
      text: this.get('i18n').t('common.rubric')
    }];
  }),
  /**
   * @property {String} selected Current option selected
   */
  selected: 'information'
});
