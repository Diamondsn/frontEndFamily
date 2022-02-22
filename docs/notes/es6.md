# 书籍简介

[ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)是一本开源的 JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性。作者是[阮一峰](https://www.ruanyifeng.com/)。

## 1. ECMAScript 6 简介

### 1. ECMAScript 和 JavaScript 的关系

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。

### 2. ES6 与 ECMAScript 2015 的关系

ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的`includes`方法和指数运算符）。

ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

### 3. 语法提案的批准流程

一种新的语法从提案到变成正式标准，需要经历五个阶段。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

### 4. Babel 转码器

[Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。

1. 命令行转码

``` bash
npm install --save-dev @babel/cli
```

2. babel-node

`@babel/node`模块的`babel-node`命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

``` bash
npm install --save-dev @babel/node
```

然后，执行`babel-node`就进入 REPL 环境。

``` bash
npx babel-node
> (x => x * 2)(1)
2
```

3. @babel/register 模块

`@babel/register`模块改写require命令，为它加上一个钩子。此后，每当使用`require`加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。

`@babel/register`只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

4. polyfill

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

可以使用`core-js`和`regenerator-runtime`(后者提供 generator 函数的转码)，为当前环境提供一个垫片。

5. 浏览器环境

Babel 也可以用于浏览器环境，使用`@babel/standalone`模块提供的浏览器版本，将其插入网页。

注意，网页实时将 ES6 代码转为 ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

Babel 提供一个[REPL 在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码。

## 2. let 和 const 命令

### 1. let 命令

#### 1. 基本用法

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

``` JavaScript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

``` JavaScript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
// 变量 i 是 var 命令声明的，在全局范围内都有效，所以全局只有一个变量 i。
a[6](); // 10
```

``` JavaScript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
// 变量 i 是 let 声明的，当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量
a[6](); // 6
```

for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

``` JavaScript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

for 循环体内部的 i 和设置循环变量那部分不在同一作用域，因为同一作用域不能重复声明同一变量。

#### 2. 不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。

`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

``` JavaScript
// var 的情况
console.log(foo); // 输出 undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错 ReferenceError
let bar = 2;
```

#### 3. 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

``` JavaScript
// 全局变量
var tmp = 123;

if (true) {
  // 下方有 let 声明局部变量，绑定了这个块级作用域，不能在声明前使用
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

``` JavaScript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。

``` JavaScript
typeof x; // ReferenceError
let x;
```

有些“死区”比较隐蔽，不太容易发现。

``` JavaScript
function bar(x = y, y = 2) {
  return [x, y];
}
// 报错, 因为 x 的默认值是 y，y 此时还未定义，处于暂时性死区
bar(); 
```

``` JavaScript
// 不报错
var x = x;

// 报错, 因为在赋值时还未定义 x，就使用了
let x = x;
// ReferenceError: x is not defined
```

ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 4. 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

``` JavaScript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    // 已经不在同一作用域了
    let arg;
  }
}
func() // 不报错
```

### 2. 块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域。

不合理的场景如下:

1. 内层变量可能会覆盖外层变量

``` JavaScript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    // 这里会有变量提升，提升到函数作用域的最上面，为 undefined，且覆盖了外层的全局变量
    var tmp = 'hello world';
  }
}

f(); // undefined
```

2. 用来计数的循环变量泄露为全局变量

``` JavaScript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

// 在循环结束后泄露为全局变量
console.log(i); // 5
```

ES6 中，`let`实际上为 JavaScript 新增了块级作用域。

``` JavaScript
function f1() {
  let n = 5;
  if (true) {
    // 内层块级作用域，退出这个块后即到了外层作用域
    let n = 10;
  }
  // 输出外层块级作用域的值
  console.log(n); // 5
}
```

如果两次都使用 var 定义变量 n，最后输出的值才是 10。

ES6 允许块级作用域的任意嵌套。

内层作用域可以定义外层作用域的同名变量。

块级作用域的出现，使得获得广泛应用的匿名立即执行函数表达式（其实是利用函数作用域）不再必要。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

### 3. const 命令

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

`const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

`const`声明的常量，也与`let`一样不可重复声明。

对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

``` JavaScript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize( obj[key] );
    }
  });
};
```

#### ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面还会提到，另外两种声明变量的方法：`import`命令和`class`命令。

### 4. 顶层对象的属性

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

顶层对象的属性与全局变量挂钩,带来如下问题:

- 没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
- 很容易不知不觉地就创建了全局变量
- 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
- `window`对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。

### 5. globalThis 对象

顶层对象在不同环境是不同的

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。

ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象。

## 3. 变量的解构赋值

### 1. 数组的解构赋值

#### 基本用法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

``` JavaScript
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

#### 默认值

解构赋值允许指定默认值。

ES6 内部使用严格相等运算符（===），判断一个位置是否有值。只有当一个数组成员严格等于undefined，默认值才会生效。

``` JavaScript
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

### 2. 对象的解构赋值

#### 基本用法

``` JavaScript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

对象的解构赋值可以取到继承的属性。

#### 默认值

对象的解构也可以指定默认值。

默认值生效的条件是，对象的属性值严格等于undefined。

``` JavaScript
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

#### 注意点

1. 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

``` JavaScript
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

``` JavaScript
// 正确的写法
let x;
({x} = {x: 1});
```

2. 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

``` JavaScript
// 无意义，但合法
({} = [true, false]);
({} = 'abc');
({} = []);
```

3. 数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

``` Javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

### 3. 字符串的解构赋值

字符串也可以解构赋值。此时，字符串被转换成了一个类似数组的对象。

``` JavaScript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

``` JavaScript
let {length : len} = 'hello';
len // 5
```

### 4. 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

``` JavaScript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

``` JavaScript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 5. 函数参数的解构赋值

``` JavaScript
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

### 5. 用途

1. 交换变量的值

``` JavaScript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

2. 从函数返回多个值

``` JavaScript
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

3. 函数参数的定义

``` JavaScript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

4. 提取 JSON 数据

``` JavaScript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5. 函数参数的默认值

``` JavaScript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句

6. 遍历 Map 结构

``` JavaScript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

// 数组解构赋值
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

7. 输入模块的指定方法

``` JavaScript
// 对象解构赋值，只引入部分方法
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 4. 字符串的扩展


