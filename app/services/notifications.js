/* global toastr */
import Ember from 'ember';

const { Service, on } = Ember;

/*
 * Wrapper for the toastr library: https://github.com/CodeSeven/toastr
 */
export default Service.extend({

  initToaster: on('init', function () {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-top-full-width",
      preventDuplicates: false,
      onclick: null,
      showDuration: 300,
      hideDuration: 1000,
      timeOut: 3000,
      extendedTimeOut: 1000,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
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
  }

});
