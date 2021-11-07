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
