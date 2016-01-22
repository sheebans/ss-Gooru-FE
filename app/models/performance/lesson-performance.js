import DS from 'ember-data';
import PerformanceModel from './performance';

/**
 * Model that contains the Lesson Performance information
 * @typedef {Object} LessonPerformance
 */
export default PerformanceModel.extend({

  lesson: DS.belongsTo("lesson/lesson", { async: true })

});
