package com.lanyus.notepad.controller;

import com.lanyus.notepad.service.ContentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Ly on 2015/10/27.
 */
@Controller
@RequestMapping(value = "/ajax/update_contents/{[a-zA-Z0-9]+}")
public class AjaxController {

    @Resource
    ContentService service;

    @RequestMapping(method = RequestMethod.POST)
    public void update_contents(@RequestParam(value = "contents") String contents, HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI().substring(22);
        String password = service.getPasswordByUri(uri);
        if (password != null) {
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(uri)) {
                    if (!password.equals(cookie.getValue())) {
                        return;
                    }
                }
            }
        }
        if (service.getContentByUri(uri) != null) {
            service.updateContentByUri(uri,contents);
        } else {
            service.newContentByUri(uri,contents);
        }
    }
}
