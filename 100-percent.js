(function(){
  var H = '60px';

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

  function getPixelsPerUnit($dom,unit){
    var div = document.createElement("div");
    var st = div.style;
    st.fontSize=$dom.css('font-size');
    st.fontFamily=$dom.css('font-family');
    st.fontWeight=$dom.css('font-weight');
    st.fontVariant=$dom.css('font-variant');
    st.fontStyle=$dom.css('font-style');
    st.lineHeight=$dom.css('line-height');
    st.width='100'+unit
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    // var ppx = $(div).width();
    var ppx= document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
    body.removeChild(div);
    return parseFloat(ppx) / 100;
  }

  function getPixelsPerEx($dom){
    return getPixelsPerUnit($dom,'ex');
  }

  function getPixelsPerCh($dom){
    return getPixelsPerUnit($dom,'ch');
  }

  function getRemAsPixels(){
    return Number($('body').parent().css('font-size').match(/(\d*(\.\d*)?)px/)[1]);
  }

  function getFontSizeAsPixels($dom){
    return Number($dom.css('font-size').match(/(\d*(\.\d*)?)px/)[1]);
  }

  function getViewportWidth(){
    var div = document.createElement("div");
    div.style.width = '100vw'
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    var size = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
    body.removeChild(div);
    return parseFloat(size);
  }

  function getViewportHeight(){
    var div = document.createElement("div");
    div.style.height = '100vh'
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    var size = document.defaultView.getComputedStyle(div, null).getPropertyValue('height');
    body.removeChild(div);
    return parseFloat(size);
  }

  jQuery(function($){
    // Constants
    var INCH_PER_PT = 1.0/72.0;
    var CM_PER_INCH = 2.54;
    var PT_PER_PC = 12.0;
    // var PX_PER_INCH = getPPI();
    var PX_PER_INCH = 96;

    $(window).on('load resize',function(){
      $('.spin').show();

      // Variablese
      var PX_PER_EM = getFontSizeAsPixels($('#em'));
      var PX_PER_EX = getPixelsPerEx($('#ex'));
      var PX_PER_REM = getRemAsPixels($('#rem'));
      var PX_PER_CH = getPixelsPerCh($('#ch'));

      var BROWSER_WIDTH = $( window ).width();
      var viewport_w = getViewportWidth();
      var viewport_h = getViewportHeight();
      var PX_PER_VW = viewport_w * 0.01;
      var PX_PER_VH = viewport_h * 0.01;

      console.log('viewport-w: ' + viewport_w);
      console.log('viewport-h: ' + viewport_h);
      console.log('w/h (%): ' + viewport_w/viewport_h * 100);

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

      var rem_w = (BROWSER_WIDTH / PX_PER_REM) + 'rem';
      setVal(rem_w,'rem');

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

      var ch_w = (BROWSER_WIDTH / PX_PER_CH) + 'ch';
      setVal(ch_w,'ch');

      var vw_val = viewport_w;
      var vw_w = vw_val + 'px'; // <!-- [WORKAROUND] for cross platform -->
      $('#vw').css({'width':vw_w, 'height':H});
      var vw_html = '100';
      $('#vw > .label').html(vw_html + ' <b>vw</b>');

      var vh_val = viewport_w;
      var vh_w = vh_val + 'px'; // <!-- [WORKAROUND] for cross platform -->
      $('#vh').css({'width':vh_w, 'height':H});
      var vh_html = formatVal($(window).width()/$(window).height()*100+'vh','vh').replace(' <b>vh</b>','');
      $('#vh > .label').html(vh_html + ' <b>vh</b>');

      var vmin_flag = ($(window).width() < $(window).height())? 'vw': 'vh';
      $('#vmin').css({'width':(vmin_flag == 'vw')? vw_w: vh_w, 'height':H});
      $('#vmin > .label').html(formatVal((vmin_flag == 'vw'? vw_html: vh_html)+'vmin','vmin'));

      var vmax_flag = ($(window).width() >= $(window).height())? 'vw': 'vh';
      $('#vmax').css({'width':(vmax_flag == 'vw')? vw_w: vh_w, 'height':H});
      $('#vmax > .label').html(formatVal((vmax_flag == 'vw'? vw_html: vh_html)+'vmax','vmax'));

      $('.spin').hide();
    });
  });
})();
