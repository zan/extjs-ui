Ext.define('Zan.ui.view.workflow.WorkflowButtonToolbarController', {
    extend: 'Ext.app.ViewController',

    init: function() {
        // Update buttons whenever the workflow changes
        this.getViewModel().bind('{entity.workflow}', function(value) {
            this.renderButtons(value);
        }, this);
    },

    /**
     * @param {Zan.data.model.WorkflowModel} workflow
     */
    renderButtons: function(workflow) {
        this.getView().removeAll();

        var items = [];
        Ext.Array.forEach(workflow.get('enabledTransitions'), function(item) {
            items.push({
                xtype: 'button',
                text: item.name,
                margin: '0 5 0 5',
                handler: function(button) {
                    this.doTransition(button.getText());
                },
                scope: this
            });
        }, this);

        this.getView().add(items);
    },

    doTransition: function(name) {
        // todo: fire "before" events and check for responses
        console.log("transition: %o", name);

        var entity = this.getView().getEntity();
        var entityClassName = Ext.ClassManager.get(entity.$className).entityClassName;

        // todo: this should be configurable
        var url = '/api/zan/drest/entity-workflow/' + entityClassName + '/' + entity.getId() + '/transition';

        var params = {
            newPlace: name,
        };

        // todo: make this show up in the rest debugger
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            params: params,
            success: function(response, opts) {
                // todo: this might need more API parameters, should be an event instead?
                entity.load({
                    params: { includeWorkflow: true }
                });
            },
        });

        // todo: fire "after" events
    }
});