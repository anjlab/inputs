+function ($) {
  'use strict';

  function setInputValue() {
    var val = $(this).val();
    val ? $(this).attr('value', val) : $(this).removeAttr('value');
  }

  function setTextareaValue() {
    $(this).text($(this).val());
  }

  $(document).on('change', ".input input[type='text'], .input input[type='email'], .input input[type='password']", setInputValue);
  $(document).on('change', ".input textarea", setTextareaValue);

  $.fn.refresh = setInputValue;

  $(window).on('load', function() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isFirefox || isIE) {
      $(".input input[type='text']:not([value]), .input input[type='email']:not([value]), .input input[type='password']:not([value])")
          .filter(function() { return $(this).val();}).refresh();
    }
  });

}(Zepto || jQuery || $);
