Ext.define('Zan.ui.panel.WizardPanel', {
    extend: 'Ext.panel.Panel',

    constructor: function (config) {
        config = Zan.Object.setDefaults(config, {
            layout: 'card',
        });

        this.callParent([config]);
    },

    initComponent: function() {
        this.callParent(arguments);

        this.addDocked(this._buildDockedItems());
    },

    _buildDockedItems: function() {
        return {
            xtype: 'toolbar',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Previous',
                },
                {
                    xtype: 'button',
                    text: 'Next',
                },
            ]
        };
    }
});