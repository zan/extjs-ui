/**
 * Helper utility for generating Ext route configurations
 *
 *  - Adds support for a query string on each URL
 *  - Makes it easy to link to Pages
 */
Ext.define('Zan.ui.RoutingHelper', {
    singleton: true,

    constructor: function(config) {
        this._pendingTargetPage = null;
    },

    linkToPages: function(routeDef) {
        var extRouteDef = {};

        Ext.Object.each(routeDef, function(url, value) {
            // Add query string support to the URL
            url += '(:{zanQueryString...})';

            extRouteDef[url] = this.toPage(value);

            extRouteDef[url].conditions = {
                'zanQueryString': '\\?([0-9a-zA-Z\\?\\&=\\-\\%\\.]+)'
            };
        }, this);

        return extRouteDef;
    },

    toPage: function(targetPageClassName) {
        // todo: make sure page has been require'd

        return {
            before: Ext.bind(function() {
                // This method will receive a variable number of arguments,
                // action will be the last one
                var action = arguments[arguments.length-1];
                this._pendingTargetPage = targetPageClassName;
                action.resume();
            }, this),
            // The scope of this is the routing controller, see BasePageRoutingController
            action: 'onRouteToPendingTargetPage',
            name: targetPageClassName,
        };
    },

    getPendingTargetPage: function() {
        return this._pendingTargetPage;
    },
});