ig.module(
    'plugins.handlers.handler'
).requires(
    'plugins.handlers.dom',
    'plugins.handlers.size'
).defines(function () {
    ig.initHandlers = function () {
        ig.domHandler = null;
        ig.domHandler = new ig.DomHandler();
        ig.sizeHandler = new ig.SizeHandler(ig.domHandler);
    };
});
