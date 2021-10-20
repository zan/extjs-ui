Ext.define('Zan.ui.page.BasePage', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.zan-page',

    config: {
        /**
         * @cfg {boolean} If true, this page will not be automatically destroyed
         * when a new page is navigated to
         *
         * Note that there are no guarantees if/when the page will be cleaned up
         */
        delayCleanup: false,

        /**
         * @cfg {string} Component to dock at the top of the page
         *
         * todo: topDockedItemClass would be more generic?
         */
        pageMenuClass: null,

        // todo: docs
        zanRouteParameters: null,

        // todo: docs
        loadRecords: {},
    },

    title: 'Loading...',

    constructor: function (config) {
        config = Zan.Object.setDefaults(config, {
            // NOTE: required to support delayed cleanup
            hideMode: 'offsets',

            layout: {
                type: 'vbox',
                align: 'stretch',
            },
        });

        this.callParent([config]);
    },

    initComponent: function() {
        this.callParent();

        this._applyRouteParametersToViewModel();
    },

    afterRender: function() {
        this.callParent();

        setTimeout(Ext.bind(function () {
            this._loadRecords();
        }, this), 1);
    },

    _applyRouteParametersToViewModel() {
        this.lookupViewModel().set('zanRouteParameters', this.getZanRouteParameters());
    },

    async _loadRecords() {
        var session = this.lookupSession();
        var viewModel = this.lookupViewModel();
        var routeParams = this.getZanRouteParameters();

        Ext.Object.each(this.getLoadRecords(), async function(viewModelName, loadInfo) {
            // todo: better error detection/reporting here
            var identifier = routeParams[loadInfo.identifierParam];
            var extraParams = {};

            if (!Ext.isEmpty(loadInfo.responseFields)) {
                extraParams.responseFields = loadInfo.responseFields;
            }

            var record = await session.getRecordByAnyIdentifier(loadInfo.type, identifier, extraParams);
            viewModel.set(viewModelName, record);
        }, this);
    },

    setTitle: function(value) {
        // Update browser title
        document.title = value;

        var encodedValue = Ext.htmlEncode(value);

        return this.callParent([encodedValue]);
    },

    getLoggedInUser: function() {
        return this.lookupViewModel().get('appLoggedInUser');
    },
});