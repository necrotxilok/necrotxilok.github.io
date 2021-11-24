
;(function(document, window, $, undefined) {
  "use strict";

  $(function() {

    var $imageBoxes = $('.img-box');
    var template = '\
      <div class="full-box">\
        <div class="close-box">\
          <div class="lpart mif-chevron-thin-right"></div>\
          <div class="rpart mif-chevron-thin-left"></div>\
        </div>\
        <div class="navigator">\
          <span class="nav left"><span class="mif-chevron-thin-left"></span></span>\
          <span class="nav right"><span class="mif-chevron-thin-right"></span></span>\
        </div>\
        <div class="image"><img src="{{Image}}"/></div>\
      </div>\
    ';
    var $imgBox;

    var getImage = function() {
      return $imgBox.find('img').attr('src');
    }

    $imageBoxes.css('cursor', 'pointer');
    $imageBoxes.on('click', function() {
      $imgBox = $(this);
      var img = getImage();
      $('body').append(template.replace('{{Image}}', img));
    });

    $('body').on('click', '.full-box .close-box', function() {
      $('.full-box').remove();
    });

    $('body').on('click', '.full-box .nav', function(e) {
      var $this = $(e.currentTarget);
      if ($this.hasClass('left')) {
        var $prev = $imgBox.prev();
        if ($prev.length) {
          $imgBox = $prev;
        }
      }
      if ($this.hasClass('right')) {
        var $next = $imgBox.next();
        if ($next.length) {
          $imgBox = $next;
        }
      }
      $('.full-box').find('.image img').attr('src', getImage());
    });

  });

})(document, window, jQuery);
