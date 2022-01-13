/**
 * todo: set some limits on delayed cleanup pages, eg. # of them or time without access
 *
 * todo: no longer necessary after refactor to PageContainerView and PageContainerViewController?
 */
Ext.define('Zan.ui.controller.AppPageController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Zan.ui.cache.CachedView',
    ],

    init: function() {
        this._pageContainer = null;

        this._lastActivePage = null;

        // Collection of Zan.ui.cache.CachedView
        this._delayedCleanupQueue = new Ext.util.MixedCollection();
    },

    setPageContainer: function(view) {
        this._pageContainer = view;
    },

    displayPage: function(className, params) {
        // Clean up previous page
        if (this._lastActivePage) {
            if (this._lastActivePage.getDelayCleanup()) {
                this._cacheView(this._lastActivePage, params);
                this._lastActivePage.hide();
            }
            else {
                this._pageContainer.remove(this._lastActivePage);
            }
        }

        this._activatePage(className, params);
    },

    _activatePage: function(className, routeParams) {
        var cacheKey = this._getComponentKey(className, routeParams);
        var cachedView = this._delayedCleanupQueue.get(cacheKey);
        var pageCmp = null;

        if (cachedView) {
            pageCmp = cachedView.getView();
        }
        else {
            var pageConfig = {
                zanRouteParams: routeParams,
                flex: 1,
            };

            pageCmp = Ext.create(className, pageConfig);
        }

        // todo: should be a fired event
        if (Ext.isFunction(this._pageContainer.beforeActivate)) {
            this._pageContainer.beforeActivate(pageCmp);
        }

        // If it's in the cache, it just needs to be shown
        if (cachedView) {
            pageCmp.show();
        }

        // Cached, just show it
        if (cachedView) {
            pageCmp = cachedView.getView();
            pageCmp.show();
        }
        // Not in the cache of delayed pages, add to page container
        else {
            this._pageContainer.add(pageCmp);
        }

        Ext.getApplication()
            .getMainView()
            .lookupViewModel()
            .get('zanAppState')
            .set('activePage', pageCmp);
        this._lastActivePage = pageCmp;
    },

    _cacheView: function(component, params) {
        var cacheKey = this._getComponentKey(Ext.getClassName(component), params);
        var inCache = this._delayedCleanupQueue.get(cacheKey);

        // If it's already cached, nothing to do
        if (inCache) return;

        // Store in cache
        var cached = new Zan.ui.cache.CachedView({
            view: component,
        });

        this._delayedCleanupQueue.add(cacheKey, cached);
    },

    _getComponentKey: function(className, params) {
        return className + '-' + Ext.Object.toQueryString(params, true);
    }
});