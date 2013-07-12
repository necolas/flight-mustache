/*global spyOnEvent*/
define(function (require) {
  'use strict';

  var Mustache = require('mustache');

  describeComponent('lib/mustache_helper', function () {
    describe('mustache-render-template', function () {
      describe('with string template', function () {
        // Initialize the component and attach it to the DOM
        beforeEach(function () {
          setupComponent();
        });

        it('renders the template with provided data', function () {
          var spy = spyOnEvent(this.component.$node, 'mustache-rendered-template');

          this.component.$node.trigger('mustache-render-template', {
            template: 'plain old {{myVar}}',
            renderParams: {
              myVar: 'html'
            }
          });

          expect(spy).toHaveBeenTriggeredOn(this.component.$node);
          expect(spy.callCount).toBe(1);
          expect(spy.mostRecentCall.data).toEqual({
            rendered: 'plain old html',
            request: {
              template: 'plain old {{myVar}}',
              renderParams: {
                myVar: 'html'
              }
            }
          });
        });

        it('triggers mustache-render-error on error', function () {
          var spy = spyOnEvent(this.component.$node, 'mustache-render-error');

          this.component.$node.trigger('mustache-render-template', {
            template: 'plain old {{#noClosingTag}}',
            renderParams: {
              myVar: 'html'
            }
          });

          expect(spy).toHaveBeenTriggeredOn(this.component.$node);
          expect(spy.callCount).toBe(1);
        });
      });

      it('uses pre-compiled template if available', function () {
        var precompiledTemplates = {
          aTemplate: Mustache.compile('test')
        };

        setupComponent({
          precompiledTemplates: precompiledTemplates
        });

        var spy = spyOnEvent(this.component.$node, 'mustache-rendered-template');

        this.component.$node.trigger('mustache-render-template', {
          templateName: 'aTemplate'
        });

        expect(spy).toHaveBeenTriggeredOn(this.component.$node);
        expect(spy.callCount).toBe(1);
        expect(spy.mostRecentCall.data).toEqual({
          rendered: 'test',
          request: {
            templateName: 'aTemplate'
          }
        });
      });
    });
  });
});
