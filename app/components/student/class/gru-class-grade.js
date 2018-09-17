import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-class-grade'],

  actions: {
    onMoveNext(step) {
      let component = this;
      component.sendAction('onMoveNext', step);
    }
  },

  gradeLevels: Ember.computed('gradeLevel', function() {
    let component = this;
    let gradeLevel = component.get('gradeLevel');
    let startingLevel = gradeLevel > 3 ? gradeLevel - 3 : 1;
    let numberOfLevelsToShow = 6;
    let gradeLevelPoint = 1;
    let gradeLevels = Ember.A([]);
    while(gradeLevelPoint <= numberOfLevelsToShow) {
      gradeLevels.push(startingLevel);
      startingLevel++;
      gradeLevelPoint++;
    }
    return gradeLevels;
  })
});
