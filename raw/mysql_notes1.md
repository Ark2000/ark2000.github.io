# 数据库学习笔记（一）

![database](./../assets/database.jpg)

*最后一次更新于: Saturday, April 18, 2021 (GMT+8)*

参考资料: [MySQLTUTORIAL](https://mysqltutorial.org/)



## 安装

由于安装这一部分，不同的版本，不同的机器，不同的系统，都有着这样那样的问题，建议面向搜索引擎完成安装，这里就不废话了。

## 本地客户端连接到数据库

```bash
mysql -uroot -p
```

然后输入密码回车，之前遇到了必须加`sudo`前缀的问题，以及错误码`1698`，后来折腾了老半天解决了，参考[StackOverflow](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)。

```mysql
mysql> show databases;
```

显示所有的数据库。

## 导入数据库

```mysql
mysql > source c:\temp\mysqlsampledatabase.sql;
```

通过source语句导入本地SQL数据库。

## SELECT语句

示例

```mysql
SELECT select_list
FROM tbl_name;

SELECT 
	lastName,
	firstName,
	jobTitle
FROM
	employees;
	
SELECT *
FROM employees;
```



`SELECT`和`FROM`是关键字，大小写不敏感，MySQL首先计算FROM子句的值，其次是SELECT子句的值。

其中，`select_list`是一个column列表，包含一到多个column名，使用comma分隔开，如果使用asterisk(*)，将选取所有的column。

注意，不建议使用asterisk(*)，理由如下：

- 你并不一定需要所有的column，取回所有的column需要花费更多的IO和网络资源
- 当你显式指出所有的column时，会使代码更容易管理和阅读。如果有人修改了column，你获得的column可能会让你失望
- 可能会暴露重要的数据给无关的用户



## ORDER BY排序

```mysql
SELECT
	select_list
FROM
	table_name
ORDER BY
	column1 [ASC | DESC],
	column2 [ASC | DESC]
```

形式大概是这样子，`ASC`代表升序，`DESC`代表降序，默认使用`ASC`。

如果是根据多个column进行排序，每一个column排序都将在前一个排序的基础之上进行，这么说可能有点模糊，自己随便试一试就知道怎么回事了，不过我觉得这个可能不是很常用。

也可以在语句中使用表达式

```mysql

```

