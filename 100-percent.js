(function(){
  var H = '60px';
  var INCH_PER_PT = 1/72;
  var CM_PER_INCH = 2.54;
  var PT_PER_PC = 12;

  function toFixed(number, precision){
    if( (''+number).indexOf('.') == -1 ){ return number }

    var n = Math.floor(number);
    var f = number - n;
    return parseFloat( ''+n + '.' + ((''+f).split('.'))[1].substring(0,precision) );
  }

  function formatVal(value, unit){
    var n = toFixed(value.replace(unit,''),4);
    return n + ' <b>'+unit+'</b>';
  }

  function setVal(value, unit){
    $('#'+unit).css({'width':value, 'height':H});
    $('#'+unit+' > .label').html(formatVal(value, unit));
  }

  function getPPI(){
    var div = document.createElement("div");
    div.style.width="100in";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    var ppi = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
    body.removeChild(div);
    return parseFloat(ppi) / 100;
  }

  function getPixelsPerEx($dom){
    var div = document.createElement("div");
    var st = div.style;
    st.fontSize=$dom.css('font-size');
    st.fontFamily=$dom.css('font-family');
    st.fontWeight=$dom.css('font-weight');
    st.fontVariant=$dom.css('font-variant');
    st.fontStyle=$dom.css('font-style');
    st.lineHeight=$dom.css('line-height');
    st.width='100ex'
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    // var ppx = $(div).width();
    var ppx= document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
    body.removeChild(div);
    return parseFloat(ppx) / 100;
  }

  function getFontSizeAsPixels($dom){
    return Number($dom.parent().css('font-size').match(/(\d*(\.\d*)?)px/)[1]);
  }

  jQuery(function($){
    var PX_PER_INCH = getPPI();

    $(window).on('load resize',function(){
      var PX_PER_EM = getFontSizeAsPixels($('#em'));
      var PX_PER_EX = getPixelsPerEx($('#ex'));
      var BROWSER_WIDTH = $('#percent').width();

      var percent_w = '100%';
      $('#percent > .label').html(formatVal(percent_w,'%'));

      var px_w = BROWSER_WIDTH + 'px';
      setVal(px_w,'px');

      var pt_val = (1/INCH_PER_PT) * (1/PX_PER_INCH) * BROWSER_WIDTH;
      var pt_w = pt_val + 'pt';
      setVal(pt_w,'pt');

      var em_w = (BROWSER_WIDTH / PX_PER_EM) + 'em';
      setVal(em_w,'em');

      var ex_w = (BROWSER_WIDTH / PX_PER_EX) + 'ex';
      setVal(ex_w,'ex');

      var pc_w = (pt_val / PT_PER_PC) + 'pc';
      setVal(pc_w,'pc');

      var in_val = pt_val * INCH_PER_PT;
      var in_w = in_val + 'in';
      setVal(in_w,'in');

      var cm_val = in_val * CM_PER_INCH;
      var mm_w = (cm_val * 10) + 'mm';
      setVal(mm_w,'mm');

      var cm_w = cm_val + 'cm';
      setVal(cm_w,'cm');
    });
  });
})();
