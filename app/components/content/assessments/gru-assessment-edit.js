import Ember from 'ember';
import CollectionEdit from 'gooru-web/components/content/collections/gru-collection-edit';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default CollectionEdit.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  aggregatedTags: Ember.computed('tempCollection.aggregatedTag.[]', function() {
    let aggregatedTags = TaxonomyTag.getTaxonomyTags(
      this.get('tempCollection.aggregatedTag'),
      false,
      false,
      true
    );
    return aggregatedTags;
  }),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'assessments', 'gru-assessment-edit'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Save Content
     */
    updateContent: function() {
      let component = this;
      let editedAssessment = component.get('tempCollection');
      let assessment = component.get('collection');
      editedAssessment.validate().then(function({ validations }) {
        if (validations.get('isValid')) {
          let imageIdPromise = new Ember.RSVP.resolve(
            editedAssessment.get('thumbnailUrl')
          );
          if (
            editedAssessment.get('thumbnailUrl') &&
            editedAssessment.get('thumbnailUrl') !==
              assessment.get('thumbnailUrl')
          ) {
            imageIdPromise = component
              .get('mediaService')
              .uploadContentFile(editedAssessment.get('thumbnailUrl'));
          }
          imageIdPromise.then(function(imageId) {
            editedAssessment.set('thumbnailUrl', imageId);
            component
              .get('assessmentService')
              .updateAssessment(editedAssessment.get('id'), editedAssessment)
              .then(function() {
                assessment.merge(editedAssessment, [
                  'title',
                  'learningObjectives',
                  'isVisibleOnProfile',
                  'thumbnailUrl',
                  'standards',
                  'audience',
                  'depthOfknowledge',
                  'centurySkills'
                ]);
                component.set('isEditing', false);
              })
              .catch(function(error) {
                var message = component
                  .get('i18n')
                  .t('common.errors.assessment-not-updated').string;
                component.get('notifications').error(message);
                Ember.Logger.error(error);
              });
          });
        }
        component.set('didValidate', true);
      });
    },

    addTag: function(taxonomyTag) {
      let tagData = taxonomyTag.get('data');
      this.get('tempCollection.aggregatedTag').removeObject(tagData);
    },

    /**
     * Save setting for visibility of collection in profile
     */
    publishToProfile: function() {
      var collectionForEditing = this.get('collection').copy();
      this.set('tempCollection', collectionForEditing);
      this.actions.updateContent.call(this);
    },
    /**
     * Initialize variables and get standards data.
     */
    initializeVariables: function() {
      let aggregatedStandards = Ember.A([]);
      let unitStandards = this.get('tempCollection.children');
      let selectedStandards = this.get('collection.standards');
      let selectedStandardCodes = Ember.A([]);
      selectedStandards.forEach(function(standardObj) {
        selectedStandardCodes.push(standardObj.code);
      });
      unitStandards.forEach(function(unitstandardObj) {
        let unitStandardTag = unitstandardObj.standards;
        unitStandardTag.forEach(function(onestandardObj) {
          if (selectedStandardCodes.length !== 0) {
            selectedStandardCodes.forEach(function(newstandardObj) {
              if (newstandardObj !== onestandardObj.code) {
                aggregatedStandards.push(onestandardObj);
              }
            });
          } else {
            aggregatedStandards.push(onestandardObj);
          }
        });
      });

      let result = aggregatedStandards.reduceRight(function(r, a) {
        r.some(function(b) {
          return a.code === b.code;
        }) || r.push(a);
        return r;
      }, []);
      this.set('tempCollection.aggregatedTag', result);
    },

    /**
     * Delete assessment
     */
    deleteItem: function() {
      const myId = this.get('session.userId');
      var model = {
        content: this.get('collection'),
        isHeaderDelete: true,
        parentName: this.get('course.title'),
        deleteMethod: function() {
          return this.get('assessmentService').deleteAssessment(
            this.get('collection')
          );
        }.bind(this),
        type: CONTENT_TYPES.ASSESSMENT,
        redirect: {
          route: 'profile.content.courses',
          params: {
            id: myId
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-delete-content',
        model,
        null,
        null,
        null,
        false
      );
    }
  },

  init: function() {
    this._super(...arguments);
    this.set('tempCollection', this.get('collection').copy());
    this.initializeVariables();
  }
});
