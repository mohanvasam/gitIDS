function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

var coupon='';
var courseId='';
var streamCourseId='';
var state='';

$(document).ready(function() {
    if(document.getElementById('COUPON')){	
	    coupon=document.getElementById('COUPON').value;
    }	
    if(document.getElementById('COURSEID')){
            courseId=document.getElementById('COURSEID').value;
    }
    if(document.getElementById('STATEID')){
            state=document.getElementById('STATEID').value;
    }
    if(document.getElementById('STREAMCOURSEID')){
            streamCourseId=document.getElementById('STREAMCOURSEID').value;
    }
    var courseSelected = getCookie('COURSE_SELECTED');	
    if(courseSelected && courseSelected == 'STREAMING'){
	showStreaming();
    }else if(courseSelected && courseSelected == 'TEXT_AUDIO'){
	showAudio();
    }else{
	showTextBased();
    }
    $('.course-aval a').click(function(){
	    $('.course-aval a').removeClass('course-active');
            $(this).addClass('course-active');
    });
	
});		

function showStreaming(){
	setCookie('COURSE_SELECTED','STREAMING',45);
	if(document.getElementById("stream-price")){
       		document.getElementById("stream-price").style.display='';
	        document.getElementById("stream-org-price").style.display='';
	}
	if(document.getElementById("audio-based-price")){
		document.getElementById("audio-based-price").style.display='none';
	        document.getElementById("audio-based-org-price").style.display='none';
	}
	document.getElementById("text-based-price").style.display='none';
	document.getElementById("text-based-org-price").style.display='none';
	if(state=='MI' || state=='FL'){
                document.getElementById("reg-button").href="/signup/displayCourseSelection.pl?COURSEID="+streamCourseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
        }else if(state=='NY'){
                document.getElementById("reg-button").href="/signup/displayCreateAccount.pl?COURSEID="+streamCourseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
        }else{
                document.getElementById("reg-button").href="/signup/processRegulatorSelection.pl?COURSEID="+streamCourseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
        }

}

function showTextBased(){
	setCookie('COURSE_SELECTED','TEXT',45);
	if(document.getElementById("stream-price")){
	        document.getElementById("stream-price").style.display='none';
        	document.getElementById("stream-org-price").style.display='none';
	}
        document.getElementById("text-based-price").style.display='';
        document.getElementById("text-based-org-price").style.display='';
	if(document.getElementById("audio-based-price")){
		document.getElementById("audio-based-price").style.display='none';
        	document.getElementById("audio-based-org-price").style.display='none';
	}
	if(state=='MI' || state=='FL'){
		document.getElementById("reg-button").href="/signup/displayCourseSelection.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
	}else if(state=='NY'){
		document.getElementById("reg-button").href="/signup/displayCreateAccount.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
	}else{
		document.getElementById("reg-button").href="/signup/processRegulatorSelection.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon;
	}
}

function showAudio(){
	setCookie('COURSE_SELECTED','TEXT_AUDIO',45);
	if(document.getElementById("stream-price")){
	        document.getElementById("stream-price").style.display='none';
        	document.getElementById("stream-org-price").style.display='none';
	}
        document.getElementById("text-based-price").style.display='none';
        document.getElementById("text-based-org-price").style.display='none';
	if(document.getElementById("audio-based-price")){
		document.getElementById("audio-based-price").style.display='';
        	document.getElementById("audio-based-org-price").style.display='';
	}
	if(state=='MI' || state=='FL'){
                document.getElementById("reg-button").href="/signup/displayCourseSelection.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon+"&amp;AUDIO_FLAG=1";
        }else if(state=='NY'){
                document.getElementById("reg-button").href="/signup/displayCreateAccount.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon+"&amp;AUDIO_FLAG=1";
        }else{
                document.getElementById("reg-button").href="/signup/processRegulatorSelection.pl?COURSEID="+courseId+"&amp;STATE="+state+"&amp;COUPON="+coupon+"&amp;AUDIO_FLAG=1";
        }

}

var udwin = null;
function win_popup(url,w,h) {
       if (top.opener && !top.opener.closed) {
	       try {
        	       opener.location.reload(1);
               }
               catch(e) { }
               //     window.close();
               }
       udwin = window.open(url,"unique","width="+w+",height="+h+",resize=no,scrollbars=yes");
       udwin.focus();
}
