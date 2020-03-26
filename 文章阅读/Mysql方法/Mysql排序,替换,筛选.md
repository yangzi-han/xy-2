1. 筛选 where 
  语法: select *（列：*是所以列） from ...（表名） where xxx（列）=/>/< '' 
  l例如：select * from excel where id_name = '赵钱孙';
	/*赵钱孙同学*/
             select   *  from excel where grade>=80;
	分数大鱼
2. 排序 （order by ）默认升序
    order by 排序条件，升序。
    order by 排序条件 desc ，降序
  语法: select * from excel  order by  grade desc; #分数降序
        select * from excel  order by  grade;  #分数升序
3. 匹配（join）
    在excel中，vlookup有缺点，
   1、比如只能从左到右匹配，想从右向左，要结合其他的函数，空间占用大。
   2、关键字段格式不一样，需要手动分列清理格式，或者结合函数清理格式。
   3、一一匹配，一对一，不能实现一对多。
   语法：select a.*,b.class from excel a
	inner join class b
	on a.id_name=b.id_name;
	/*表a excel 连接表b class */  