import Ember from 'ember';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { TAXONOMY_LEVELS } from 'gooru-web/config/config';

/**
 * Serializer for Taxonomy endpoints
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * Normalize the Fetch Taxonomy Subjects endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Subject[]} an array of subjects
   */
  normalizeFetchSubjects: function(payload) {
    var result = [];
    const serializer = this;
    const subjects = payload.subjects;
    if (Ember.isArray(subjects)) {
      result = subjects.map(function(subject) {
        return serializer.normalizeSubject(subject);
      });
    }
    return result;
  },

  normalizeSubject: function(subjectPayload) {
    var serializer = this;
    return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
      id: subjectPayload.id,
      frameworkId: subjectPayload['standard_framework_id'],
      title: subjectPayload.title,
      subjectTitle: subjectPayload.title,
      code: subjectPayload.code,
      frameworks: serializer.normalizeFrameworks(subjectPayload.frameworks, subjectPayload.title)
    });
  },

  normalizeFrameworks: function(frameworksPayload, parentTitle) {
    var frameworks = [];
    const serializer = this;
    if (frameworksPayload && Ember.isArray(frameworksPayload)) {
      frameworks = frameworksPayload.map(function(framework) {
        return serializer.normalizeFramework(framework, parentTitle);
      });
    }
    return frameworks;
  },

  normalizeFramework: function(subjectPayload, parentTitle) {
    const serializer = this;
    return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
      id: subjectPayload['taxonomy_subject_id'],
      frameworkId: subjectPayload['standard_framework_id'],
      title: subjectPayload.title,
      subjectTitle: `${subjectPayload['standard_framework_id']} ${parentTitle}`
    });
  },

  /**
   * Normalize the Fetch Taxonomy Courses endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]} an array of courses
   */
  normalizeFetchCourses: function(payload) {
    var result = [];
    const serializer = this;
    const courses = payload.courses;
    if (Ember.isArray(courses)) {
      result = courses.map(function(course) {
        return serializer.normalizeCourse(course);
      });
    }
    return result;
  },

  normalizeCourse: function(coursePayload) {
    var serializer = this;
    return TaxonomyItem.create(Ember.getOwner(serializer).ownerInjection(), {
      id: coursePayload.id,
      code: coursePayload.code,
      title: coursePayload.title
    });
  },

  /**
   * Normalize the Fetch Taxonomy Domains endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]} an array of domains
   */
  normalizeFetchDomains: function(payload) {
    var result = [];
    const serializer = this;
    const domains = payload.domains;
    if (Ember.isArray(domains)) {
      result = domains.map(function(domain) {
        return serializer.normalizeDomain(domain);
      });
    }
    return result;
  },

  normalizeDomain: function(domainPayload) {
    var serializer = this;
    return TaxonomyItem.create(Ember.getOwner(serializer).ownerInjection(), {
      id: domainPayload.id,
      code: domainPayload.code,
      title: domainPayload.title
    });
  },

  /**
   * Normalize the Fetch Taxonomy Codes endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]} an array of codes
   */
  normalizeFetchCodes: function(payload) {
    var result = [];
    const serializer = this;
    const codes = payload.codes;
    if (Ember.isArray(codes)) {
      result = codes.map(function(code) {
        return serializer.normalizeCode(code);
      });
    }
    return result;
  },

  normalizeCode: function(codePayload) {
    var serializer = this;
    return TaxonomyItem.create(Ember.getOwner(serializer).ownerInjection(), {
      id: codePayload.id,
      code: codePayload.code,
      title: codePayload.title,
      parentTaxonomyCodeId: codePayload['parent_taxonomy_code_id'],
      codeType: codePayload['code_type']
    });
  },

  /**
   * Serialize a TaxonomyTagData object into a JSON representation required by a core element (course|unit|collection|assessment|resource|question)
   *
   * @param taxonomyData the taxonomyData object
   * @returns {Object} a JSON Object
   */
  serializeTaxonomy: function(taxonomyData) {
    var taxonomyResult = {};
    if (taxonomyData && Ember.isArray((taxonomyData))) {
      taxonomyData.forEach(function (taxonomy) {
        const taxonomyKey = taxonomy.get('id');
        taxonomyResult[taxonomyKey] = {
          code: taxonomy.get('code'),
          title: taxonomy.get('title'),
          'parent_title': taxonomy.get('parentTitle'),
          description: taxonomy.get('description'),
          'framework_code': taxonomy.get('frameworkCode')
        };
      });
    }
    return taxonomyResult;
  },

  /**
   * Normalize the core element taxonomy data into a TaxonomyTagData object
   *
   * @param taxonomyPayload the taxonomy data in JSON format
   * @param level taxonomy level
   * @returns {TaxonomyTagData[]} a TaxonomyTagData array
   */
  normalizeTaxonomy: function(taxonomyPayload, level = TAXONOMY_LEVELS.STANDARD) {
    var taxonomyData = [];
    if (taxonomyPayload) {
      for (var key in taxonomyPayload) {
        if (taxonomyPayload.hasOwnProperty(key)) {
          var taxonomy = taxonomyPayload[key];
          taxonomyData.push(TaxonomyTagData.create({
            id: key,
            code: taxonomy.code,
            title: taxonomy.title,
            parentTitle: taxonomy['parent_title'],
            description: taxonomy.description ? taxonomy.description : '',
            frameworkCode: taxonomy['framework_code'],
            taxonomyLevel: level
          }));
        }
      }
    }
    return taxonomyData;
  }

});