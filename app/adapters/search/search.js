import Ember from 'ember';
import ResourceModel from 'gooru-web/models/content/resource';
import QuestionModel from 'gooru-web/models/content/question';

/**
 * Adapter to support the Search for Collections, Assessments, Resources and Questions
 *
 * @typedef {Object} SearchAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/gooru-search/rest/v2/search',

  /**
   * Fetches the collections that match with the term
   *
   * @param term the term to search
   * @returns {Promise.<Collection[]>}
   */
  searchCollections: function(term) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: term,
        'flt.collectionType': 'collection',
        start: 1,
        length: 20
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the assessments that match with the term
   *
   * @param term the term to search
   * @returns {Promise.<Assessment[]>}
   */
  searchAssessments: function(term) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: term,
        'flt.collectionType': 'assessment',
        start: 1,
        length: 20
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the resources that match with the term
   *
   * @param term the term to search
   * @param formatValues the resource formatValues to filter the search
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(term, formatValues = []) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        "q": term,
        "start": 1,
        "length": 20
      }
    };
    if (Ember.isArray(formatValues) && formatValues.length > 0) {
      const formatFilters = ResourceModel.serializeAllResourceFormat(formatValues);
      options.data['flt.resourceFormat'] = formatFilters.join(',');
    }
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the questions that match with the term
   *
   * @param term the term to search
   * @param types question types to filter the search
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(term, types = []) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        "q": term,
        "start": 1,
        "length": 20,
        "flt.resourceFormat": "question"
      }
    };
    if (Ember.isArray(types) && types.length > 0) {
      const formatFilters = QuestionModel.serializeAllQuestionType(types);
      options.data['flt.questionType'] = formatFilters.join(',');
    }
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      //'Authorization': 'Token ' + this.get('session.token-api3')
      'Gooru-Session-Token': this.get('session.token-api3')
    };
  }

});
