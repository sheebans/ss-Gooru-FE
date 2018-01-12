import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import ReportData from 'gooru-web/models/result/report-data';

/**
 * Student Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-student-class-activity-panel', 'panel'],

  classNameBindings: [
    'visible:visibility-on:visibility-off',
    'item.isAssessment:assessment:collection'
  ],

  tagName: 'li',

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),
  /**
   * @type AnalyticsService
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @property {Ember.Service} session service
   */
  session: Ember.inject.service('session'),

  /**
   * @property {string}
   */
  activityDateVal: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function externalAssessment open new tab from DCA
     */
    externalAssessment: function(classActivity) {
      let url = classActivity.collection.get('url');
      if (url) {
        window.open(url);
      }
    },
    /**
     * @function onReportClick
     */
    onReportClick: function(studentId, assessment) {
      this.getMembersOnSummaryClick(studentId, assessment);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {ClassActivity}
   */
  classActivity: null,
  /**
   * @property {Class}
   */
  class: null,
  /**
   * @property {member}
   */
  members: null,
  membersData: null,
  /**
   * @property {boolean}
   */
  isReportEnabled: false,
  /**
   * @property {string} go live action name
   */
  onCollectionclick: '',

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.activityPerformanceSummary.collectionPerformanceSummary'
  ),
  /**
   * @property {String} source
   */
  source: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive'),

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },
  getMembersOnSummaryClick: function(studentId, collection) {
    const component = this;
    studentId = component.get('session.userId');
    const classId = component.get('class.id');
    var members = component.get('members');
    var dcaDate = new Date(component.get('classActivity.date'));
    var activityDate = `${dcaDate.getFullYear()}-${dcaDate.getMonth() +
      1}-${dcaDate.getDate()}`;
    if (collection.collectionType === 'assessment') {
      component
        .get('assessmentService')
        .readAssessmentDCA(collection.id, collection.collectionType)
        .then(function(collection1) {
          component.set('membersData', members);
          collection1.children.forEach(function(resourceobj) {
            Ember.set(resourceobj, 'resourceId', resourceobj.id);
            Ember.set(resourceobj, 'questionId', resourceobj.id);
            Ember.set(resourceobj, 'answerObject', null);
            Ember.set(resourceobj, 'userAnswer', null);
            Ember.set(resourceobj, 'resourceType', null);
          });

          members.forEach(function(item1) {
            Ember.set(item1, 'resultResources', collection1.children);
          });
          var memberData = members.findBy('id', studentId);
          if (memberData !== undefined) {
            if (
              component.get('collectionPerformanceSummary.sessionId') !==
              undefined
            ) {
              component
                .get('analyticsService')
                .findResourcesByCollectionforDCA(
                  component.get('collectionPerformanceSummary.sessionId'),
                  collection1.id,
                  classId,
                  studentId,
                  collection1.collectionType,
                  activityDate
                )
                .then(function(resultSession) {
                  if (resultSession !== undefined && resultSession.length > 0) {
                    resultSession[0].resourceResults.forEach(function(
                      resource1obj
                    ) {
                      collection1.children.forEach(function(resource2obj) {
                        if (
                          resource2obj.resourceId === resource1obj.resourceId
                        ) {
                          Ember.set(
                            resource2obj,
                            'answerObject',
                            resource1obj.answerObject
                          );
                          Ember.set(
                            resource2obj,
                            'questionId',
                            resource1obj.resourceId
                          );
                          Ember.set(
                            resource2obj,
                            'userAnswer',
                            resource1obj.userAnswer
                          );
                          Ember.set(
                            resource2obj,
                            'resourceType',
                            resource1obj.resourceType
                          );
                          Ember.set(
                            resource2obj,
                            'correct',
                            resource1obj.correct
                          );
                        }
                      });
                    });
                    const reportData1 = ReportData.create({
                      students: members,
                      resources: collection1.children
                    });
                    let resourceResultdata = resultSession[0].resourceResults;
                    resourceResultdata.forEach(function(resourceResultdataobj) {
                      if (reportData1.data[studentId]) {
                        const questionId = Ember.get(
                          resourceResultdataobj,
                          'resourceId'
                        );
                        if (reportData1.data[studentId][questionId]) {
                          //if there are several attempts for the same resource the time spent should be added
                          const totalTimeSpent =
                            Ember.get(resourceResultdataobj, 'timeSpent') +
                            Ember.get(
                              reportData1.data[studentId][questionId],
                              'timeSpent'
                            );
                          Ember.set(
                            resourceResultdataobj,
                            'timeSpent',
                            totalTimeSpent
                          );
                          Ember.set(resourceResultdataobj, 'isGraded', null);
                          Ember.set(
                            resourceResultdataobj,
                            'submittedAnswer',
                            null
                          );
                          Ember.set(
                            resourceResultdataobj,
                            'questionType',
                            resourceResultdataobj.type
                          );
                        }
                        reportData1.data[studentId][
                          questionId
                        ] = resourceResultdataobj;
                      }
                    });
                    component.set('reportData', reportData1);
                    component.set('students', members);
                    component.sendAction(
                      'onselectRowHeader',
                      studentId,
                      memberData,
                      component.get('reportData'),
                      collection1
                    );
                  }
                });
            }
          }
        });
    } else {
      component
        .get('collectionService')
        .readCollection(collection.id)
        .then(function(collection1) {
          component.set('membersData', members);
          collection1.children.forEach(function(resourceobj) {
            Ember.set(resourceobj, 'resourceId', resourceobj.id);
            Ember.set(resourceobj, 'questionId', resourceobj.id);
            Ember.set(resourceobj, 'answerObject', null);
            Ember.set(resourceobj, 'userAnswer', null);
            Ember.set(resourceobj, 'resourceType', null);
          });

          Ember.Logger.info(
            'info---',
            component.get('collectionPerformanceSummary.sessionId')
          );

          members.forEach(function(item1) {
            Ember.set(item1, 'resultResources', collection1.children);
          });
          var memberData = members.findBy('id', studentId);
          if (memberData !== undefined) {
            if (
              component.get('collectionPerformanceSummary.sessionId') !==
              undefined
            ) {
              component
                .get('analyticsService')
                .findResourcesByCollectionforDCA(
                  component.get('collectionPerformanceSummary.sessionId'),
                  collection1.id,
                  classId,
                  studentId,
                  collection1.collectionType,
                  activityDate
                )
                .then(function(resultSession) {
                  if (resultSession !== undefined && resultSession.length > 0) {
                    resultSession[0].resourceResults.forEach(function(
                      resource1obj
                    ) {
                      collection1.children.forEach(function(resource2obj) {
                        if (
                          resource2obj.resourceId === resource1obj.resourceId
                        ) {
                          Ember.set(
                            resource2obj,
                            'answerObject',
                            resource1obj.answerObject
                          );
                          Ember.set(
                            resource2obj,
                            'questionId',
                            resource1obj.resourceId
                          );
                          Ember.set(
                            resource2obj,
                            'userAnswer',
                            resource1obj.userAnswer
                          );
                          Ember.set(
                            resource2obj,
                            'resourceType',
                            resource1obj.resourceType
                          );
                          Ember.set(
                            resource2obj,
                            'correct',
                            resource1obj.correct
                          );
                        }
                      });
                    });
                    const reportData1 = ReportData.create({
                      students: members,
                      resources: collection1.children
                    });
                    let resourceResultdata = resultSession[0].resourceResults;
                    resourceResultdata.forEach(function(resourceResultdataobj) {
                      if (reportData1.data[studentId]) {
                        const questionId = Ember.get(
                          resourceResultdataobj,
                          'resourceId'
                        );
                        if (reportData1.data[studentId][questionId]) {
                          //if there are several attempts for the same resource the time spent should be added
                          const totalTimeSpent =
                            Ember.get(resourceResultdataobj, 'timeSpent') +
                            Ember.get(
                              reportData1.data[studentId][questionId],
                              'timeSpent'
                            );
                          Ember.set(
                            resourceResultdataobj,
                            'timeSpent',
                            totalTimeSpent
                          );
                          Ember.set(resourceResultdataobj, 'isGraded', null);
                          Ember.set(
                            resourceResultdataobj,
                            'submittedAnswer',
                            null
                          );
                          Ember.set(
                            resourceResultdataobj,
                            'questionType',
                            resourceResultdataobj.type
                          );
                        }
                        reportData1.data[studentId][
                          questionId
                        ] = resourceResultdataobj;
                      }
                    });
                    component.set('reportData', reportData1);
                    component.set('students', members);
                    component.sendAction(
                      'onselectRowHeader',
                      studentId,
                      memberData,
                      component.get('reportData'),
                      collection1
                    );
                  }
                });
            }
          }
        });
    }
    // }
    //});
  }
});
