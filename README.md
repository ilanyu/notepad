# notepad
http://bj.lanyus.com/

数据库部分：
数据库名：notepad
结构：
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `uri` varchar(255) NOT NULL,
  `content` text,
  `password` varchar(255) DEFAULT NULL,
  `is_lock` varchar(255) DEFAULT '0',
  PRIMARY KEY (`uri`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
用户名：root
密码为空

如需修改，请在src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml中修改
