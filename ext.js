Layout = function() {
    var southPanel, eastPanel, centerPanel;
    return {
        init : function() {
           var mainLayout = new Ext.BorderLayout(Ext.get('reg-div'), {
                south: {
                    split: true, initialSize: 200, titlebar: true,
						collapsedTitle: 'الجدول والحركات', collapsible: true
                },
                east: {
                    split: true, initialSize: 350, titlebar: true, collapsible: true
                },
                center: { }
            });
            mainLayout.beginUpdate();
            mainLayout.add('south', southPanel = new Ext.ContentPanel('south-div', {
                fitToFrame: true, autoScroll: true, closable: false, title: 'الجدول والحركات'
            }));
            mainLayout.add('east', eastPanel = new Ext.ContentPanel('east-div', {
                fitToFrame: true, autoScroll: true, closable: false, title: 'المستعرض'
            }));
            mainLayout.add('center', centerPanel = new Ext.ContentPanel('center-div', {
                fitToFrame: true, autoScroll: true
            }));
            mainLayout.endUpdate();
        }
    };
}();
Ext.EventManager.onDocumentReady(Layout.init, Layout, true);
Ext.onReady(function() {
	activate('cart');

})
