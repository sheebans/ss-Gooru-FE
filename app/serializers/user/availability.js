import DS from "ember-data";

export default DS.JSONAPISerializer.extend({

  normalizeSingleResponse: function(store, primaryModelClass, payload) {
    console.log('SingleResponse...');
    console.log(payload);
    var availabilityModel =  {
      data: {
        id: payload.gooruId ? payload.gooruId: '_availability_',
        type: "user/availability",
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
