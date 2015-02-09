jQuery(function() {
  $('.go-to-the-top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
  });

  $('.go-to-info').click(function () {
    $('body, html').animate({ scrollTop: $('#help').position().top }, 500);
    return false;
  });

  $('.code-label').prepend('<i class="fa fa-code"></i> ');

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
