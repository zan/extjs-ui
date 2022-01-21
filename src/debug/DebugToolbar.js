/**
 * todo: https://www.chromestatus.com/feature/5685965186138112
 */
Ext.define('Zan.ui.debug.DebugToolbar', {
    extend: 'Ext.toolbar.Toolbar',

    items: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-rocket',
            arrowVisible: false,
            menu: {
                // NOTE: this menu opens from the bottom, more commonly used things should be LAST in this array
                items: [
                    { text: 'Icon Picker', iconCls: 'x-fab fa-font-awesome',
                        handler: () => {
                            Ext.create('Zan.ui.debug.IconBrowserPopup', { autoShow: true });
                        }
                    },
                    { text: 'API Viewer', iconCls: 'x-fab fa-symfony', href: '#/zan/data/api-viewer', hrefTarget: '_blank' },
                    { text: 'DQL Console', iconCls: 'x-fa fa-database', href: '#/zan/data/dql-console', hrefTarget: '_blank' },
                ]
            }
        },
        {
            xtype: 'button',
            enableToggle: true,
            text: 'Design Mode',
            hidden: true, // wip
            toggleHandler: function(btn, isPressed) {
                var appState = this.lookupViewModel().get('zanAppState');
                appState.set('zanDesignUiShowing', isPressed);
                appState.save();
            }
        },
        {
            xtype: 'displayfield',
            bind: {
                // Zan.ui.model.ZanAppStateModel
                value: '{zanAppState.activePageClassName}',
            }
        },
        '->',
        {
            xtype: 'button',
            iconCls: 'x-fa fa-exchange-alt',
            tooltip: 'API Requests',
            handler() {
                Ext.create('Zan.ui.debug.DebugRequestLogPopup', { autoShow: true });
            }
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-times-circle',
            tooltip: 'Close Debug Bar',
            handler: function() {
                var appState = this.lookupViewModel().get('zanAppState');
                appState.set('zanDebugBarShowing', false);
                appState.set('zanDesignUiShowing', false);
                appState.save();
            }
        },
    ],
});