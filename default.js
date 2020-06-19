function ById(id){
    return document.getElementById(id)
}

function ValueById(id){
    return ById(id).value
}

// to be used in very bad cases only!
function ClBr(){
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("opera") != -1)
        return 'O';
    if (agt.indexOf("staroffice") != -1)
        return 'SO';
    if (agt.indexOf("beonex") != -1)
        return 'B';
    if (agt.indexOf("chimera") != -1)
        return 'C';
    if (agt.indexOf("netpositive") != -1)
        return 'NP';
    if (agt.indexOf("phoenix") != -1)
        return 'PH';
    if (agt.indexOf("firefox") != -1)
        return 'FX';
    if (agt.indexOf("safari") != -1)
        return 'SF';
    if (agt.indexOf("skipstone") != -1)
        return 'SS';
    if (agt.indexOf("msie") != -1)
        return 'IE';
    if (agt.indexOf("netscape") != -1)
        return 'N';
    if (agt.indexOf("mozilla/5.0") != -1)
        return 'M';
    if (agt.indexOf('\/') != -1) {
        if (agt.substr(0, agt.indexOf('\/')) != 'M') {
            return navigator.userAgent.substr(0, agt.indexOf('\/'));
        }
        else
            return 'N';
    }
    else
        if (agt.indexOf(' ') != -1)
            return navigator.userAgent.substr(0, agt.indexOf(' '));
        else
            return navigator.userAgent;
}

function CloseWindow(){
    if (arguments.length > 0) {
        window.opener.location.reload();
    }
    window.close();
}

function validate(cValue, pattern, extraOptions){
    extraOptions = (extraOptions == null ? "i" : extraOptions)
    var patternRE = new RegExp(pattern, extraOptions);
    if (patternRE.test(cValue)) {
        return true;
    }
    else {
        return false;
    }
}

function sHide(id){
    var el = document.getElementById(id);
    el.style.display = "none";
}

function sShow(id, vblock){
    var el = document.getElementById(id);
    el.style.display = (vblock == null ? "block" : vblock);
}

function doOpen(url, height, width){
    if (height == null) {
        height = screen.height - 120;
    }
    if (width == null) {
        width = screen.width - 80;
    }
    window.open(url, '_blank', "top=30,left=30,width=" + width + ",height=" + height +
    ",resizable=yes,scrollbars=yes");
}


function Match(sString, sMatch){
    var r, re;
    re = new RegExp(sMatch, "i");
    r = sString.match(re);
    return (r);
}

function getHTTPObject(){
    var xmlhttp;
    /*@cc_on
     @if (@_jscript_version >= 5)
     try {
     xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
     try {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     } catch (E) {
     xmlhttp = false;
     }
     }
     @else
     xmlhttp = false;
     @end @*/
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlhttp = new XMLHttpRequest();
        }
        catch (e) {
            xmlhttp = false;
        }
    }

    return xmlhttp;
}

function toggleFilters(){
    var block = document.getElementById("filters");
    var link = document.getElementById("filters_link");
    if (block.style.display == "none") {
        block.style.display = "block";
        link.innerHTML = "<< Hide Filters";
    }
    else {
        block.style.display = "none";
        link.innerHTML = "Show Filters >>";
    }
}

function toggleFiltersAr(){
    var block = document.getElementById("filters");
    var link = document.getElementById("filters_link");
    if (block.style.display == "none") {
        block.style.display = "block";
        link.innerHTML = "Ø¥Ø®ÙÙŠ Ø®ØµØ§Ø¦Øµ Ø§Ù„Ø¨Ø­Ø« >>";
    }
    else {
        block.style.display = "none";
        link.innerHTML = "<< Ø£Ø¸Ù‡Ø± Ø®ØµØ§Ø¦Øµ Ø§Ù„Ø¨Ø­Ø«";
    }
}

function isEnterHit(e){
    var characterCode
    if (e && e.which) {
        e = e
        characterCode = e.which
    }
    else {
        e = event
        characterCode = e.keyCode
    }
    return (characterCode == 13 ? true : false)
}

function confirm_action(loc, msg, action){
    if (confirm(msg)) {
        if (action == 1) {
            eval(loc);
        }
        else {
            document.location = loc;
        }
    }
}

function upTo(el, tag){
    var rel = el;
    do {
        rel = rel.parentNode;
    }
    while (rel.parentNode.tagName.toUpperCase() != tag.toUpperCase())
    return rel;
}

function massChange(cName){
    for (var i = 1; i < arguments.length; i++) {
        var E = ById(arguments[i]);
        if (E)
            E.className = cName;
    }
}

function doBlink(){
    var blink = document.all.tags("BLINK")
    for (var i = 0; i < blink.length; i++)
        blink[i].style.visibility = blink[i].style.visibility == "" ? "hidden" : ""
}

function onloadblink(){
    if (ClBr() == "IE") {
        setInterval("doBlink();", 500)
    }
}

function onloadieup(){
    if (ClBr() == "IE") {
        ById('slave').className = 'damnie';
    }
}

function distinct_chars(str){
    var dc = 0;
    while (str != '') {
        str = str.replace(new RegExp(str.substr(0, 1), 'g'), '');
        dc++;
    }
    return dc;
}

function tableRowDisplay(){
    return (ClBr() == "IE" ? "block" : "table-row")
}

function CBDisplay(ie, noneie){
    return (ClBr() == "IE" ? ie : noneie)
}

function MassCheck(formid, chkName, val){
    var form = ById(formid);
    for (var i = 0; i < form.elements.length; i++)
        if (form.elements[i].name == chkName)
            form.elements[i].checked = val;
}

//PARAMS: 	number		:		The number to format - default 0
//			decCount	:		Number of digits after the decimal - default 2
//			digGrpSym	:		Digit Grouping Symbol - default ,
//			decimalSym	:		Decimal symbol - default .
//			currBefore	:		Display String before the formatted number (as currency before the string $ 123.123) - default ''
//			currAfter	:		Display String after the formatted number (as currency after the string 123.123 $) - default ''
//			negBefore	:		Anything before the formatted number and after "currBefore" to be displayed if the number is negative - default -
//			negAfter	:		Anything after the formatted number and before "currAfter" to be displayed if the number is negative - default ''
function formatNumber(number, decCount, digGrpSym, decimalSym, currBefore, currAfter, negBefore, negAfter){
    number = (typeof(number) != 'undefined' ? number : 0);
    decCount = (typeof(decCount) != 'undefined' ? decCount : 2);
    digGrpSym = (typeof(digGrpSym) != 'undefined' ? digGrpSym : ',');
    decimalSym = (typeof(decimalSym) != 'undefined' ? decimalSym : '.');
    currBefore = (typeof(currBefore) != 'undefined' ? currBefore : '');
    currAfter = (typeof(currAfter) != 'undefined' ? currAfter : '');
    negBefore = (typeof(negBefore) != 'undefined' ? negBefore : '-');
    negAfter = (typeof(negAfter) != 'undefined' ? negAfter : '');

    var roundedNumWithMovedDec = Math.round(number * Math.pow(10, decCount));
    if (roundedNumWithMovedDec >= 0)
        negBefore = negAfter = '';
    var splittedRoundedNumWithMovedDec = ('' + Math.abs(roundedNumWithMovedDec)).split('');
    var numberLengthWithoutDec = splittedRoundedNumWithMovedDec.length - decCount;
    if (numberLengthWithoutDec < 0)
        numberLengthWithoutDec--;
    for (var i = numberLengthWithoutDec; i < 0; i++)
        splittedRoundedNumWithMovedDec.unshift('0');
    if (numberLengthWithoutDec < 0)
        numberLengthWithoutDec = 1;
    splittedRoundedNumWithMovedDec.splice(numberLengthWithoutDec, 0, decimalSym);
    if (splittedRoundedNumWithMovedDec[0] == decimalSym)
        splittedRoundedNumWithMovedDec.unshift('0');
    while (numberLengthWithoutDec > 3) {
        numberLengthWithoutDec -= 3;
        splittedRoundedNumWithMovedDec.splice(numberLengthWithoutDec, 0, digGrpSym);
    }
    var formattedNumber = currBefore + negBefore + splittedRoundedNumWithMovedDec.join('') + negAfter + currAfter;
    return formattedNumber;
}

function setSelectedIndex(fieldId, fieldValue){
    var selectField = document.getElementById(fieldId);
    var i;
    for (i = 0; selectField.options[i] && selectField.options[i].value != fieldValue; i++) {

    }
    if (selectField.options[i] && selectField.options[i].value == fieldValue) {
        selectField.selectedIndex = i;
    }
}

function setFieldValue(fieldId, fieldValue){
    document.getElementById(fieldId).value = fieldValue;
}

//for selectsearch wigdet
function filterSelectBox(selectFilter, mySelect, div){
    var searchValue = selectFilter;
    var selectField = document.getElementById(mySelect);
    var optionsLength = selectField.options.length;
    var bzuDiv = document.getElementById(div);
    var str = "";
    var count = 0;
    var count_match = 0;
    if (searchValue.length > 3) {
        for (var i = 0; i < optionsLength; i++) {
            if (count > 20) {
                str = str + "<div> More Than 20 </div>";
                break;
            }
            var currentTagTokens = searchValue.split(" ");
            count_match = 0;
            for (var j = 0; j < currentTagTokens.length; j++) {
                if (selectField.options[i].innerHTML.toLowerCase().indexOf(currentTagTokens[j].toLowerCase()) >= 0) {
                    count_match++;
                }
            }
            if (count_match == currentTagTokens.length) {
                count++;
                str = str + "<div style=\"cursor:pointer;\" onmouseover=\"this.style.backgroundColor='#abcdef';\" onmouseout=\"this.style.backgroundColor='';\" onclick=setValue('" + mySelect + "'," + selectField.options[i].index + ',' + div + ");><b>" + selectField.options[i].innerHTML + "</b></div>";
            }
        }
    }
    else {
        str = "";
    }
    bzuDiv.innerHTML = str;

}

function setValue(mySelect, opVal, div){
    var selectField = document.getElementById(mySelect);
    var optionsLength = selectField.options.length;
    for (var i = 0; i < optionsLength; i++) {
        if (selectField.options[i].index == opVal) {
            selectField.options[i].selected = 'selected';
            div.innerHTML = ""
            break;
        }
    }
}

function checkOther(mySelect, otherFild){
    mySelect = ById(mySelect);
    if (mySelect.value == "other" || mySelect.value == "0") {
        ById(otherFild).disabled = false;
    }
    else {
        ById(otherFild).disabled = true;
    }
}

$(document).ready(function(){
	$('#settings,#username_container').click(function() {
	    $('.user_area .arrow_up').toggle();
	    $('#settings_box').toggle();
	    var currentUsername = $('#settings_box .user_img').attr('data-username');
	    if ($('#settings_box .user_img').attr('src') == '/images/loading.gif') {
	        $('#settings_box .user_img').attr('src', '/user-image?' + currentUsername);
	    }
	    return false;
	});

	if (typeof menuList !== 'undefined' && menuList instanceof Array) {
	    $('#srch_menu').autocomplete({
	        minLength: 3,
	        position: {my: 'right top', at: 'right bottom'},
	        source: menuList,
            focus: function( event, ui ) {
                $(this).val(ui.item.label);
                return false;
            },
	        select: function(event, ui) {
	            $(this).val(ui.item.label);
	            $(location).attr('href', ui.item.value);
	            return false;
	        }
	    }).on('dblclick keyup', function(e) {
	        var studId = $(this).val();
	        if (studId.match(/^[891]\d{5,6}$/) && parseInt(studId) > 700001 && parseInt(studId) < 1999999) {
	            if(e.type != 'keyup' || e.keyCode == 13) {
	                $(location).attr('href', '/hemis/students/all-terms?student=' + studId);
	            }
	        }
	    });
	}

	$(document).mouseup(function(e) {
		var toggleElements = $("#settings,#username_container,.user_area .arrow_up");
	    //return if the clicked element is the toggle element itself
	    if (toggleElements.has(e.target).length != 0 || toggleElements.is(e.target)) {
	    	return;
	    }

	    var container = $("#settings_box,.user_area .arrow_up");
	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        container.hide();
	    }
	});
	if (ClBr() == "IE" && window.location.pathname == "/reg/") {
		$(window).resize(function() {
			var height = 0;
			if( typeof( window.innerWidth ) == 'number' ) {
				height = window.innerHeight;
			} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			    //IE 6+ in 'standards compliant mode'
				height = document.documentElement.clientHeight;
			} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			    //IE 4 compatible
				height = document.body.clientHeight;
			}
			$('#slave').css('height', height - 108);
		}).resize();
	}

	if ($('textarea.ritaj-rte').size() > 0 && $.isFunction($.fn.tinymce)) {
	    $('textarea.ritaj-rte').tinymce({
	        script_url : '/resources/tinymce/4.0/tinymce.min.js',
	        plugins: [
	                  "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
	                  "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
	                  "table contextmenu directionality emoticons template textcolor textcolor paste"
                  ],
	        toolbar1: "undo redo | cut copy paste pastetext | bold italic underline strikethrough subscript superscript | ltr rtl | alignleft aligncenter alignright alignjustify",
	        toolbar2: "bullist numlist | link unlink anchor image media emoticons | inserttime preview code | forecolor backcolor | fontselect fontsizeselect",
	        toolbar_items_size: 'small',
	        relative_urls: false,
	    });
	}
});
