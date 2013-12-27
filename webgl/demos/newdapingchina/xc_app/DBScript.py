# -*- coding:UTF-8 -*- #
'''
    @author: OrangeChao
    @summary: 数据库工具类...     
'''

import os,sys  
import psycopg2
import psycopg2.extras
from wlutil import conf

class DBScript:

    host, user, password, database, port ,charset= '', '', '', '', '', ''

    def __init__(self, host = conf.d_host, user = conf.d_user, password = conf.d_password,database = conf.d_database, port = 5432):
        """
        类初始化方法()
            __init__(host, user, password, database)
        """
        self.host, self.user, self.password, self.database, self.port = host, user, password, database, port

    def getconn(self):
        """ 
        获得新数据库链接 getconn(host, user, password, database, port)
        """
        DSN = 'dbname=%s host=%s user=%s password=%s port=%s' % (self.database, self.host, self.user, self.password, self.port)
        conn = psycopg2.connect(DSN)
        mydb = conn.cursor()
        return mydb

    def getDictConn(self):
        """
        执行str 内容并返回查询结果
            doquery(sql_str)
        """
        DSN = 'dbname=%s host=%s user=%s password=%s port=%s' % (self.database, self.host, self.user, self.password, self.port)
        conn = psycopg2.connect(DSN)
        #获得数据库链接,设置主机地址/用户名/密码/库名称/编码格式.
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) #获得 cursor(dict形式).
        return cur #返回字典cursor


    def doquery(self, sql_str):
        """
        执行str 内容并返回查询结果
            doquery(sql_str)
        """
        DSN = 'dbname=%s host=%s user=%s password=%s port=%s' % (self.database, self.host, self.user, self.password, self.port)
        conn = psycopg2.connect(DSN)
        #获得数据库链接,设置主机地址/用户名/密码/库名称/编码格式.
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) #获得 cursor(dict形式).
        cur.execute(sql_str) #通过cursor执行SQL语句.
        result = cur.fetchall() #获得数据库操作返回结果.
        conn.close()
        return result #返回查询结果.

    def insertone(self,):
        """
        向数据插入单表数据
            insertone(tablename, **rowlist)
            rowlist 为欲插入的数据(一个字典)
        操作示例：
            import DataBase
            
            db = DataBase.DataBase()
            ins_id = 1
            ins_name = 'aaaaa'
            t = db.insertone("test01",cid = ins_id,cname = ins_name)
            print t
        """
        key_list,value_list = '',''
        for key_item, value_item in rowlist.iteritems():
            key_list += key_item + ','
            value_list += repr(value_item) + ','
        sql_str = "INSERT INTO " + tablename + " (" + key_list[:-1] + ") VALUES (" + value_list[:-1] + ")"
        conn = self.getconn()
        conn.execute('BEGIN')#开启事务
        num = conn.execute(sql_str)
        conn.execute('COMMIT') 
        conn.close()#关闭链接
        return (num, sql_str)

    def trace(data):
        reload(sys)
        sys.setdefaultencoding('utf-8')
        sys.stderr.write("trace >>>>>>>>>>\n\n" + str(data) + "\n<<<<<<<<<< end.\n")

if __name__ == '__main__':
    import DBScript
    db = DBScript.DBScript()