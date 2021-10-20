/**
 * todo: make this more ext7-like
 */
Ext.define('Zan.ui.debug.IconBrowserPopup', {
    extend: 'Zan.panel.ModalPopupDialogPanel',

    title: 'Icon Browser',

    showCancelButton: false,

    items: [
        {
            xtype: 'container',
            bodyPadding: 4,
            // todo: how to link to a specific version?
            html: '<a href="https://fontawesome.com/icons?d=gallery&p=2&m=free" target="_blank">Font Awesome Gallery</a>'
        },
        {
            xtype: 'grid',
            width: 400,
            height: 400,
            itemId: 'iconGrid',
            columns: [
                { text: 'Icon', dataIndex: 'iconClassName',
                    renderer(value, metaData, record, rowIndex, colIndex, store, view) {
                        // todo: not sure how to detect and filter out brand ones (x-fab)
                        // showing both is fine because if it's invalid it won't render anything
                        var html = [
                            '<span class="x-fa ' + value + '" style="font-size: 32px;"></span>',
                            '<span class="x-fab ' + value + '" style="font-size: 32px;"></span>',
                        ];

                        return html.join("");
                    }
                },
                { text: 'Icon Name', dataIndex: 'iconName', flex: 1, },
            ]
        },
    ],

    afterRender() {
        this.callParent();

        var data = [];

        for (var i=0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];

            for (var j=0; j < sheet.cssRules.length; j++) {
                var cssRule = sheet.cssRules[j];
                // Any valid icon will have a "content" rule in the cssText
                if (!cssRule.cssText || cssRule.cssText.indexOf("content:") == -1) continue;

                if (!Ext.String.startsWith(cssRule.cssText, '.fa-')) continue;

                // Rules look like: .fa-subway::before { ... }
                // remove ::before and everything after it
                var iconName = cssRule.cssText.substring(0, cssRule.cssText.indexOf(":"));
                // remove .fa-
                iconName = Zan.String.removePrefix(iconName, '.fa-');

                data.push({
                    iconClassName: 'fa-' + iconName,
                    iconName: iconName
                });
            }
        }

        var store = Ext.create('Ext.data.Store', {
            fields: ['iconClassName', 'iconName'],
        });

        store.loadRawData(data);
        this.down("#iconGrid").setStore(store);
    }
});