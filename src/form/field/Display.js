/**
 * Display field with auto-detection of content and support for customizing how values are displayed
 *
 * todo: ensure Zan.common.String.from supports all necessary types
 */
Ext.define('Zan.ui.form.field.Display', {
    extend: 'Ext.form.field.Display',

    requires: [
        'Zan.common.String',
    ],

    alias: 'widget.zan-displayfield',

    config: {
        /**
         * @cfg {string} Value to use when displaying a null or undefined value
         */
        nullValueText: '',

        /**
         * @cfg {object} Additional options to pass to Zan.String.from()
         */
        stringConversionOptions: null,
    },

    valueToRaw: function(value) {
        return value;
    },

    /**
     * OVERRIDDEN because parent class converts value to a string but
     * this component needs to be able to handle 'null' and 'undefined'
     */
    setRawValue: function(value) {
        this.rawValue = value;

        if (this.rendered) {
            this.inputEl.dom.innerHTML = this.getDisplayValue();
            this.updateLayout();
        }

        return value;
    },

    renderer: function(value) {
        if (value === null || value === undefined) return this.getNullValueText();

        return Ext.String.htmlEncode(Zan.common.String.from(value, this.getStringConversionOptions()));
    },
});