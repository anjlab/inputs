+function ($) {
  'use strict';

  function setInputValue() {
    var val = $(this).val();
    val ? $(this).attr('value', val) : $(this).removeAttr('value');
  }

  function setTextareaValue() {
    $(this).text($(this).val());
  }

  $(document).on('change', "input[type='text'], input[type='email'], input[type='password']", setInputValue);
  $(document).on('change', "textarea", setTextareaValue);

  $.fn.refresh = setInputValue;

  $(window).on('load', function() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isFirefox || isIE) {
      $("input[type='text']:not([value]), input[type='email']:not([value]), input[type='password']:not([value])")
          .filter(function() { return $(this).val();}).refresh();
    }
  });

}(jQuery);
