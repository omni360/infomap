#-*- coding:utf-8 -*-
import os, random

abs_path = os.path.dirname(os.path.abspath(__file__))

def resolveMapData():
    """
    将GIS数据转化为前端可用的地图数据
    """
    
    f = open(abs_path + "/01.geojson")
    geojson = f.read();
    f.close()
    
    geojson = eval( geojson.replace("null", "None") );
    globePoints = []
    
    for country in geojson["features"]:

        geometry = country["geometry"]
        properties = country["properties"]
        
        if properties.has_key('NAME'):
            name = properties["NAME"]
        else:
            name = properties["sovereignt"]
        
        color = "#183E63"
        scale = 1.5
        if name == "China" or name == "Taiwan":
            color = "#2DC0FF"
            scale = 2
        
        if geometry["type"] == "Polygon":
        
            temp = []    
            
            for p in geometry["coordinates"][0]:
                temp.append({
                    "x": p[0],
                    "y": p[1],
                    "scale":scale, 
                    "delay": random.random(),
                    "group": -1, 
                    "id": "-1",
                    "color": color
                })
            
            globePoints.append(temp)
            
        elif geometry["type"] == "MultiPolygon":
            
            for coord in geometry["coordinates"]:
                
                temp = []
                
                for p in coord[0]:
                    temp.append({
                        "x": p[0],
                        "y": p[1],
                        "scale":scale, 
                        "delay": random.random(),
                        "group": -1, 
                        "id": "-1",
                        "color": color
                    })
    
                globePoints.append(temp)
    
    f = open(abs_path + "/globe.json", "w+")
    f.write(str(globePoints))
    f.close()
    
    print "succ"

def resolveTreeData():
    '''
    生成tree数据
    '''
    f = open(abs_path + "/data.json")
    node_list = eval(f.read())
    f.close()
    
    tree_data = {}
    start_id = "-1"
    
    for node in node_list:
        node_id = node["id"]
        
        if node["pid"] == "-1":
            start_id = node_id
            
        tree_data[node_id] = node
    
    result = str(iterationData(tree_data, start_id)).replace("'", '"')
    f = open(abs_path + '/flare.json', 'w+')
    f.write(result)
    f.close()
    
    print "succ"

def iterationData(tree_data, id):
    '''
    递归生成tree数据
    '''
    dict = {}
    dict["name"] = tree_data[id]["data"]["ip"]
    dict["children"] = []
    dict["id"] = id

    for node_id in tree_data[id]["links"]:
        dict["children"].append(iterationData( tree_data, str(node_id)))
    
    return dict

resolveMapData()
