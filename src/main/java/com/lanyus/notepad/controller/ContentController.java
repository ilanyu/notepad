package com.lanyus.notepad.controller;

import com.lanyus.notepad.service.ContentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Ly on 2015/10/27.
 */
@Controller
@RequestMapping(value = "/{[a-zA-Z0-9]+}")
public class ContentController {

    @Resource
    ContentService service;

    @RequestMapping(method = RequestMethod.GET)
    public String printContent(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        String uri = request.getRequestURI().replaceAll("/","");
        String url = String.valueOf(request.getRequestURL());
        String baseUrl = url.replaceAll("/" + uri,"");
        String content = service.getContentByUri(uri);
        String password = service.getPasswordByUri(uri);
        if (password != null) {
            if (!password.equals("")) {
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals(uri)) {
                            if (!password.equals(cookie.getValue())) {
                                return "redirect:/options/password/show/" + uri;
                            }
                        }
                    }
                }
            }
            return "redirect:/options/password/show/" + uri;
        }
        model.addAttribute("uri",uri);
        model.addAttribute("url",url);
        model.addAttribute("baseurl",baseUrl);
        if (content != null) {
            model.addAttribute("content", content);
        }
        return "content";
    }
}
