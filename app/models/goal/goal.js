import Ember from 'ember';
import { GOAL_STATUS } from 'gooru-web/config/config';
import { /*validator,*/ buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({});

/**
 * Goal model
 *
 * @typedef {Object} Goal
 */
export default Ember.Object.extend(Validations, {

  /**
   * @property {String} id - Gooru id for the goal
   */
  id: null,

  /**
   * @property {String} title
   */
  title: null,

  /**
   * @property {String} description
   */
  description: null,

  /**
   * @property {Date} startDate
   */
  startDate: null,

  /**
   * @property {Date} endDate
   */
  endDate: null,

  /**
   * @property {String} status
   * @see gooru-web/config/config.js#GOAL_STATUS
   */
  status: null,

  /**
   * @property {String} reflection
   */
  reflection: null,

  /**
   * @property {number}
   */
  order: null,

  /**
   * @property {boolean} dropped
   */
  dropped: Ember.computed.equal("status", GOAL_STATUS.DROPPED),

  /**
   * @property {boolean} active
   */
  active: Ember.computed.equal("status", GOAL_STATUS.ACTIVE),

  /**
   * @property {boolean} notStarted
   */
  notStarted: Ember.computed.equal("status", GOAL_STATUS.NOT_STARTED),

  /**
   * @property {boolean} completed
   */
  completed: Ember.computed.equal("status", GOAL_STATUS.COMPLETED)

});
