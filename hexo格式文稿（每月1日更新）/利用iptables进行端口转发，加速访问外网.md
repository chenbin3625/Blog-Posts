title: 利用iptables进行端口转发，加速访问外网
tags:
  - 渗透测试
  - Linux
categories:
  - 大一文章
author: chenbin
date: 2019-10-02 22:57:00
---
### 因为种种原因，当我们的服务器架设在非中国大陆地区时，我们经常会出现访问不上、丢包、断流等等糟心的现象，这个问题由来已久，电信运营商会在网络繁忙时对出入口流量进行qos限速，民用级的流量很有可能会被丢包限速。

### 有一个简单的解决办法就是使用阿里云服务器，利用阿里云优质的带宽来为我们的访问加速。

### 在开启阿里云中转之前，我们的延迟是这样的

![2020.4.5 (1).jpg](https://ypyun-cdn.u1n1.com/2022/04/06/624c7422af3df.jpg)


### 在开启了阿里云中转之后，我们的延迟迅速降低，并且有一个优势就是稳定，不会出现掉速等等糟心的现象，可以愉快的访问外网。
![2020.4.5 (2).jpg](https://ypyun-cdn.u1n1.com/2022/04/06/624c7422d8004.jpg)

### 启用网卡转发功能
```
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p
```
### 举例:从192.168.0.132:21521(新端口)访问192.168.0.211:1521端口
### a.同一端口转发(192.168.0.132上开通1521端口访问
```
iptables -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 1521 -j ACCEPT)

iptables -t nat -I PREROUTING -p tcp --dport 1521 -j DNAT --to 192.168.0.211
iptables -t nat -I POSTROUTING -p tcp --dport 1521 -j MASQUERADE
```
### b.不同端口转发(192.168.0.132上开通21521端口访问 
```
iptables -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 21521 -j ACCEPT)
iptables -t nat -A PREROUTING -p tcp -m tcp --dport 21521 -j DNAT --to-destination192.168.0.211:1521
iptables -t nat -A POSTROUTING -s 192.168.0.0/16 -d 192.168.0.211 -p tcp -m tcp --dport 1521 -j SNAT --to-source 192.168.0.132
```
### IP记得更换为需要被中转的公网IP地址
### 以上两条等价配置(更简单[指定网卡]):
```
iptables -t nat -A PREROUTING -p tcp -i eth0 --dport 31521 -j DNAT --to 192.168.0.211:1521
iptables -t nat -A POSTROUTING -j MASQUERADE
```

### 保存iptables
```
#service iptables save
#service iptables restart
```
### 墙裂建议直接使用指定网卡，配置一个独特的端口，简单粗暴。
### IP记得更换为需要被中转的公网IP地址
![2020.4.5(3).png](https://ypyun-cdn.u1n1.com/2022/04/06/624c7422de2fc.png)

### 最后来看一下我们的成果，fast外网测速达到170Mbps，延迟200ms左右，可以流畅访问外网
![2020.4.5(4).jpg](https://ypyun-cdn.u1n1.com/2022/04/06/624c7422b55db.jpg)
### SPEEDTEST香港节点测速延迟36ms，下载速度也是170Mbps左右，肥肠稳~

### 用得上的老铁记得双击666~