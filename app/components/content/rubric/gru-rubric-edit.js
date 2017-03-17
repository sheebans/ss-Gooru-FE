import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import Category from 'gooru-web/models/rubric/rubric-category';


export default Ember.Component.extend(SessionMixin,{
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-rubric-edit'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Add new category
     */
    addNewCategory:function(){
      let newCategory = Category.create({});
      let categories = this.get('categories');
      categories.addObject(newCategory);
    },
    /**
     * Triggered by gru-category
     *Copy category
     */
    copyCategory: function (category,index) {
      let categories = this.get('categories');
      let newCategory = category.copy();
      categories.insertAt(index+1, newCategory);
    },
    /**
     *Triggered by gru-category
     * Delete category
     */
    deleteCategory:function(category){
      let categories = this.get('categories');
      categories.removeObject(category);
    },
    /**
     *Set if feedback is required
     */
    setFeedBack: function(){
      this.set('rubric.requiresFeedback',!this.get('rubric.requiresFeedback'));
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Category[]} Temporal categories array
   */
  categories:Ember.computed('rubric.categories.[]',function(){
    let categories = Ember.A([]);
    if(this.get('rubric.categories.length')){
      categories = this.get('rubric.categories');
    }
    return categories;
  }),
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
   * @property {Object[]} headerActions List of action buttons to show
   */
  footerActions: Ember.computed(function(){
    return [{
      name: 'cancel',
      text: this.get('i18n').t('common.cancel'),
      class: 'btn-default',
      action:  () => this.cancel()
    }, {
      name: 'save',
      text: this.get('i18n').t('common.save'),
      class: 'btn-primary',
      action: () => this.save()
    }];
  }),
  /**
   * @property {String} headerTitle
   */
  headerTitle: Ember.computed(function() {
    return this.get('i18n').t('common.create-rubric');
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
  selected: 'information',

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Cancel function for footer
   */
  cancel:function(){
    this.get('router').transitionTo('profile.content.courses', this.get('session.userData.gooruUId'));
  },
  /**
   * Save function for footer
   */
  save:function(){
    // TODO: Save rubric
    Ember.Logger.log('Save rubric');
  }
});
