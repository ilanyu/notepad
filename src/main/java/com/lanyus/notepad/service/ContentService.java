package com.lanyus.notepad.service;

import com.lanyus.notepad.dao.ContentMapper;
import com.lanyus.notepad.entity.Content;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Ly on 2015/10/27.
 */
@Service
public class ContentService {

    @Resource
    ContentMapper dao;

    public String getContentByUri(String uri) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return null;
        return content.getContent();
    }

    public String getPasswordByUri(String uri) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return null;
        return content.getPassword();
    }

    public String getLockByUri(String uri) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return null;
        return content.getIsLock();
    }

    public void updateContentByUri(String uri, String text) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return;
        content.setContent(text);
        dao.updateByPrimaryKeySelective(content);
    }

    public void updatePasswordByUri(String uri, String password) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return;
        content.setPassword(password);
        dao.updateByPrimaryKeySelective(content);
    }

    public void lockByUri(String uri) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return;
        content.setIsLock("1");
        dao.updateByPrimaryKeySelective(content);
    }

    public void unlockByUri(String uri) {
        Content content = null;
        try {
            content = dao.selectByPrimaryKey(uri);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        if (content == null)
            return;
        content.setIsLock("0");
        dao.updateByPrimaryKeySelective(content);
    }

    public void newContentByUri(String uri, String text) {
        Content content = new Content();
        content.setUri(uri);
        content.setContent(text);
        content.setIsLock("0");
        dao.insertSelective(content);
    }

}
