#-*- coding: utf-8 -*-
# 整理数据
import os

def getData():
    dataFile = open ('word.geojson')
    
    data = open ('world.json', 'w')
    
    geojson = dataFile.read()
    
    dataFile.close()
    
    geojson = eval( geojson.replace("null", "None") )
    
    data.write('[\n')
    for country in geojson["features"]:
        coordinates = country["geometry"]['coordinates']
        print coordinates
        
        data.write('    '+str(coordinates)+',\n')
    
    data.write(']')
    data.close() 
        
getData()