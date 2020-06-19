// for global use
var waitModal = $('<div class="modal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body text-center"><img src="/images/loading.gif" /></div></div></div></div>');
$(document).ready(function() {

  $(function() {
    $('[data-toggle="tooltip"]').tooltip()
  });

  $(window).scroll(function() {
    var header = $('.header_top');
    if (header.length) {
      if (header.offset().top > 20) {
        header.addClass('ritaj_shadow');
      } else {
        header.removeClass('ritaj_shadow');
      }
    }
  });
  if ($('.with_app_menu').height() < $('.app_menu').height()) {
    $('.with_app_menu').css('min-height', $('.app_menu').height());
  }
  $("ul.navigation").supersubs({
    minWidth: 12,
    maxWidth: 27,
    extraWidth: 1
  }).superfish({
    animation: {
      opacity: 'show',
      height: 'show'
    }
  });

  var menuTextArray = new Array();
  var menuMap = {};
  $("ul.navigation a").each(function() {
    if ($(this).attr('href') != "javascript:undefined") {
      menuTextArray[menuTextArray.length] = $(this).text();
      menuMap[$(this).text()] = $(this).attr('href');
    }
  });

  $(document).ajaxSend(function(event, request, settings) {
    if (!waitModal.hasClass('in')) {
      waitModal.modal({
        backdrop: 'static',
        show: true,
        keyboard: false,
      });
    }
  });

  $(document).ajaxComplete(function(event, request, settings) {
    waitModal.modal('hide');
  });

  var Menu = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: menuTextArray
  });
  var searchTypeahead = $('#search_input').typeahead(null, {
    source: Menu,
  });
  searchTypeahead.on('typeahead:selected', function(evt, data) {
    window.location.href = menuMap[data];
  });


  $('#settings,#username_container').click(function() {
    $('#notification_box').hide();
    $('#settings_box').toggle();
    var currentUsername = $('#settings_box .user_img').attr('data-username');
    if ($('#settings_box .user_img').attr('src') == '/images/loading.gif') {
      $('#settings_box .user_img').attr('src', '/user-image?' + currentUsername);
    }
    return false;
  });

  $('#notification_count').click(function() {
    $('#settings_box').hide();
    $('#notification_box').toggle();
  });

  $(document).mouseup(function(e) {
    var toggleElements = $("#settings,#username_container,#notification_count");
    //return if the clicked element is the toggle element itself
    if (toggleElements.has(e.target).length != 0 || toggleElements.is(e.target)) {
      return;
    }

    var container = $("#notification_box,#settings_box");
    if (!container.is(e.target) // if the target of the click isn't the container...
      &&
      container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      container.hide();
    }
  });

  $('.app_menu li:eq(0)').click(function() {
    $('.app_menu').toggleClass('app_menu_hidden');
    $('.app_menu li:gt(0)').toggleClass('hide');
    $('.app_menu .hide_arrow').toggleClass('hide');
    $('.app_menu li:eq(0)').toggleClass('vertical_app_menu');
    $('.main_container').toggleClass('with_app_menu');
    $('.main_container').toggleClass('with_hidden_app_menu');
  });

  $('input[data-date-format!=""][data-date-format]').each(function() {
    $(this).datetimepicker({
      pickDate: ($(this).attr('data-pickdate') == 'false' ? false : true),
      pickTime: ($(this).attr('data-picktime') == 'false' ? false : true),
      useMinutes: ($(this).attr('data-useminutes') == 'false' ? false : true),
      useSeconds: ($(this).attr('data-useseconds') == 'false' ? false : true),
      useCurrent: ($(this).attr('data-usecurrent') == 'false' ? false : true),
      minDate: ($(this).attr('data-mindate') == '' ? '' : new Date($(this).attr('data-mindate'))),
      maxDate: ($(this).attr('data-maxdate') == '' ? '' : new Date($(this).attr('data-maxdate'))),
      showToday: ($(this).attr('data-showtoday') == 'false' ? false : true),
      language: 'en',
    });
  });

  $('select[data-disable-chosen!="true"]').each(function() {
    $(this).addClass((siteLocale == 'ar' ? 'chosen-rtl' : ''));
    $(this).chosen({
      allow_single_deselect: true,
      disable_search_threshold: 6,
      search_contains: true,
      placeholder_text_single: (siteLocale == 'ar' ? 'حدد اختيارا' : 'Select an Option'),
      placeholder_text_multiple: (siteLocale == 'ar' ? 'حدد بعض الخيارات' : 'Select Some Options'),
      no_results_text: (siteLocale == 'ar' ? 'لا يوجد خيارات مطابقة' : 'No results match')
    });
  });

  if ($('textarea').hasClass('tinymce')) {
    tinymce.init({
      selector: ".tinymce",
      menubar: true,
      language: (typeof siteLocale != 'undefined' ? siteLocale : 'en'),
      plugins: [
        "advlist autolink lists link charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime nonbreaking save table contextmenu directionality",
        "emoticons paste textcolor"
      ],
      toolbar1: "insertfile undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | link",
      toolbar2: "print preview | forecolor backcolor emoticons",
    });
  }

  $('button[data-redirect-url!=""][data-redirect-url]').click(function() {
    window.location.href = $(this).attr('data-redirect-url');
    return false;
  });

  $('#addCollection').click(function() {
    var currentCount = $('form > fieldset > fieldset').length;
    var template = $('form > fieldset > span').data('template');
    template = template.replace(/__index__/g, currentCount);
    $('form > fieldset').append(template);
    return false;
  });

  $('body').on('click', 'button.remove-collection-btn', function() {
    $(this).closest('fieldset').remove();
    return false;
  });

  $('input[data-employee-element]').each(function() {
    var element = $(this);
    var searchParamsstring = '';
    $.each(this.attributes, function() {
      if (this.specified && this.name != 'data-employee-element' && (this.name.substr(0, 4)) == 'data') {
        searchParamsstring += '&' + this.name.substr(5) + '=' + this.value;
      }
    });
    var employees = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '/be1/employee/employee/search-employee?str=%QUERY' + searchParamsstring,
        wildcard: '%QUERY'
      }
    });
    var searchTypeahead = element.typeahead({
      minLength: 4,
    }, {
      name: 'employee',
      valueKey: 'id',
      display: 'id',
      source: employees,
      limit: 100,
      templates: {
        suggestion: function(data) {
          return '<p>' + data['name'] + '</p>';
        }
      }
    });
    element.on('typeahead:selected', function(e, data) {
      $('#employee-name-element').remove();
      element.after("<span id='employee-name-element'>" + data.name + "</span>");
    });
  });

  $('input[data-student-element]').each(function() {
    var element = $(this);
    var searchParamsstring = '';
    $.each(this.attributes, function() {
      if (this.specified && this.name != 'data-student-element' && (this.name.substr(0, 4)) == 'data') {
        searchParamsstring += '&' + this.name.substr(5) + '=' + this.value;
      }
    });
    var students = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '/be1/student/student/search-student?str=%QUERY' + searchParamsstring,
        wildcard: '%QUERY'
      }
    });
    var searchTypeahead = element.typeahead({
      minLength: 4,
    }, {
      name: 'studnet',
      valueKey: 'id',
      display: 'id',
      source: students,
      templates: {
        suggestion: function(data) {
          return '<p>' + data['name'] + '</p>';
        }
      }
    });
    element.on('typeahead:selected', function(e, data) {
      $('#student-name-element').remove();
      element.after("<span id='student-name-element'>" + data.name + "</span>");
    });
  });

  // set placeholder in zfcDatagrid
  $('form[name="form_defaultGrid"] table thead tr:nth-child(2) td > input').each(function() {
    var tableParent = $(this).parents("table");
    var thLink = tableParent.find('thead tr:nth-child(1) th').eq($(this).parent().parent().children().index($(this).parent())).find('a');
    if (!thLink.length) {
      var thLink = tableParent.find('thead tr:nth-child(1) th').eq($(this).parent().parent().children().index($(this).parent()));
    }
    $(this).attr("placeholder", "Search " + thLink.text().trim());
  });

  $('form').submit(function(e) {
    var form = $(this);

    // check uploaded file names
    var alphaExp = /[^ \.\u0621-\u064Aa-zA-Z0-9_-]+/;
    var errorMessage = '';
    form.find("input[type=file]").each(function(index, field) {
      const file = field.files[0];
      if (file && file.name.match(alphaExp)) {
        errorMessage = 'File name must contains only numbers or letters -\n اسم الملف يجب أن يحتوي فقط على حروف وأرقام';
        alert(errorMessage);
        return false;
      }
    });
    if (errorMessage != '') {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }

    if (form.data('submitted') === true) {
      // Previously submitted - don't submit again
      e.stopImmediatePropagation();
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored
      form.data('submitted', true);
    }

    var submits = form.find('input[type=submit],button[type=submit]');
    submits.hide();
    submits.parent().append('<img class="waiting" height="20px" src="/images/loading_small.gif" />');
    setTimeout(function() {
      form.data('submitted', false);
      submits.parent().find('img.waiting').remove();
      submits.show();
    }, 3000);
  });

  // code to handle arabic numbers and convert them to english numbers
  $(document).on('keyup change', ':input[type!="password"]', function(e) {
    var position = e.target.selectionStart;
    var code = $(this).val().charAt(position - 1).charCodeAt(0);
    if ((code >= 1632 && code <= 1641) || e.type == 'change') {
      var newVal = $(this).val().replace(/([٠١٢٣٤٥٦٧٨٩])|([0123456789])/g, function(m, $1, $2) {
        return m.charCodeAt(0) - ($1 ? 1632 : 48);
      });
      if (newVal != $(this).val()) {
        if ($(this).attr('type') == 'file') {
          errorMessage = 'File name must contains only numbers or letters -\n اسم الملف يجب أن يحتوي فقط على حروف وأرقام';
          alert(errorMessage);
        } else {
          $(this).val(newVal);
          e.target.selectionEnd = position;
        }
      }
    }
  });

  if ($(window).width() < 960) {
    $('.app_menu li:eq(0)').trigger("click");
  }

  $(document).on("click", ".deleteButtonForFieldset", function() {
    $(this).closest("fieldset").remove();
  });

  window.onscroll = function() {
    myFunction()
  };
  var appMenu = document.getElementById("app_menu");
  if (appMenu) {
    var ritajSticky = appMenu.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= ritajSticky) {
        appMenu.classList.add("ritaj-sticky")
      } else {
        appMenu.classList.remove("ritaj-sticky");
      }
    }
  }

});

function appendFieldset(selector) {
  var currentCount = $(selector + ' > fieldset').length;
  var template = $(selector + ' > span').data('template');
  template = template.replace(/__index__/g, currentCount).replace('fieldset', "fieldset class='new'");
  $(selector).append(template);
  applyChosen();
  return false;
}

function applyChosen() {
  $('select[data-disable-chosen!="true"]').each(function() {
    $(this).addClass((siteLocale == 'ar' ? 'chosen-rtl' : ''));
    $(this).chosen({
      allow_single_deselect: true,
    });
  });
}
