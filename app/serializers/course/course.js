import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeFindRecordResponse: function(store, primaryModelClass, payload) {
    return  {
      data: {
        id: payload.gooruOid,
        type: "course/course",
        attributes: {
          title: payload.title
        }
      }
    };
  }

});


