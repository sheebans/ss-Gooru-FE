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
import { getQuestionUtil } from 'gooru-web/config/question';

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
      this.sendAction(
        'onselectRowHeader',
        studentId,
        this.get('reportData'),
        this.get('collection')
      );
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
          chkVal.visible = false;
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', false);
          }
          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', false);
          }
        } else {
          chkVal.visible = true;
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', true);
            Ember.$('.data th').each(function() {
              Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            });
          }

          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', true);
            Ember.$('.data th').each(function() {
              Ember.$(this).width(`${177  }px`); // css attribute of your <td> width:15px; i.e.
            });
            Ember.$('.fixedCol').each(function() {
              Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            });
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
      if (this.get('isReportEnabled')) {
        this.set('isReportEnabled', false);
      } else {
        this.set('isReportEnabled', true);
      }
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
    Ember.$('#clscroll-content').scroll(function() {
      // Ember.$('#clscroll-row-headers').scrollTop(
      //   Ember.$('#clscroll-content').scrollTop()
      // );
      Ember.$('#clscroll-column-headers').scrollLeft(
        Ember.$('#clscroll-content').scrollLeft()
      );
    });
    Ember.$('#clscroll-column-headers').scroll(function() {
      Ember.$('#header-Table').attr('style', 'padding-right:15px;');
      if (Ember.$('#clscroll-column-headers').scrollLeft() === 0) {
        Ember.$('#header-Table').attr('style', 'padding-right:0px;');
      }
      Ember.$('#clscroll-content').scrollLeft(
        Ember.$('#clscroll-column-headers').scrollLeft()
      );
    });

    // Ember.$('#clscroll-row-headers').scroll(function() {
    //   $('#clscroll-content').scrollTop(
    //     Ember.$('#clscroll-row-headers').scrollTop()
    //   );
    // });
  },

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    // var width = Ember.$('#clscroll-column-headers').width();
    // Ember.Logger.info("width--",width);
    // var height = Ember.$(window).height() - 63;
    // if (height > 300) {
    //   height = height - 191;
    // }
    //  Ember.Logger.info("wheightth--",height);
    // Ember.$('#clscroll-table').attr(
    //   'style',
    //   `width:${width + 15}px;max-height:${height}px;`
    // );
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
   * @property {string}
   */
  appRootPath: Ember.computed.alias('configuration.appRootPath'),
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
   * @property {string}
   */
  dcaAddeddate: Ember.computed.alias('dcadate'),
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
  timevisible: false,
  /**
   * @property { ReportData } report data
   */
  reportData: [],
  userDataObj: [],
  userQuestionDataObj: [],
  /**
   * @property {boolean}
   */
  reactionvisible: false,
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
        renderFunction: formatTime,
        aggregateFunction: totalTimeSpent
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.reactions').string
        },
        label: this.get('i18n').t('reports.gru-table-view.reaction').string,
        value: 'reaction',
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
    const classId = component.get('classId');
    component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        component.set('membersData', members.get('members'));
        component
          .get('collectionService')
          .readQuizzesCollection(collectionId, 'assessment', false)
          .then(function(result) {
            component.set('firstTierHeaders', result.resources);
            members.get('members').forEach(function(item1) {
              Ember.set(item1, 'resultResources', result.resources);
            });
            var width = Ember.$('#clscroll-column-headers').width();
            Ember.Logger.info('width--', width);
            var height = Ember.$(window).height() - 63;
            if (height > 300) {
              height = height - 191;
            }
            Ember.Logger.info('wheightth--', height);
            Ember.$('#clscroll-table').attr(
              'style',
              `width:${width + 15}px;max-height:${height}px;`
            );
            component
              .get('collectionService')
              .readPerformanceData(classId, collectionId, activityDate)
              .then(function(result1) {
                var sessionId = '';
                result1.content.forEach(function(itemNew) {
                  sessionId = itemNew.usageData.get(0).sessionId;
                });

                //const collection1 = component.get('assessmentService').readAssessment(collectionId);

                component
                  .get('assessmentService')
                  .readAssessment(collectionId)
                  .then(function(collection) {
                    component.set('collection', collection);
                    component.set('collection.children', collection.children);
                  });
                result.resources.forEach(function(resourceobj) {
                  Ember.set(resourceobj, 'resourceId', resourceobj.id);
                });
                component.set('userDataObj', []);
                // members.get('members').forEach(function(memberObj) {

                //  });

                result1.content.forEach(function(item1) {
                  var memberData = members
                    .get('members')
                    .findBy('id', item1.userUid);
                  if (memberData !== undefined) {
                    if (memberData.id === item1.userUid) {
                      Ember.Logger.info('sessionId---', sessionId);
                      if (sessionId !== '') {
                        component
                          .get('analyticsService')
                          .findResourcesByCollectionforDCA(
                            sessionId,
                            collectionId,
                            classId,
                            memberData.id,
                            'assessment',
                            activityDate
                          )
                          .then(function(resultSession) {
                            Ember.Logger.info(
                              'resultSession---',
                              resultSession
                            );
                            var tempObj = Ember.Object.create({
                              user: memberData.id,
                              resourceResults:
                                resultSession.content[0].questions
                            });
                            resultSession.content[0].questions.forEach(function(
                              resource1obj
                            ) {
                              let util = getQuestionUtil(
                                resource1obj.questionType
                              ).create();
                              Ember.set(
                                resource1obj,
                                'resourceId',
                                resource1obj.questionId
                              );
                              Ember.set(
                                resource1obj,
                                'resources',
                                resource1obj.questions
                              );
                              Ember.set(
                                resource1obj,
                                'userAnswer',
                                util.toUserAnswer(resource1obj.answerObject)
                              );
                            });
                            Ember.merge(
                              memberData,
                              'resultResources',
                              resultSession.content[0].questions
                            );
                            component.get('userDataObj').pushObject(tempObj);

                            if (component.get('userDataObj').length > 0) {
                              const reportData1 = ReportData.create({
                                students: members.get('members'),
                                resources: result.resources
                              });
                              reportData1.merge(component.get('userDataObj'));

                              Ember.Logger.info('reportDa---', reportData1);

                              component.set('reportData', reportData1);
                              component.set('students', members.get('members'));

                              result.resources.forEach(function(item2) {
                                var usageDataQId = item1.usageData.findBy(
                                  'questionId',
                                  item2.id
                                );
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
                                  Ember.set(
                                    item2,
                                    'reaction',
                                    usageDataQId.reaction
                                  );
                                  Ember.set(
                                    item2,
                                    'questionType',
                                    usageDataQId.questionType
                                  );
                                }
                              });
                              Ember.set(
                                memberData,
                                'content',
                                result.resources
                              );
                              Ember.set(memberData, 'resultResources', []);
                            }
                          });
                      }
                    }
                  }
                });
              });
          });
      });
  }
});
