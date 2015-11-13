import DS from "ember-data";

export default DS.JSONAPISerializer.extend({


  normalizeResponse: function(store, primaryModelClass, payload) {
    console.log(payload);
    var availabilityModel =  {
      data: {
        id: payload.gooruUId,
        type: "availability",
        attributes: {
            confirmStatus: payload.confirmStatus,
  			collaboratorCheck: payload.collaboratorCheck,
  			availability: payload.availability
        }
      }
    };
    store.push(availabilityModel);

    return availabilityModel;
  }

});
