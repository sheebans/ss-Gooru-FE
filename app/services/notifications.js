/* global toastr */
import Ember from 'ember';

const { Service, on } = Ember;

const defaultOptions = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-top-full-width",
  preventDuplicates: false,
  onclick: null,
  showDuration: 0,
  hideDuration: 0,
  timeOut: 0,
  extendedTimeOut: 0,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

/*
 * Wrapper for the toastr library: https://github.com/CodeSeven/toastr
 */
export default Service.extend({

  initToaster: on('init', function () {
    toastr.options = defaultOptions;
  }),

  /**
   * Clear all notifications
   *
   * @function
   * @return {undefined}
   */
  clear() {
    toastr.clear();
  },

  /**
   * Post a success notification
   *
   * @function
   * @param message - Body of the notification
   * @param title - Title of the notification
   * @return {undefined}
   */
  success(message, title) {
    toastr.success(message, title);
    this.restoreOptions();
  },

  /**
   * Post a notification for information purposes
   *
   * @function
   * @param message - Body of the notification
   * @param title - Title of the notification
   * @return {undefined}
   */
  info(message, title) {
    toastr.info(message, title);
    this.restoreOptions();
  },

  /**
   * Post a notification for warning purposes
   *
   * @function
   * @param message - Body of the notification
   * @param title - Title of the notification
   * @return {undefined}
   */
  warning(message, title) {
    toastr.warning(message, title);
    this.restoreOptions();
  },

  /**
   * Post an error notification
   *
   * @function
   * @param message - Body of the notification
   * @param title - Title of the notification
   * @return {undefined}
   */
  error(message, title) {
    toastr.error(message, title);
    this.restoreOptions();
  },

  setOptions(options) {
    toastr.options = options;
  },

  restoreOptions() {
    toastr.options = defaultOptions;
  }

});
