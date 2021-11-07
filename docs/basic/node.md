# Node.js

## Javascript 执行引擎

1. Node.js通过 libuv 抽象封装层不同平台使用不同方法实现异步I/O，windows是 IOCP，*nix是自定义线程池
2. V8作为最先进的Javascript执行引擎, 执行阶段先生成字节码，再在运行过程中逐步将高频函数转化成优化后的机器码
3. Node.js的Buffer类型对象在创建时内存不是 V8 分配的，属于堆外内存
4. 代码正确的情况下，垃圾回收也会导致有内存无法回收
