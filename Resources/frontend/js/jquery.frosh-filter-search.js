(function($, window, document, undefined) {
    $.plugin("froshFilterSearch", {
        defaults: {
            filterPanelFlyoutSelector: ".filter-panel--flyout",
            filterPanelOptions: ".filter-panel--option",
            froshOptionListSizeTrigger: 10
        },

        init: function() {
            var me = this;

            me.applyDataAttributes();

            me.$flyout = me.$el.parents(me.opts.filterPanelFlyoutSelector);
            me.$filterOptions = me.$flyout.find(me.opts.filterPanelOptions);

            if (me.$filterOptions.length >= me.opts.froshOptionListSizeTrigger) {
                me.$el.parents('.filter-panel--search').addClass("show-search-input");
                me.$el.prop("disabled", false);
            }

            me.registerEvents();
        },

        registerEvents: function() {
            var me = this;

            me._on(me.$el, "keyup", $.proxy(me.onKeyup, me));
            $.subscribe(
                me.getEventName("plugin/swFilterComponent/onToggleCollapse"),
                $.proxy(me.onToggleFilter, me)
            );
        },

        onKeyup: function(event) {
            var me = this;

            event.preventDefault();

            var value = me.$el.val().toLowerCase();
            me.$filterOptions.filter(function() {
                $(this).toggle(
                    $(this)
                        .text()
                        .toLowerCase()
                        .indexOf(value) > -1
                );
            });
        },

        onToggleFilter: function(event, item, shouldOpen) {
            var $item = item.$el;

            if (shouldOpen && $item.hasClass("is--collapsed")) {
                $item.find(".frosh-filter-search").focus();
            }
        }
    });

    $(function() {
        StateManager.addPlugin(
            '*[data-frosh-filter-search="true"]',
            "froshFilterSearch"
        );;
    });
})(jQuery, window, document);
