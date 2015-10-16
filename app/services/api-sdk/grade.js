import Ember from "ember";
import i18nMixin from "../../mixins/i18n";

export default Ember.Service.extend(i18nMixin, {

  /**
   * Returns all the fixed grades with i18n content
   * @returns {*[]}
   */
  readAll: function() {
    var service = this;
    return [
      Ember.Object.create({ id: 1, name: service.t("grade-dropdown.pre-k"), levels: [] }),
      Ember.Object.create({ id: 2, name: service.t("grade-dropdown.elementary"),
        levels: [
          service.t("grade-dropdown.k"),
          service.t("grade-dropdown.first"),
          service.t("grade-dropdown.second"),
          service.t("grade-dropdown.third"),
          service.t("grade-dropdown.fourth"),
          service.t("grade-dropdown.fifth")] }),
      Ember.Object.create({ id: 3, name: service.t("grade-dropdown.middle-school"),
        levels: [
          service.t("grade-dropdown.sixth"),
          service.t("grade-dropdown.seventh"),
          service.t("grade-dropdown.eighth")] }),
      Ember.Object.create({ id: 4, name: service.t("grade-dropdown.high-school"),
        levels: [
          service.t("grade-dropdown.ninth"),
          service.t("grade-dropdown.tenth"),
          service.t("grade-dropdown.eleventh"),
          service.t("grade-dropdown.twelfth")] }),
      Ember.Object.create({ id: 5, name: service.t("grade-dropdown.higher-ed"), levels: [] })
    ];
  }

});

