define(function(require, exports, module) {
  "use strict";

  var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
  var SyncUtil = require('./lib/syncutil');

  var $icon;

  ExtensionUtils.loadStyleSheet(module, "./lib/css/fontawesome.css");
  ExtensionUtils.loadStyleSheet(module, "./lib/css/style.css");

  var statusBar = brackets.getModule("widgets/StatusBar");

  $icon = $("<div>Time to sync!</div>")
    .click(_subMenu);
  statusBar.addIndicator("sync-indicator", $icon, true);
  $icon = $("#sync-indicator");

  function _subMenu() {
    SyncUtil.sync();
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
      console.log("Something errored! Here it is: ", err);
    },
    onSyncing: function() {
      // Update UI to show a progress wheel
      $icon.html("SYNCING");
    },
    onCompleted: function() {
      // Update UI to blink slowly, then show a checkmark again
      $icon.html("SYNCED");
    }
  });
});
