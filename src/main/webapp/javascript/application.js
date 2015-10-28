function htmlspecialchars(string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nathan
    // +   bugfixed by: Arno
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +      input by: Mailfaker (http://www.weedem.fr/)
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      input by: felix
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: charset argument not supported
    // *     example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
    // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    // *     example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
    // *     returns 2: 'ab"c&#039;d'
    // *     example 3: htmlspecialchars("my "&entity;" is still here", null, null, false);
    // *     returns 3: 'my &quot;&entity;&quot; is still here'

    var optTemp = 0, i = 0, noquotes= false;
    if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 2;
    }
    string = string.toString();
    if (double_encode !== false) { // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;');
    }
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE' : 1,
        'ENT_HTML_QUOTE_DOUBLE' : 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE' : 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i=0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            }
            else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }

    return string;
}

function auto_resize(el) {
    // http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
    
    var TEXTAREA_LINE_HEIGHT = 13;
    
    var textarea = $(el);
    var newHeight = textarea.scrollHeight;
    var currentHeight = textarea.clientHeight;
    
    if (newHeight > currentHeight) {
        textarea.style.height = newHeight + (2 * TEXTAREA_LINE_HEIGHT) + 'px';
    }
}

function unix_timestamp() {
    return Math.round(new Date().getTime() / 1000);
}

function get_caret_position(el) {
    if (! $(el)) return false;
    
    el = $(el);
    
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();
        
        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }
        
        var re = el.createTextRange(),
        rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        
        return rc.text.length;
    }
    return 0;
}

function set_caret_position(el, pos){
    if (! $(el)) return false;
    
    el = $(el);
    
    if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(pos, pos);
    } else if (el.createTextRange) {
        var range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function get_scroll_position(el) {
    if (! $(el)) return false;
    
    offset = $(el).cumulativeScrollOffset();
    return offset.top;
}

function set_scroll_position(el, pos) {
    if (! $(el)) return false;
    
    $(el).scrollTop = pos;
}

var checking_if_name_exists = false;

function validate_name_exists() {
    just_clicked_bubble = true;
    
    if (! $('change_url_input')) return false;
    el = $('change_url_input');
    
    el.value = el.value.toLowerCase().replace("'", '').replace(/[^-a-z0-9]/g, '-').replace(/--+/g, '-').replace(/^-+|-+$/g, '').substr(0,50);
    
    if (el.value == '' || el.value == pad_name) {
        $('bubble_for_change_url').hide();
        $('message_for_change_url_unavailable').hide();
        
        el.value = pad_name;
    } else {
        if (! checking_if_name_exists) {
            el.addClassName('loading');
            
            new Ajax.Request('/ajax/check_if_name_exists/' + el.value, {
                onComplete: function(transport) {
                    checking_if_name_exists = false;
                    
                    if (transport.responseText == 'false') {
                        $('message_for_change_url_unavailable').hide();
                        $('form_for_set_name').submit();
                    } else {
                        if (! $('bubble_for_change_url').visible()) $('bubble_for_change_url').show();
                        $('message_for_change_url_unavailable').show();
                        el.removeClassName('loading');
                        $('change_url_input').activate();
                    }
                }
            });
        }
    }
    
    return false;
}

function _update_contents(contents_value) {
    // Immediately save contents
        
    if (saving_pad || ((last_saved_on + seconds_before_save) > unix_timestamp()) ) {
        return true;
    }
    
    window.clearTimeout(update_contents_timeout);
    
    saving_pad = true;
    unsaved_changes = false;
    last_saved_on = unix_timestamp();
    
    $('unsaved').hide();
    $('loading').show();
    
    caret_position = get_caret_position('contents');
    scroll_position = get_scroll_position('contents');
    
    new Ajax.Request('/ajax/update_contents/' + pad_name, {
        parameters: {
            contents: contents_value,
            caret_position: caret_position,
            scroll_position: scroll_position
        },
        onSuccess: function(transport) {
            chars_on_last_save = contents_value.length;
            
            saving_pad = false;
            $('loading').hide();
        },
        onFailure: function(transport) {
            $('unsaved').show();
            $('loading').hide();
            
            if (403 == transport.status) {
                alert("Sorry, you seem to be logged out. Refresh the page and log in again.");
                
                disable_autosave = true;
                if (contents_observer) contents_observer = false;
                if (update_contents_timeout) update_contents_timeout = false;
            } else {
                alert("Sorry, couldn't save contents. Try again in a few seconds.");
            }
        }
    });
}

function _determine_update_contents(contents_value) {
    window.clearTimeout(update_contents_timeout);
    update_contents_timeout = _update_contents.delay(seconds_before_save, contents_value);
    
    if (Math.abs(chars_on_last_save - contents_value.length) > new_chars_before_save) {
        window.clearTimeout(update_contents_timeout);
        _update_contents(contents_value);
    }
}

var new_chars_before_save = 50;
var seconds_before_save = 2;

var chars_on_last_save = 0;
var last_saved_on = 0;

var contents_observer = false;
var update_contents_timeout = false;

var saving_pad = false;
var unsaved_changes = false;
var just_clicked_bubble = false;

Event.observe(window, 'load', function() {
    if ($('contents')) {
        if (caret_position) {
            set_caret_position('contents', caret_position);
        } else {
            $('contents').focus();
        }
    }
    
    if ($$('.bubble')) {
        Event.observe(document, 'click', function(e) {
            if (just_clicked_bubble) {
                $$('.bubble').invoke('hide');
                $('bubble_for_' + just_clicked_bubble).show();
                
                if (just_clicked_bubble == 'change_url' && $('change_url_input')) $('change_url_input').activate();
                if (just_clicked_bubble == 'set_password' && $('set_password_input')) $('set_password_input').activate();
                if (just_clicked_bubble == 'share_this' && $('share_this_input')) $('share_this_input').activate();
                
                just_clicked_bubble = false;
            } else {
                $$('.bubble').invoke('hide');
            }
        });
    }
    
    if ($('contents') && scroll_position) set_scroll_position('contents', scroll_position);
        
    if (pad_name && ! disable_autosave && $('contents')) {
        chars_on_last_save = $('contents').value.length;
        $('printable_contents').innerHTML = htmlspecialchars($('contents').value);
        
        contents_observer = new Form.Element.Observer(
            'contents',
            0.25,
            function(el, value) {
                $('unsaved').show();
                unsaved_changes = true;
                _determine_update_contents(value);
            }
        );
        
        // Save contents when the cursor moves
        Event.observe(window, 'mousemove', function(e) {
            if (unsaved_changes) {
                _update_contents($('contents').value);
            }
        });
        
        // Save contents when the page loses focus
        Event.observe(window, 'blur', function(e) {
            if (unsaved_changes) {
                _update_contents($('contents').value);
            }
        });
        
        // Save contents before unload. Prototype mucks with onBeforeUnload
        window.onbeforeunload = function() {
            if (unsaved_changes) {
                _update_contents($('contents').value);
                return "You have unsaved content.\n\nPlease wait a few seconds before leaving the page. The content will save automatically.";
            }
        }
        
        if (is_iphone_os) {
            auto_resize('contents');
            
            Event.observe('contents', 'keyup', function(e) {
                auto_resize('contents');
            });
        }
        
        Event.observe('contents', 'keydown', function(e) {
            if (e.keyCode == Event.KEY_TAB) {
                // Catch and support tabs
                var tab = '	';
                
                var t = Event.element(e);
                var s_start = t.selectionStart;
                var s_end = t.selectionEnd;
                
                t.value = t.value.slice(0, s_start).concat(tab).concat(t.value.slice(s_end, t.value.length));
                t.selectionStart = t.selectionEnd = s_start + 1;
                
                Event.stop(e);
            } else if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
                // Save on ⌘S / ⌃S
                if (unsaved_changes) {
                    _update_contents($('contents').value);
                }
                
                Event.stop(e);
            }
            
            // } else if (e.ctrlKey || e.altKey || e.metaKey) {
            //     // Save on ⌘ and ⌃
            //     
            //     if (unsaved_changes) {
            //         _update_contents($('contents').value);
            //     }
            // }
            
            $('printable_contents').innerHTML = htmlspecialchars($('contents').value);
        });
    }
});