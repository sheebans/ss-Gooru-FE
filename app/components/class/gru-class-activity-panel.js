import Ember from 'ember';
import {
  formatTime,
  formatTime as formatMilliseconds,
  getAnswerResultIcon,
  getScoreString,
  getReactionIcon
} from 'gooru-web/utils/utils';
import {
  averageReaction,
  correctPercentage,
  totalTimeSpent
} from 'gooru-web/utils/question-result';
import ReportData from 'gooru-web/models/result/report-data';

/**
 * Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel', 'panel'],

  classNameBindings: [
    'visible:visibility_on:visibility_off',
    'item.isAssessment:assessment:collection',
    'item.visible:item-enabled:item-disabled',
    'item.isOnAir:on-air',
    'item.isAssessment:li-flow'
  ],

  tagName: 'li',

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),
  /**
   * @property {Ember.Service} Service to configuration properties
   */
  configurationService: Ember.inject.service('configuration'),
  assessmentResult: {},

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function changeVisibility
     */
    changeVisibility: function(classActivity) {
      this.sendAction('onChangeVisibility', classActivity);
    },
    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    selectRowHeader: function(studentId) {
      this.getMembersOnSummaryClick(studentId);
      //   var memberData = this.get('membersData')
      //                     .findBy('id', studentId);
      //   if (memberData !== undefined) {
      //       this.sendAction(
      //     'onselectRowHeader',
      //     studentId,
      //     memberData,
      //     this.get('reportData'),
      //     this.get('collection')
      //   );
      // }
    },

    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    },
    checkfilter: function(filterLabl) {
      const component = this;
      var chkVal = this.get('questionProperties').findBy(
        'value',
        filterLabl.value
      );
      if (chkVal !== undefined) {
        if (chkVal.visible) {
          Ember.set(chkVal, 'visible', false);
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', false);
          }
          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', false);
          }
        } else {
          Ember.set(chkVal, 'visible', true);
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', true);
            // Ember.$('.data th').each(function() {
            //   Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            // });
          }

          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', true);
            // Ember.$('.data th').each(function() {
            //   Ember.$(this).width(`${177  }px`); // css attribute of your <td> width:15px; i.e.
            // });
            // Ember.$('.fixedCol').each(function() {
            //   Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            // });
          }
        }
      }
    },
    /**
     * @function goLive
     */
    onReportClick: function(collectionId) {
      var dcaDate = new Date(this.get('dcaAddeddate'));
      if (dcaDate.getFullYear() === 1970) {
        dcaDate = new Date(this.get('otherAddeddate'));
      }
      var activityDate = `${dcaDate.getFullYear()}-${dcaDate.getMonth() +
        1}-${dcaDate.getDate()}`;
      this.set('activityDateVal', activityDate);
      this.set('questionProperties', this.initQuestionProperties());
      this.set('onCollectionclick', collectionId);
      this.getMembers(collectionId, activityDate);
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    var today = new Date();
    var dcaDate = new Date(this.get('dcaAddeddate'));
    if (dcaDate.getFullYear() === 1970) {
      dcaDate = new Date(this.get('otherAddeddate'));
    }
    var dcaDateDate = `${dcaDate.getFullYear()}-${dcaDate.getMonth() +
      1}-${dcaDate.getDate()}`;
    var todayDate = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    if (todayDate === dcaDateDate) {
      this.set('todayDateStatus', true);
    }
  },

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {ClassActivity}
   */
  classActivity: null,
  /**
   * The header titles
   * @property {classId}
   */

  classId: null,
  /**
   * The header titles
   * @property {members}
   */
  members: null,
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),
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
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),
  /**
   * @property {Collection/Assessment} prevItem
   */
  prevItem: null,

  /**
   * @property {string}
   */
  dcaAddeddate: Ember.computed.alias('dcadate'),
  /**
   * @property {string}
   */
  activityDateVal: null,
  /**
   * @property {string}
   */
  otherAddeddate: Ember.computed.alias('otherdate'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.activityPerformanceSummary.collectionPerformanceSummary'
  ),

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive'),
  /**
   * @property {boolean}
   */
  timevisible: true,
  /**
   * @property { ReportData } report data
   */
  reportData: [],
  userDataObj: [],
  userQuestionDataObj: [],
  /**
   * @property {boolean}
   */
  reactionvisible: true,
  /**
   * @property {boolean}
   */
  todayDateStatus: false,
  /**
   * The user performanceData
   * @property {membersData[]}
   */
  membersData: [],
  /**
   * The user performanceData
   * @property {firstTierHeaders[]}
   */
  firstTierHeaders: [],
  /**
   * @property {boolean}
   */
  isReportEnabled: false,
  /**
   * @property {string} go live action name
   */
  onCollectionclick: '',
  /**
   * @property {collection/Collection} collection
   */
  collection: null,
  /**
   * @prop { Collection } assessment
   */
  assessment: null,

  /**
   * @property {string} go live action name
   */
  onGoLive: 'goLive',

  /**
   * @property {string} changeVisibility action name
   */
  onChangeVisibility: 'changeVisibility',
  /**
   * @prop { Object[] } questionProperties - An array made up of question properties
   *
   * Each property object will consist of:
   * - filter: information to use for the corresponding filter checkbox
   * - label: visual representation of the header
   * - value: internal header identifier
   * - visible: should the property be visible or not?
   * - renderFunction: function to process values of this property for output
   * - aggregateFunction: if there's an aggregate column, this function will be
   *   used to aggregate all the values for this property that are in the same row
   * - aggregateRenderFunction: if there's an aggregate column, this function will
   *   take the result of the aggregateFunction and process it for output
   * - sortFunction: sort function for values of this property
   */
  questionProperties: null,
  /**
   * @prop { String[] } questionPropertiesIds - An array with the ids of all the question properties
   */
  questionPropertiesIds: Ember.computed('questionProperties', function() {
    return this.get('questionProperties').map(function(questionProperty) {
      return questionProperty.value;
    });
  }),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),
  /**
   * Initialize the question properties array with values -including i18n labels
   * @return {Object[]}
   */
  initQuestionProperties: function() {
    const component = this;
    return [
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.scores').string,
          disabled: true
        },
        label: this.get('i18n').t('reports.gru-table-view.score').string,
        value: 'correct',
        visible: true,
        renderFunction: getAnswerResultIcon,
        aggregateFunction: correctPercentage,
        aggregateRenderFunction: getScoreString
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.study-time').string
        },
        label: this.get('i18n').t('reports.gru-table-view.time').string,
        value: 'timeSpent',
        visible: true,
        renderFunction: formatTime,
        aggregateFunction: totalTimeSpent
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.reactions').string
        },
        label: this.get('i18n').t('reports.gru-table-view.reaction').string,
        value: 'reaction',
        visible: true,
        renderFunction: function(value) {
          const appRootPath = component.get('appRootPath');
          return getReactionIcon(value, appRootPath);
        },
        aggregateFunction: averageReaction
      })
    ];
  },
  getMembers: function(collectionId, activityDate) {
    const component = this;
    component.sendAction('onReportclick');
    const classId = component.get('classId');
    const members = component.get('members');
    var itemVal = component.get('item');
    Ember.set(itemVal, 'isReportEnabled', component.get('isReportEnabled'));
    if (component.get('isReportEnabled')) {
      component.set('isReportEnabled', false);
      Ember.set(itemVal, 'isReportEnabled', component.get('isReportEnabled'));
    } else {
      component.set('membersData', members);
      component
        .get('collectionService')
        .readPerformanceData(classId, collectionId, activityDate)
        .then(function(result1) {
          component.set('userQuestionDataObj', result1);
          component
            .get('assessmentService')
            .readAssessment(collectionId)
            .then(function(collection) {
              component.set('firstTierHeaders', collection.children);
              members.forEach(function(item1) {
                var memberDataobj = result1.content.findBy('userUid', item1.id);
                if (memberDataobj !== undefined) {
                  Ember.set(
                    item1,
                    'avgScore',
                    memberDataobj.usageData.get(0).assessment.score
                  );
                  Ember.set(
                    item1,
                    'avgTime',
                    formatMilliseconds(
                      memberDataobj.usageData.get(0).assessment.timeSpent
                    )
                  );
                  Ember.set(
                    item1,
                    'avgReact',
                    memberDataobj.usageData.get(0).assessment.reaction
                  );
                } else {
                  Ember.set(item1, 'avgScore', 0);
                  Ember.set(item1, 'avgTime', '--');
                  Ember.set(item1, 'avgReact', '--');
                }

                Ember.set(item1, 'resultResources', collection.children);
                Ember.set(item1, 'content', []);
              });
              component.set('isReportEnabled', true);
              Ember.set(
                itemVal,
                'isReportEnabled',
                component.get('isReportEnabled')
              );
              component.set('collection', collection);
              component.set('collection.children', collection.children);
              component.set('userDataObj', []);
              if (result1.content.length > 0) {
                result1.content.forEach(function(item1) {
                  var memberData = members.findBy('id', item1.userUid);
                  if (memberData !== undefined) {
                    if (memberData.id === item1.userUid) {
                      collection.children.forEach(function(item2) {
                        var usageDataQId = item1.usageData
                          .get(0)
                          .questions.findBy('questionId', item2.id);
                        if (
                          usageDataQId !== undefined &&
                          usageDataQId.questionId === item2.id
                        ) {
                          Ember.set(item2, 'score', usageDataQId.score);
                          Ember.set(
                            item2,
                            'timeSpent',
                            formatMilliseconds(usageDataQId.timeSpent)
                          );
                          Ember.set(item2, 'reaction', usageDataQId.reaction);
                          Ember.set(
                            item2,
                            'questionType',
                            usageDataQId.questionType
                          );
                        }
                      });
                      Ember.set(memberData, 'content', collection.children);
                      Ember.set(memberData, 'resultResources', []);
                    }
                  }
                });
              }
            });
        });
    }
  },
  getMembersOnSummaryClick: function(studentId) {
    const component = this;
    const classId = component.get('classId');
    const members = component.get('members');
    const collection = component.get('collection');
    const contentObj = component.get('userQuestionDataObj');
    component.set('membersData', members);
    var sessionId = '';
    contentObj.content.forEach(function(itemNew) {
      sessionId = itemNew.usageData.get(0).assessment.sessionId;
    });
    collection.children.forEach(function(resourceobj) {
      Ember.set(resourceobj, 'resourceId', resourceobj.id);
      Ember.set(resourceobj, 'questionId', resourceobj.id);
      Ember.set(resourceobj, 'answerObject', null);
      Ember.set(resourceobj, 'userAnswer', null);
      Ember.set(resourceobj, 'resourceType', null);
    });
    component.set('userDataObj', []);
    contentObj.content.forEach(function(item1) {
      var memberData = members.findBy('id', item1.userUid);
      if (memberData !== undefined) {
        if (memberData.id === item1.userUid) {
          if (sessionId !== '') {
            component
              .get('analyticsService')
              .findResourcesByCollectionforDCA(
                sessionId,
                collection.id,
                classId,
                memberData.id,
                'assessment',
                component.get('activityDateVal')
              )
              .then(function(resultSession) {
                Ember.merge(
                  memberData,
                  'resultResources',
                  resultSession[0].resourceResults
                );
                resultSession[0].resourceResults.forEach(function(
                  resource1obj
                ) {
                  collection.children.forEach(function(resource2obj) {
                    if (resource2obj.resourceId === resource1obj.resourceId) {
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
                      Ember.set(resource2obj, 'correct', resource1obj.correct);
                    }
                  });
                });
                const reportData1 = ReportData.create({
                  students: members,
                  resources: collection.children
                });
                let resourceResultdata = resultSession[0].resourceResults;
                resourceResultdata.forEach(function(resourceResultdataobj) {
                  if (reportData1.data[memberData.id]) {
                    const questionId = Ember.get(
                      resourceResultdataobj,
                      'resourceId'
                    );

                    if (reportData1.data[memberData.id][questionId]) {
                      //if there are several attempts for the same resource the time spent should be added
                      const totalTimeSpent =
                        Ember.get(resourceResultdataobj, 'timeSpent') +
                        Ember.get(
                          reportData1.data[memberData.id][questionId],
                          'timeSpent'
                        );
                      Ember.set(
                        resourceResultdataobj,
                        'timeSpent',
                        totalTimeSpent
                      );
                      Ember.set(resourceResultdataobj, 'isGraded', null);
                      Ember.set(resourceResultdataobj, 'submittedAnswer', null);
                      Ember.set(
                        resourceResultdataobj,
                        'questionType',
                        resourceResultdataobj.type
                      );
                    }
                    reportData1.data[memberData.id][
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
                  component.get('collection')
                );
              });
          }
        }
      }
    });
  }
});
