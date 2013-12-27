# -*- coding:UTF-8 -*- #

f = open('all_data.json','r')
node_list = eval(f.read())
f.close()

result = {'server': [], 'host':[], 'router': [], 'switch': [], 'ids': [], 'ips': [], 'firewall': []}

for node in node_list:
    if node[1] == "server":
       result['server'].append(node)
    elif node[1] == "host":
       result['host'].append(node)
    elif node[1] == "router":
       result['router'].append(node)
    elif node[1] == "multi_switch":
       result['switch'].append(node)
    elif node[1] == "ids":
       result['ids'].append(node)
    elif node[1] == "ips":
       result['ips'].append(node)
    elif node[1] == "firewall":
       result['firewall'].append(node)

print result
