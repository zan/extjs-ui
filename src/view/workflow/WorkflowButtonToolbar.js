/**
 *
 */
Ext.define('Zan.ui.view.workflow.WorkflowButtonToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'Zan.ui.view.workflow.WorkflowButtonToolbarController',
    ],

    config: {
        entity: null,
    },

    controller: { xclass: 'Zan.ui.view.workflow.WorkflowButtonToolbarController' },
    viewModel: {},

    // NOTE: items are dynamically built in the controller based on workflow data
});