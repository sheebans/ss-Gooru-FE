import Ember from 'ember';
import GradeCategoryScore from 'gooru-web/models/rubric/grade-category-score';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-rubric-on'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showCategory: function(category) {
      category.set('selected', !category.get('selected'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    this.updateCategories();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Rubric to grade
   * @property {Rubric} rubric
   */
  rubric: null,

  /**
   * Categories from grade
   * @property {Map} gradeCategories
   */
  gradeCategories: Ember.computed(
    'grade.categoriesScore.[]',
    'title',
    function() {
      return this.get(
        'grade.categoriesScore'
      ).reduce((categoriesMap, category) => {
        categoriesMap[category.get('title')] = category;
        return categoriesMap;
      }, {});
    }
  ),

  /**
   * Categories from rubric
   * @property {RubricCategory[]} rubricCategories
   */
  rubricCategories: Ember.computed.alias('rubric.categories'),

  /**
   * Student grade results
   * @property {RubricGrade} grade
   */
  grade: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Update categories to show
   */
  updateCategories: function() {
    let rubricCategories = this.get('rubricCategories');
    let gradeCategories = this.get('gradeCategories');
    this.set(
      'categories',
      rubricCategories.map(rubricCategory => {
        let gradeCategory = gradeCategories[rubricCategory.get('title')];
        if (!gradeCategory) {
          gradeCategory = GradeCategoryScore.create({
            title: rubricCategory.get('title'),
            levelMaxScore: rubricCategory.get('totalPoints')
          });
          gradeCategories[rubricCategory.get('title')] = gradeCategory;
          this.set('grade.categoriesScore', Object.values(gradeCategories));
        }
        let levels = rubricCategory.get('levels').map(level => ({
          id: `${level.name};${level.score};${rubricCategory.get('title')}`,
          name: level.name
        }));
        levels = [{ id: '', name: '' }].concat(levels);
        return Ember.Object.create({
          info: rubricCategory,
          grade: gradeCategory,
          selected: false,
          levels
        });
      })
    );
  }
});
