import Ember from 'ember';

export default Ember.Object.extend({

  title: null,

  description: null,

  category: null,

  format: null,

  publisher: null,

  thumbnailUrl: null,

  url: null,

  owner: null,

  isQuestion: Ember.computed.equal('category', 'Question')

});
