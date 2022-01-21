Ext.define('Zan.ui.page.DqlConsolePageController', {
    extend: 'Ext.app.ViewController',

    onRunDqlClicked: function() {
        var dql = this.lookup('dqlTextArea').getValue();

        console.log("running~");
        Zan.data.Api.post(
            '/api/zan/drest/debug/dql/run-dql',
            {
                dql: dql,
            }
        );
    },
});