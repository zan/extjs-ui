Ext.define('Zan.ui.page.ApiViewerPage', {
    extend: 'Zan.ui.page.BasePage',

    requires: [
        'Zan.ui.page.ApiViewerPageController',
        'Zan.ui.view.panel.IframePanel',
    ],

    controller: { xclass: 'Zan.ui.page.ApiViewerPageController' },

    title: 'API Viewer',

    items: [
        {
            xtype: 'form',
            reference: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            bodyPadding: 4,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'method',
                            fieldLabel: 'URL',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    { name: 'GET',      value: 'GET' },
                                    { name: 'POST',     value: 'POST' },
                                    { name: 'PUT',      value: 'PUT' },
                                    { name: 'PATCH',    value: 'PATCH' },
                                ]
                            }),
                            valueField: 'value',
                            displayField: 'name',
                            editable: false,
                            bind: {
                                value: '{zanRouteParams.requestMethod}',
                            },
                        },
                        {
                            xtype: 'textfield',
                            name: 'url',
                            value: '/zan/doctrine/entity/App.Entity.StowersUser/test1',
                            bind: {
                                value: '{zanRouteParams.requestUrl}',
                            },
                            flex: 1
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Parameters',
                    name: 'paramsText',
                    bind: {
                        value: '{zanRouteParams.requestData}',
                    },
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: ' ',
                    labelSeparator: '',
                    items: [
                        {
                            xtype: 'button',
                            reference: 'doRequestButton',
                            text: 'Request',
                            scale: 'medium',
                            handler: 'onDoRequest',
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            margin: '8 0 0 0',
            flex: 1,
            items: [
                {
                    xtype: 'panel',
                    title: 'Response',
                    reference: 'responsePanel',
                    autoScroll: true,
                },
                {
                    xtype: 'zan-iframe',
                    title: 'SF Request Profiler',
                    reference: 'sfProfilerIframe',
                }
            ]
        }
    ]
});