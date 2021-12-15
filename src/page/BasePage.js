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

        // todo: docs
        loadPageRecord: null,
    },

    viewModel: {},

    title: 'Loading...',

    hideMode: 'offsets',

    layout: {
        type: 'vbox',
        align: 'stretch',
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

        setTimeout(Ext.bind(function () {
            this._loadPageRecord();
        }, this), 1);
    },

    _applyRouteParametersToViewModel() {
        this.lookupViewModel().set('zanRouteParameters', this.getZanRouteParameters());
    },

    async _loadPageRecord() {
        var viewModel = this.lookupViewModel();
        var routeParams = this.getZanRouteParameters();

        if (!viewModel) this.setViewModel(Ext.create('Ext.app.ViewModel'));

        // Nothing to do unless there's a pageRecord configuration
        if (!this.getLoadPageRecord()) return;

        var loadPageRecord = this.getLoadPageRecord();
        var identifier = routeParams[loadPageRecord.identifierParam];

        var params = {
            identifier: identifier,
        };

        // Support additional responseFields from the API
        if (!Ext.isEmpty(loadPageRecord.responseFields)) {
            params.responseFields = loadPageRecord.responseFields;
        }

        var record = Ext.create(loadPageRecord.type);
        record.load({
            params: params,
            success: function(record, op) {
                viewModel.set('pageRecord', record);
            }
        });
    },

    async _loadRecords() {
        var session = this.lookupSession();
        var viewModel = this.lookupViewModel();
        var routeParams = this.getZanRouteParameters();

        // Nothing to do if no records were requested
        if (Ext.Object.isEmpty(this.getLoadRecords())) return;

        if (!session) throw new Error("Page must have a session declared in order to use loadRecords");

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