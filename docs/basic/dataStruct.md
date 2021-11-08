# 数据结构与算法

## 循环队列

front为队头、rear为队尾、maxSize为队列的总容量、m为队列中元素的个数  
队空：front = rear  
队满：(rear + 1) % maxSize = front  
进队：rear = (rear + 1) % maxSize  
出队：front = (front + 1) % maxSize  
队列中元素的个数 m = (rear - front + maxSize) % maxSize  

## 二叉树

满二叉树第 n 层有 2^(n-1) 个节点,总节点数量有 2^n-1 个节点
