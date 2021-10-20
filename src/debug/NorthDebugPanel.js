Ext.define('Zan.ui.debug.NorthDebugPanel', {
    extend: 'Ext.toolbar.Toolbar',

    items: [
        {
            xtype: 'container',
            bind: {
                html: '{zanAppState.activePageClassName}',
            },
        },
    ],
});