<%--
  Created by IntelliJ IDEA.
  User: Ly
  Date: 2015/10/28
  Time: 13:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <script type='text/javascript'>var _sf_startpt=(new Date()).getTime()</script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="A piece of paper in the cloud." />
  <link rel="shortcut icon" type="image/gif" href="/images/favicon.gif" />
  <title>请输入密码 / ${uri}</title>
  <meta name="description" content="A service by Jacob Bijani." />
  <link rel="stylesheet" href="/stylesheets/master.css?3" type="text/css" media="screen" charset="utf-8" />
  <link rel="stylesheet" href="/stylesheets/print.css?3" type="text/css" media="print" charset="utf-8" />

  <script src="/javascript/prototype.js" type="text/javascript"></script>
  <script type="text/javascript" charset="utf-8">
    var assets_version = 3;
    var is_iphone_os = false;

    var pad_name = '${uri}';

    var disable_autosave = false;
    var read_only_mode   = false;

    var caret_position  = 911;
    var scroll_position = 3;
  </script>
  <script type="text/javascript" src="/javascript/application.js?3"></script>

  <!-- e:y -->
</head>
<body id="body">
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1465536-18']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

<div id="promo">

</div>

<div class="input_form" style="margin-bottom:40px;">
  <div class="copy" style="margin-bottom:50px;">
    This notepad is password protected.
  </div>

  <form action="/options/password/post/${uri}" method="post">
    <input id="pad_name" name="uri" type="hidden" value="${uri}"/>
    <div class="input_wrapper">
      <input class="text_input" type="password" value="" id="pad_password" name="password"/>            <label for="pad_password">password</label>
    </div>

    <div style="text-align:center;">
      <input type="submit" class="big_button" value="Login" />
    </div>
  </form>
</div>
<div id="unsaved" style="display:none;"></div>
<div id="loading" style="display:none;"></div>

<div id="controls">
  <a href="/">notepad.cc</a>
</div>

<script type='text/javascript'>
  var _sf_async_config={};
  /** CONFIGURATION START **/
  _sf_async_config.uid = 10600;
  _sf_async_config.domain = 'notepad.cc';
  _sf_async_config.useCanonical = true;
  _sf_async_config.sections = 'Change this to your Section name';  //CHANGE THIS
  _sf_async_config.authors = 'Change this to your Author name';    //CHANGE THIS
  /** CONFIGURATION END **/
  (function(){
    function loadChartbeat() {
      window._sf_endpt=(new Date()).getTime();
      var e = document.createElement('script');
      e.setAttribute('language', 'javascript');
      e.setAttribute('type', 'text/javascript');
      e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
      document.body.appendChild(e);
    }
    var oldonload = window.onload;
    window.onload = (typeof window.onload != 'function') ?
            loadChartbeat : function() { oldonload(); loadChartbeat(); };
  })();
</script>
</body>
</html>
