define(function (require) {
  'use strict';

  /**
   * Module exports
   */

  return withMustache;

  /**
   * Module function
   */

  function withMustache() {

    /**
     * Render a template with Mustache. Must provide either `request.template`
     * or `request.templateName`.
     *
     * @param request {Object}
     *   request.template {String} optional template
     *   request.templateName {String} optional template name
     *   request.renderParams {Object} optional data
     */

    this.renderTemplate = function (request) {
      var requestId = request.requestId = Date.now();
      var html;

      this.on(document, 'mustache-rendered-template', function (e, data) {
        if (data.request.requestId === requestId) {
          html = data.rendered;
        }
        this.off(document, 'mustache-rendered-template');
      });

      this.trigger('mustache-render-template', request);

      return html;
    };
  }
});
