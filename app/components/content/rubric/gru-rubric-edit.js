import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import Category from 'gooru-web/models/rubric/rubric-category';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import ModalMixin from 'gooru-web/mixins/modal';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import {EDUCATION_CATEGORY} from 'gooru-web/config/config';

export default Ember.Component.extend(SessionMixin,ModalMixin,{
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
    },
    /**
     *
     * @param {TaxonomyRoot} subject
     */
    selectSubject: function(subject){
      this.set('selectedSubject', subject);
    },
    /**
     *SelectCategory
     * @param {String} category
     */
    selectCategory: function(category){
      var standardLabel = (category === EDUCATION_CATEGORY.value);
      this.set('standardLabel', !standardLabel);
    },
    /**
     * Remove tag data from the taxonomy list in tempUnit
     */
    removeTag: function (taxonomyTag) {
      var tagData = taxonomyTag.get('data');
      this.get('rubric.standards').removeObject(tagData);
    },
    /**
     * Open taxonomy modal
     */
    openTaxonomyModal: function(){
      this.openTaxonomyModal();
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
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  editableTags: Ember.computed('rubric.standards.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get('rubric.standards'), false, true);
  }),
  /**
   *
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
    return this.get('i18n').t('common.create-rubric');
  }),
  /**
   * @property {Boolean} isEditing
   */
  isEditing:true,

  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'information',
      text: this.get('i18n').t('common.information')
    },{
      name: 'rubric',
      text: this.get('i18n').t('common.rubric-creation')
    }];
  }),
  /**
   * @property {String} selected Current option selected
   */
  selected: 'information',
  /**
   * @property {TaxonomyRoot}
   */
  selectedSubject: null,
  /**
   * @property {boolean}
   */
  standardDisabled: Ember.computed.not('selectedSubject'),
  /**
   * @property {boolean}
   */
  standardLabel: true,
  /**
   * i18n key for the standard/competency dropdown label
   * @property {string}
   */
  standardLabelKey: Ember.computed('standardLabel', function(){
    return this.get('standardLabel') ? 'common.standards' : 'common.competencies';
  }),

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
  },
  /**
   * Open Taxonomy Modal
   */
  openTaxonomyModal: function(){
    var component = this;
    var standards = component.get('rubric.standards') || [];
    var subject = component.get('selectedSubject');
    var subjectStandards = TaxonomyTagData.filterBySubject(subject, standards);
    var notInSubjectStandards = TaxonomyTagData.filterByNotInSubject(subject, standards);
    var model = {
      selected: subjectStandards,
      shortcuts: null,  // TODO: TBD
      subject: subject,
      standardLabel: component.get('standardLabel'),
      callback: {
        success: function(selectedTags) {
          var dataTags = selectedTags.map(function(taxonomyTag) {
            return taxonomyTag.get('data');
          });
          const standards = Ember.A(dataTags);
          standards.pushObjects(notInSubjectStandards.toArray());
          component.set('rubric.standards', standards);
        }
      }
    };

    this.actions.showModal.call(this, 'taxonomy.modals.gru-standard-picker', model, null, 'gru-standard-picker');
  }
});
