#-*- coding: utf-8 -*-
# 整理数据
import os,sys
from wlutil import *
from datetime import *
import DBScript

db = DBScript.DBScript()
cur = db.getconn()
curour = db.getDictConn()

def getData():

    filename = '/var/www/django_root/templates/xc_app/shape.json'
    if _checkfile(filename) :
        os.remove(filename) 
    _file = open( filename , 'w' )

    sqllist = """
        select shape from countryshape where id > 0
    """
    numlist = db.doquery( sqllist )

    _file.write('[\n')
    # for pro in numlist:
    for i in range(len(numlist)):
        if (i + 1) == len(numlist) :
            _file.write('    ' + numlist[i]['shape']+'\n')
        else :
            _file.write('    ' + numlist[i]['shape']+',\n')
    _file.write(']')
    _file.close()

def _checkfile(filepath):
    isExists = os.path.exists(filepath)
    return isExists
        
getData()