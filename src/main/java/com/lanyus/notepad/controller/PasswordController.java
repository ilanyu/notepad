package com.lanyus.notepad.controller;

import com.lanyus.notepad.service.ContentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Ly on 2015/10/28.
 */
@Controller
public class PasswordController {
    @Resource
    ContentService service;
    @RequestMapping(value = "/options/password/set/{[a-zA-Z0-9]+}", method = RequestMethod.POST)
    public String setPassword(@RequestParam(value = "password") String password, HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI().substring(22);
        if (service.getContentByUri(uri) == null) {
            service.newContentByUri(uri,"");
        }
        service.updatePasswordByUri(uri,password);
        Cookie cookie = new Cookie(uri,password);
        cookie.setPath("/");
        cookie.setMaxAge(-1);
        response.addCookie(cookie);
        return "redirect:/" + uri;
    }
    @RequestMapping(value = "/options/password/post/{[a-zA-Z0-9]+}", method = RequestMethod.POST)
    public String postPassword(@RequestParam(value = "password") String password,HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI().substring(23);
        if (service.getContentByUri(uri) == null) {
            service.newContentByUri(uri,"");
        }
        String truePassword = service.getPasswordByUri(uri);
        if (truePassword.equals(password)) {
            Cookie cookie = new Cookie(uri,password);
            cookie.setPath("/");
            cookie.setMaxAge(-1);
            response.addCookie(cookie);
            return "redirect:/" + uri;
        }
        return "redirect:/options/password/show/" + uri;
    }
    @RequestMapping(value = "/options/password/show/{[a-zA-Z0-9]+}", method = RequestMethod.GET)
    public String showPassword(ModelMap model,HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI().substring(23);
        model.addAttribute("uri",uri);
        return "password";
    }
}
