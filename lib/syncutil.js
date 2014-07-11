define(function (require, exports, module) {
  var sync = appshell.MakeDrive.fs().sync;
  var is = {
    get connected() {
      return sync.state === sync.SYNC_CONNECTED;
    },
    get syncing() {
      return sync.state === sync.SYNC_SYNCING;
    }
  }

  function blink(time, interval, element){
    var timer = window.setInterval(function(){
      element.fadeOut(500);
      element.fadeIn(500);
      window.setTimeout(function(){
        element.fadeOut(500);
        element.fadeIn(500);
      }, 1000);
    }, interval);
    window.setTimeout(function(){clearInterval(timer);}, time);
  }

  function rotate(element) {
    return function() {
      var bool;
      var intervalTrigger;
      var angle = 0;

      var timer = function(){
        return setInterval(function(){
          ++angle;
          element.rotate(angle);
        }, 0);
      };
      if(bool){
        intervalTrigger = timer();
        bool = false;
      }
      else{
        clearInterval(intervalTrigger);
        element.rotate({angle:angle,animateTo:angle + (360 - (angle % 360)), easing: $.easing.easeInOutExpo, callback: function() {
          blink(200, 100);
        }});
        bool = true;
      }
    }
  }

  function attachListeners(handlers) {
    sync.on("connected", handlers.onConnect);
    sync.on("disconnected", handlers.onDisconnected);
    sync.on("error", handlers.onError);
    sync.on("syncing", handlers.onSyncing);
    sync.on("completed", handlers.onCompleted);
  }

  return {
    attachListeners: attachListeners,
    is: is,
    sync: function() {
      sync.request('/');
    }
  };
});
