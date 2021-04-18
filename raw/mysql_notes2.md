# 数据库学习笔记（二）

![database](./../assets/database.jpg)

*最后一次更新于: Saturday, April 18, 2021 (GMT+8)*

参考资料: [MySQLTUTORIAL](https://mysqltutorial.org/)

本部分对应的部分为`Section 4. Filtering data`

## WHERE语句

使用`WHERE`语句以过滤结果，或者说是选择行（`SELECT`是选择列）

```sql
SELECT
	select_list
FROM
	table_name
WHERE
	search_condition
```

`serach_condition`是一系列由`AND`, `OR`, `NOT`等连接的predicate。

predicate是一个布尔表达式，结果为`TRUE`, `FALSE`, `UNKNOWN`。

在`UPDATE`和`DELETE`语句中也可以组合使用`WHERE`。

计算顺序为：`FROM` -> `WHERE` -> `SELECT`。

例子：

1. `=`用于判断是否相等， `jobTitle = 'Sales Rep'`

2. `AND`是逻辑与，`jobTitle = 'Sales Rep' AND officeCode = 1`

3. `OR`是逻辑或，`jobTitle = 'Sales Rep' OR officeCode = 1`

4. `BETWEEN`用于范围过滤，比如`officeCode BETWEEN 1 AND 3`，定位所有`officeCode`在[1, 3]之间的记录。

5. `LIKE`用于模式匹配，比如`lastName LIKE '%son'`，定位所有以`son`为后缀的lastName所在记录。使用`%`和`_`通配符(wildcard)，`%`匹配任意多的字符，`_`只匹配一个字符。

6. `IN`用于存在性判断，`officeCode IN (1, 2, 3)`，定位所有`officeCode`属于指定集合的记录。

7. `IS NULL`判断是否为`NULL`，不能使用`=`。

8. 比较运算符，`=`, `<>`或`!=`, `<`, `>`, `>=`, `<=`

## SELECT DISTINCT

`DISTINCT` 用于消除结果集合中重复的记录。

比如：
```sql
SELECT
	DISTINCT lastName
FROM
	employees
ORDER BY
	lastName;
```
如果结果集合中出现重复的`lastName`，那么只保留一条记录，消除其他的记录。

`DISTINCT`后也可以跟多个column.

一般来说,`DISTINCT`可以看作是`GROUP BY`的一个特例.

`DISTINCT`可以和aggregate function聚合函数结合使用,比如`SUM`, `AVG`, `COUNT`

For example:
```sql
SELECT
	COUNT(DISTINCT state)
FROM
	customers
WHERE
	country = 'USA';
```

`DISTINCT`和`LIMIT`结合使用
For example:
```sql
SELECT
	DISTINCT state
FROM
	customers
WHERE
	state IS NOT NULL
LIMIT 5;
```
找出5条符合条件的数据(DISTINCT state, state is NOT NULL)。

## IN

```sql
SELECT
	col1, col2, ...
FROM
	tbl
WHERE
	(expr | col_1) IN ('val1', 'val2', ...);
```

`IN`和用`OR`来判断的优点在于，`IN`使用二分查找，更快。

`NOT IN`取反。

`IN`经常和subquery一起使用

For example:
```sql
SELECT
	orderNumber,
	customerNumber,
	status,
	shippedDate
FROM
	orders
WHERE orderNumber IN
(
	SELECT
		orderNumber
	FROM
		orderDetails
	GROUP BY
		orderNumber
	HAVING SUM(quantityOrdered * priceEach) > 60000
);
```
第一步，通过使用`GROUP BY`和`HAVING`分句，内层的query从`orderDetails`表中找到所有总价值大于60000的订单号码。

第二步，外层的query使用`IN`分句，从`orders`中找到所有内层query计算得到的行信息。

## BETWEEN

`BETWEEN`运算符的格式如下

```sql
expr [NOT] BETWEEN begin_expr AND end_expr;
```

`BETWEEN... AND...`可以用`... >= ... AND ... <= ...`代替

比如`buyPrice BETWEEN 90 AND 100` 和 `buyPrice >= 90 AND buyPrice <= 100`

`BETWEEN`和日期结合使用的例子

```sql
SELECT
	orderNumber,
	requireDate,
	status
FROM
	orders
WHERE
	requiredDate BETWEEN
		CAST('2003-01-01' AS DATE) AND
		CAST('2003-01-31' AS DATE);
```

## LIKE

格式
```sql
expr LIKE pattern ESCAPE escape_char
```

## LIMIT

格式
```sql
SELECT
	select_list
FROM
	tbl
LIMIT [offset,] row_count;
```
`offset`从0开始计数，默认是0

`LIMIT`和`ORDER BY`结合使用

```sql
SELECT select_list
FROM table_name
ORDER BY order_expression
LIMIT offset, row_count;
```
计算顺序为`FROM` -> `WHERE` -> `SELECT` -> `ORDER BY` -> `LIMIT`

可以使用`LIMIT`进行分页

```sql
SELECT COUNT(*) FROM customers;
```
使用`COUNT`函数获取行数

可以使用`LIMIT`获取第n个排序记录。

## IS NULL

`IS NULL`用于测试是否为`NULL`，`IS NOT NULL`判断不是`NULL`