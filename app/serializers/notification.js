import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  teacherFetch(data) {
    // data = data ? data : { classId: '', limit: 10, boundary: null };
    return data;
  },

  studentFetch(data) {
    //data = data ? data : { classId: '', limit: 10, boundary: null };
    return data;
  },

  normalizeFetch: data => {
    return data;
  },

  updateAction: data => {
    return data;
  }
});
