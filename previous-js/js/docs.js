(function() {
"use strict";

	window.docs = {};

	var anchorPositions = [];

	var activateAnchorLink = function() {
		var $docs = $('section.docs');
		if (!$docs.length || !anchorPositions.length) {
			return;
		}
		var $index = $('section.docs .index');
		var scroll = $(document).scrollTop();
		$index.find('a').removeClass('active');
		for (var anchor of anchorPositions) {
			if (scroll < anchor.top) {
				$index.find('a[href="' + anchor.id + '"]').addClass('active');
				break;
			}
		}
	}

	var linkDocumentHeaders = function() {
		anchorPositions = [];
		//var $index = $('section.docs .index');
		var $headers = $('section.docs .content').find('h2,h3,h4,h5');
		$headers.each(function(index) {
			var $this = $(this);
			var title = $this.text();
			var id = $this.data('id');
			$this.html('<a href="#' + id + '" class="copy-anchor-link">' + $this.html() + '</a>');
			var $anchor = $('#' + id);
			if ($anchor.length) {
				var offsetTop = parseInt($anchor.offset().top) - 10;
				anchorPositions.push({
					top: offsetTop,
					id: '#' + id
				});
			}
		});
		if (anchorPositions.length) {
			for (var i = 0; i < anchorPositions.length - 1; i++) {
				anchorPositions[i].top = anchorPositions[i + 1].top;
			}
			anchorPositions[anchorPositions.length - 1].top = parseInt($(document).height());
		}
		activateAnchorLink();
		if (window.location.hash) {
			var $anchor = $(window.location.hash);
			if ($anchor.length) {
				var offsetTop = parseInt($anchor.offset().top);
				$(document).scrollTop(offsetTop);
			}
		}
	}

	var debounceTimer = null;
	var debounce = function(fn, time = 100) {
		return function() {
			clearTimeout(debounceTimer);
			var debounceTimer = setTimeout(fn, time);
		}
	}

	$(document).on('scroll', debounce(activateAnchorLink));

	var setNavigationButtons = function() {
		var $docs = $('section.docs');
		if (!$docs.length) {
			return;
		}
		var $buttons = $docs.find('.nav-buttons');
		$buttons.empty();
		var $active = $docs.find('.articles.menu a.active');
		var $prev = $active.prev('a');
		var $next = $active.next('a');
		if ($prev.length) {
			$buttons.append('<a href="' + $prev.attr('href') + '" class="nav-button prev"><small>Previous</small><span>' + $prev.text() + '</span></a>');
		}
		if ($next.length) {
			$buttons.append('<a href="' + $next.attr('href') + '" class="nav-button next"><small>Next</small><span>' + $next.text() + '</span></a>');
		}
	}

	var highlightCode = function() {
		$('.codeblock').each(function() {
			var $codeblock = $(this);
			var language = $codeblock.attr('language');
			var description = $codeblock.attr('description');
			$codeblock.prepend('<div class="codeblock-header"><div class="description">' + description + '</div><div class="actions"><button class="copy-code">Copy</button></div>');
			var $codebody = $codeblock.find('.codeblock-body');
			$codebody.addClass('language-' + language);
			$codeblock.data('code', $codebody.text());
			if (language != 'terminal') {
				$codebody.addClass('highlight');
			}
		});
		hljs.configure({
			cssSelector: 'pre.codeblock-body.highlight'
		});
		hljs.highlightAll();
	}

	$(document).on('click', '.codeblock .copy-code', function() {
		var $this = $(this);
		var $codeblock = $this.closest('.codeblock');
		var code = $codeblock.data('code');
		navigator.clipboard.writeText(code);
	});

	$(document).on('click', '.copy-anchor-link', function(e) {
		e.preventDefault();
		var $this = $(this);
		var href = window.location.origin + window.location.pathname + $this.attr('href');
		navigator.clipboard.writeText(href);
	});

	docs.linkDocumentHeaders = linkDocumentHeaders;
	docs.setNavigationButtons = setNavigationButtons;
	docs.highlightCode = highlightCode;

})();
