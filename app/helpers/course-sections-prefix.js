import Ember from 'ember';

/**Show the Unit, Lesson, Assessment and Collection label correctly,
 *  this is showing the letter and number prior the name.
 *
 * @example
 *
 * <span>{{course-sections-prefix title="My Unit" type="unit" index=1}}</span>
 * @see /app/templates/components
 *
 * @param title {String}
 * @param index {Number}
 * @param trype {String} "unit","lesson","collection" and "assessment"
 * @returns {String}
 */
export default Ember.Helper.extend({
  i18n: Ember.inject.service('i18n'),

  compute(params,{index, type}) {
    let i18n = this.get('i18n');
    var prefixIndex = ++index;

    const i18nKey = `common.${type}Initial`;
    const letter = i18n.t(i18nKey);

    return `${letter}${prefixIndex}`;
  }

});
