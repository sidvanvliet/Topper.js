/*
Topper.js - release 1.0
jQuery Notification Library
https://github.com/sidvanvliet/Topper.js
*/

if (!window.jQuery) {
    console.error('Topper.js requires jQuery in order to work.');
}

var title, content, duration, style;

function Topper(...args) {
    var a = args[0];

    title       = a.title;
    text        = a.text;
    duration    = a.duration;
    type        = a.type;
    style       = a.style;
    autoclose   = a.autoclose;
    autocloseMs = a.autocloseAfter;
    style       = a.style;

    switch(type) {
        case 'top':
            TopperTop();
            break;
        default:
            console.error('^Topper.js: Unknown type "' + type + '"');
    }
}

function TopperTop()
{
    var notifid = 'tjs-' + fromPool();

    jQuery('<div/>', {
        class: 'topper topper-top topper-' + style,
        id: notifid
    }).appendTo('body');

    jQuery('<div/>', {
        class: 'topper-content'
    }).appendTo('#'+notifid);

    $('#' + notifid).slideDown();

    var prepTitle   = '<div class="topper-title">' + title + '</div>';
    var prepText    = '<div class="topper-text">' + text + '</div>';
    var prepClose   = '<div class="topper-close" data-target="' + notifid + '">&times;</div>';

    $('#'+notifid+' .topper-content').append(prepTitle + prepText);
    $('#'+notifid).append(prepClose);

    if(autoclose == true)
    {
        setTimeout(function(){
            $('#'+notifid).fadeOut(500);
        }, autocloseMs);
    }
}

function fromPool() {

    var str = "";
    var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
    str += pool.charAt(Math.floor(Math.random() * pool.length));
  
    return str;
}

// Close Topper
$(document).on('click', '.topper-close', function(){
    $('#' + $(this).data('target')).hide();
});