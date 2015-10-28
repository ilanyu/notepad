<%--
  Created by IntelliJ IDEA.
  User: Ly
  Date: 2015/10/27
  Time: 19:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <script type='text/javascript'>var _sf_startpt = (new Date()).getTime()</script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="description" content="在云端的一张纸."/>
    <link rel="shortcut icon" type="image/gif" href="images/favicon.gif"/>
    <title>在线记事本 - 在云端的一张纸</title>
    <meta name="description" content="A service by Jacob Bijani."/>
    <link rel="stylesheet" href="stylesheets/master.css?3" type="text/css" media="screen" charset="utf-8"/>
    <link rel="stylesheet" href="stylesheets/print.css?3" type="text/css" media="print" charset="utf-8"/>

    <script src="javascript/prototype.js" type="text/javascript"></script>
    <script type="text/javascript" charset="utf-8">
        var assets_version = 3;
        var is_iphone_os = false;

        var pad_name = '${uri}';

        var disable_autosave = false;
        var read_only_mode = false;

        var caret_position = 0;
        var scroll_position = 0;
    </script>
    <script type="text/javascript" src="javascript/application.js?3"></script>

    <!-- e:n -->
</head>
<body id="body">
<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-1465536-18']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
</script>

<div id="promo">

</div>

<div class="stack ">
    <div class="layer_1">
        <div class="layer_2">
            <div class="layer_3">
                <textarea name="contents" id="contents" class="contents " spellcheck="true">${content}</textarea>
            </div>
        </div>
    </div>
</div>

<div id="printable_contents" class="contents "></div>

<div id="unsaved" style="display:none;"></div>
<div id="loading" style="display:none;"></div>

<div id="controls">

    <a href="${uri}">${url}</a>

    <span class="bubble_wrapper" onclick="just_clicked_bubble = 'set_password';">
        <a href="${uri}#" onclick="just_clicked_bubble = 'set_password'; return false;">设置密码</a>
        <div class="bubble" id="bubble_for_set_password" style="display:none;">
            <div class="highlight"></div>
            <form action="${baseurl}/options/password/set/${uri}" method="post">
                <input type="password" class="text_input" name="password" id="set_password_input"
                       value=""/>
                <input type="submit" class="button" value="保存"/>
            </form>
            <div class="nipple"></div>
        </div>
    </span>
</div>

<script type='text/javascript'>
    var _sf_async_config = {};
    /** CONFIGURATION START **/
    _sf_async_config.uid = 10600;
    _sf_async_config.domain = 'notepad.cc';
    _sf_async_config.useCanonical = true;
    _sf_async_config.sections = 'Change this to your Section name';  //CHANGE THIS
    _sf_async_config.authors = 'Change this to your Author name';    //CHANGE THIS
    /** CONFIGURATION END **/
    (function () {
        function loadChartbeat() {
            window._sf_endpt = (new Date()).getTime();
            var e = document.createElement('script');
            e.setAttribute('language', 'javascript');
            e.setAttribute('type', 'text/javascript');
            e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
            document.body.appendChild(e);
        }

        var oldonload = window.onload;
        window.onload = (typeof window.onload != 'function') ?
                loadChartbeat : function () {
            oldonload();
            loadChartbeat();
        };
    })();
</script>
</body>
</html>
