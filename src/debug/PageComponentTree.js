Ext.define('Zan.ui.debug.PageComponentTree', {
    extend: 'Ext.panel.Panel',

    title: 'Page Components',

    bind: {
        activePage: '{zanAppState.activePage}',
    },

    setActivePage: function(value) {
        // set via bind
    }
});