import Ember from 'ember';

export default Ember.Object.extend({

  id: null,

  title: null,

  description: null,

  resourceCount: 0,

  questionCount: 0,

  remixCount: 0,

  thumbnailUrl: null,

  course: null,

  owner: null,

  standards: null,

  isPublic: false,

  isAssessment: false

});
