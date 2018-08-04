import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import {CONTENT_TYPES} from 'gooru-web/config/config';

export default Ember.Component.extend({

  classNames: ['gru-external-assessment-page'],

  didInsertElement() {
    let component = this;
    component.$('#score-value').keyup(function(event) {
      console.log('key up insert');
    });
  },

  actions: {
    onStart() {
      let component = this;
      let externalUrl = component.get('assessment.url');
      component.set('isDisableScoreEditor', false);
      component.$('.score-value').focus();
      if (externalUrl) {
        window.open(externalUrl, CONTENT_TYPES.EXTERNAL_ASSESSMENT);
      }
    },

    onSubmit() {
      let component = this;
      component.set('isScoreEntered', true);
      component.set('score', 100);
    },

    playNext() {
      let component = this;
      component.sendAction('playNext');
    }
  },

  isDisableScoreEditor: true,

  isScoreEntered: false,

  score: null,

  isValidScore: false,


  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('assessment', function() {
    let component = this;
    let standards = component.get('assessment.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  })
});
