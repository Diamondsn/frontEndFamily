# 网络

## Cache-control

max-age 值为 0，那么每次请求都需要重新发到服务器
设置了no-cache，表示每次请求，缓存会将此请求发到服务器验证是否过期，若未过期，则缓存才使用本地缓存副本
public指令表明响应可以被任何中间人缓存，即使是通常不可缓存的内容
must-revalidate 表示缓存过期后必须重新向服务器验证

## 浏览器

### 浏览器、浏览器内核、浏览器前缀的关系

| 浏览器 | 内核 | 浏览器前缀 |
| :-----| :---- | :---- |
| Internet Explorer | Trident | -ms- |
| Opera | presto | -o- |
| Chrome, Safari | webkit | -webkit |
| Firefox | Gecko | -moz- |

## URL 规范

scheme://host.domain:port/path/filename  

scheme - 定义因特网服务的类型。最常见的类型是 http  
host - 定义域主机（http 的默认主机是 www）  
domain - 定义因特网域名，比如 w3school.com.cn  
:port - 定义主机上的端口号（http 的默认端口号是 80）  
path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）  
filename - 定义文档/资源的名称  

## TCP/IP 协议

TCP 协议实现拥塞控制、流量控制、可靠传输
IP 协议充分利用网络资源
