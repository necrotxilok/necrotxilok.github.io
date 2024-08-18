/*
;(function(document, window, $, undefined) {
  "use strict";

  var server = 'https://ntkserver.com';
  var url = 'https://necrotxilok.github.io/meteor-launcher/';
  //var url = window.location.href;

  function getParams(params, code) {
    if (typeof btoa == "function") {
      if (!params) { params = []; }
      if (!code) { code = 1847; }
      var assign = parseInt(Math.random() * 10000) * code;
      return "?token=" + btoa(assign + ";" + params.join(";"));
    }
  }

  function getMetrics(callback) {
    if (typeof callback == "function") {
      $.get(server + '/metrics/get' + getParams([url], 163), callback);
    }
  }

  function setMetrics(field) {
    if (field) {
      $.post(server + '/metrics/add' + getParams([url, field], 163));
    }
  }

  $(function() {
    getMetrics(function(data) {
      console.log('Meteor Launcher Metrics:');
      console.log(data);
    });

    setTimeout(function() {
      setMetrics('visits');
    }, 6000);

    $('body').on('click', '[data-metrics]', function(event) {
      var $this = $(event.currentTarget);
      setMetrics($this.data('metrics'));
    });
  });

})(document, window, jQuery);
*/