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

### 1. 字符的 Unicode 表示法

ES6 支持 Unicode 表示法，`\u0000`~`\uFFFF` 或者双码点或 `\u{20BB7}` 将码点放在大括号中。

``` JavaScript
"\uD842\uDFB7"
// "𠮷"

"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"
```

### 2. 字符串的遍历器接口

for ... of 循环可以遍历字符串，也可识别大于`0xFFFF`的码点。传统 for 循环不能识别这样的码点。

``` JavaScript
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

### 3. 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

模板字符串中嵌入变量，需要将变量名写在${}之中。

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

模板字符串之中还能调用函数。

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如对象会调用`toString`方法。

## 5. 字符串的新增方法

### 1. `String.fromCodePoint()` 方法

ES6 提供了`String.fromCodePoint()`方法，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode()`方法的不足。

``` JavaScript
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

### 2. `String.raw()`

String.raw()方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

``` JavaScript
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"
```

`String.raw()`的代码实现基本如下。

``` JavaScript
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

### 3. 实例方法：codePointAt()

ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

``` JavaScript
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```

codePointAt()方法的参数，仍然是不正确的。上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2。解决这个问题的一个办法是使用for...of循环。

``` JavaScript
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

### 4. 实例方法：normalize()

ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

``` JavaScript
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```

### 5. 实例方法：includes(), startsWith(), endsWith() 

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

这三个方法都支持第二个参数，表示开始搜索的位置。

``` JavaScript
let s = 'Hello world!';

s.startsWith('world', 6) // true
// 针对前 5 个字符
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

### 6. 实例方法：repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次。

参数如果是小数，会被取整。

如果repeat的参数是负数或者Infinity，会报错。

如果是 -1 到 0 之间的小数，会先被转换为 0。

参数NaN等同于 0。

如果repeat的参数是字符串，则会先转换成数字。

### 7. 实例方法：padStart()，padEnd()

如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

``` JavaScript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

### 8. 实例方法：trimStart()，trimEnd()

trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

``` JavaScript
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。

### 9. 实例方法：matchAll()

matchAll()方法返回一个正则表达式在当前字符串的所有匹配.

### 10. 实例方法：replaceAll()

字符串的实例方法replace()只能替换第一个匹配。

``` JavaScript
'aabbcc'.replace('b', '_')
// 'aa_bcc'
```

replaceAll()方法，可以一次性替换所有匹配。

``` JavaScript
String.prototype.replaceAll(searchValue, replacement)
```

searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符）。

如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。

``` JavaScript
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')
```

可以使用的特殊字符串如下。

- $&：匹配的字符串。
- $` ：匹配结果前面的文本。
- $'：匹配结果后面的文本。
- $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
- $$：指代美元符号$。

``` JavaScript
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```

replaceAll()的第二个参数replacement除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数searchValue匹配的文本。

第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。

``` JavaScript
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456
```

### 11. 实例方法：at()

at()方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。

``` JavaScript
const str = 'hello';
str.at(1) // "e"
str.at(-1) // "o"
```

如果参数位置超出了字符串范围，at()返回undefined.

## 6. 正则的扩展

### 1. RegExp 构造函数

如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

``` JavaScript
new RegExp(/abc/ig, 'i').flags
// "i"
```

### 2. 字符串的正则方法

字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。

ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

### 3. u 修饰符

ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

``` JavaScript
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

一旦加上u修饰符号，就会修改下面这些正则表达式的行为。

#### 1. 点字符

点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。

``` JavaScript
var s = '𠮷';

// . 在不加 u 修饰符情况下不能不匹配四字节字符
/^.$/.test(s) // false
/^.$/u.test(s) // true
```

#### 2. Unicode 字符表示法

ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。

``` JavaScript
// 需要匹配 61 个 u
/\u{61}/.test('a') // false

/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```

#### 3. 量词

``` JavaScript
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
```

#### 4. 预定义模式

``` JavaScript
// \S是预定义模式，匹配所有非空白字符
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
```

#### 5. i 修饰符

有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。

``` JavaScript
// 不加 u 不能识别非规范的 K 字符
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
```

#### 6. 转义

没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。

``` JavaScript
// \, 无效在不加 u 模式下无效，在 u 模式下直接报错
/\,/ // /\,/
/\,/u // 报错
```

### 4. RegExp.prototype.unicode 属性

正则实例对象新增unicode属性，表示是否设置了u修饰符。

``` JavaScript
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true
```

### 5. y 修饰符

正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。

y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

``` JavaScript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
// 下次匹配的开头不是 a，是_
r2.exec(s) // null
```

### 6. RegExp.prototype.sticky 属性

与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。

``` JavaScript
var r = /hello\d/y;
r.sticky // true
```

### 7. RegExp.prototype.flags 属性

ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。

``` JavaScript
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```

### 8. s 修饰符：dotAll 模式

正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。

``` JavaScript
// . 不能匹配换行符
/foo.bar/.test('foo\nbar')
// false
```

很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法。

``` JavaScript
/foo[^]bar/.test('foo\nbar')
// true
```

ES2018 引入s修饰符，使得.可以匹配任意单个字符。

``` JavaScript
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'
```

### 9. 后行断言

“先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。“先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。

``` JavaScript
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```

“后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。“后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

``` JavaScript
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]
```

### 10. Unicode 属性类

ES2018 引入了 Unicode 属性类，允许使用\p{...}和\P{...}（\P是\p的否定形式）代表一类 Unicode 字符，匹配满足条件的所有字符。必须带上 u 修饰符。

``` JavaScript
// 匹配所有希腊字母
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

### 11. 具名组匹配

``` JavaScript
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

``` JavaScript
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // "1999"
const month = matchObj.groups.month; // "12"
const day = matchObj.groups.day; // "31"
```

字符串替换时，使用$<组名>引用具名组。

``` JavaScript
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
```

如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。

``` JavaScript
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

### 12. String.prototype.matchAll()

如果一个正则表达式在字符串里面有多个匹配，现在一般使用g修饰符或y修饰符，在循环里面逐一取出。

``` Javascript
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
```

ES2020 增加了String.prototype.matchAll()方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。

``` JavaScript
const string = 'test1test2test3';
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
```

遍历器转为数组有`...`运算符和`Array.from()`方法。

## 7. 数值的扩展

### 1. 二进制和八进制表示法

ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。

``` JavaScript
0b111110111 === 503 // true
0o767 === 503 // true
```

### 2. 数值分隔符

ES2021，允许 JavaScript 的数值使用下划线（_）作为分隔符。

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的e或E前后不能有分隔符。

下面三个将字符串转成数值的函数，不支持数值分隔符。

- Number()
- parseInt()
- parseFloat()

``` JavaScript
Number('123_456') // NaN
parseInt('123_456') // 123
```

### 3. Number.isFinite(), Number.isNaN()

Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。

如果参数类型不是数值，`Number.isFinite`一律返回`false`。

Number.isNaN()用来检查一个值是否为NaN。

如果参数类型不是NaN，Number.isNaN一律返回false。


### 4. Number.parseInt(), Number.parseFloat() 

和全局方法parseInt()和parseFloat()行为一致。

### 5. Number.isInteger()

Number.isInteger()用来判断一个数值是否为整数。

整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

参数不是数值，Number.isInteger返回false。

### 6. Number.EPSILON

它表示 1 与大于 1 的最小浮点数之间的差，等于 2 的 -52 次方。

### 7. 安全整数和 Number.isSafeInteger()

ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

``` JavaScript
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
```

Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

### 8. Math 对象的扩展

Math.trunc方法用于去除一个数的小数部分，返回整数部分。

Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为 0，返回0；
- 参数为-0，返回-0;
- 其他值，返回NaN。

Math.cbrt()方法用于计算一个数的立方根。

Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。

Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

Math.fround方法返回一个数的32位单精度浮点数形式。

Math.hypot方法返回所有参数的平方和的平方根。

Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。

Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。

Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。

Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

### 9. BigInt 数据类型

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。

一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。

二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

BigInt 与普通整数是两种值，它们之间并不相等。

typeof运算符对于 BigInt 类型的数据返回bigint。

可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。

``` JavaScript
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
```

不允许 BigInt 与普通数值混合计算，比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。

BigInt 与字符串混合运算时，会先转为字符串，再进行运算。

## 8. 函数的扩展

### 1. 函数参数的默认值

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。

### 2. rest 参数

ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数。

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

函数的length属性，不包括 rest 参数。

### 3. 严格模式

从 ES5 开始，函数内部可以设定为严格模式。

ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

### 4. name 属性

函数的name属性，返回该函数的函数名。

ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

``` JavaScript
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```

Function构造函数返回的函数实例，name属性的值为anonymous。

``` JavaScript
(new Function).name // "anonymous"
```

bind返回的函数，name属性值会加上bound前缀。

``` JavaScript
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

### 5. 箭头函数

- 箭头函数没有自己的this对象（详见下文）。

- 不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。

- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### 6. 尾调用优化

尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。

``` JavaScript
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
```

尾递归优化过的 Fibonacci 数列实现如下。

``` JavaScript
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
```

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。

``` JavaScript
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}
```

蹦床函数（trampoline）可以将递归执行转为循环执行。

``` JavaScript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```

蹦床函数并不是真正的尾递归优化，下面的实现才是。

``` JavaScript
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      // 只在最外层进入
      active = true;
      while (accumulated.length) {
        // 这里调用但都返回 undefined，并将参数加入到 accumulated
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```

### 7. 函数参数的尾逗号

函数定义和调用时，尾部直接有一个逗号。

### 8. Function.prototype.toString()

函数实例的toString()方法返回一模一样的原始代码。

### 9. catch 命令的参数省略

JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。

ES2019 做出了改变，允许catch语句省略参数。

``` JavaScript
try {
  // ...
} catch {
  // ...
}
```

## 9. 数组的扩展

### 1. 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

扩展运算符的应用场景

1. 复制数组

``` JavaScript
const a1 = [1, 2];
// 之前做法,返回新实例
const b1 = a1.concat();

// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

### 2. 合并数组

``` JavaScript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

### 3. 与解构赋值结合

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

``` JavaScript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

### 4. 字符串

扩展运算符还可以将字符串转为真正的数组。能够正确识别四个字节的 Unicode 字符。

``` JavaScript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

### 5. 实现了 Iterator 接口的对象

任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。

### 6. Map 和 Set 结构，Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构和 Generator 函数运行后返回的遍历器对象。

``` JavaScript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

### 2. Array.from()
