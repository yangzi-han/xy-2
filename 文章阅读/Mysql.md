# 文章地址
https://juejin.im/post/5d6faf8f6fb9a06b0b1c9535
# 文章概述
* **数据库增删查改** 
- 创建数据库：语法：create database 数据库 [character 字符集 collate 校对规则] 
- 查看数据库： 
- 查看所有数据库：show databases; 
- 查看某个数据库：show create database 数据库名； 
- 修改数据库：语法：alter database 数据库名 character 字符集 collate 校对规则 
- 删除数据库：语法：drop database 数据库名； 
- 切换数据库：use 数据库名； 
- 查看当前使用数据库：select database(); 
* **数据库表操作** 
**创建表语法:** 
create table 表名 ( 
    字段名 类型(长度) 约束,
    字段名 类型(长度) 约束,
    字段名 类型(长度) 约束 
    );