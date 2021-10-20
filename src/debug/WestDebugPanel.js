Ext.define('Zan.ui.debug.WestDebugPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Zan.ui.debug.PageComponentTree',
    ],

    items: [
        Ext.create('Zan.ui.debug.PageComponentTree'),
    ],
});