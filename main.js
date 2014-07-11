define(function(require, exports, module) {
  "use strict";

  var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
  var SyncUtil = require('./lib/syncutil');

  var $icon;

//  ExtensionUtils.loadStyleSheet(module, "./resources/css/style.css");

  window.on('load', function() {
    $icon = $("<div id=\"status-sync\">Something</div>")
    .click(_subMenu)
    .appendTo($("#status-info"));
  });

  function _subMenu() {
    if (!SyncUtil.is.connected) {
      // Popup menu logic here
        //  Options GREYED OUT
    }
    if (SyncUtil.is.syncing) {
      // Popup menu logic here
        // Sync greyed out
    }
    // Popup menu logic here
      // All options available
  }

  // Attach listeners
  SyncUtil.attachListeners({
    onConnect: function() {
      // Update UI to show a checkmark
      console.log("We've connected!");
    },
    onDisconnected: function() {
      // Update UI to show a red 'X'
      console.log("We've disconnected!");
    },
    onError: function(err) {
      // Update UI to show a warning symbol
      console.log("Something errored! Here it is: " + err.toString());
    },
    onSyncing: function() {
      // Update UI to show a progress wheel
      console.log("We started syncing!");
    },
    onCompleted: function() {
      // Update UI to blink slowly, then show a checkmark again
      console.log("The sync finished!");
    }
  });
});
