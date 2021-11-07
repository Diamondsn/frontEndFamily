# 算法

## 将输入的变量名转成小驼峰写法

<https://www.nowcoder.com/test/question/done?tid=49821751&qid=2049844>

可能的输入命名格式如下  
TestVariable  
test_variable  
TEST_VARIABLE  
最终输出为testVariable  
数据范围：输入的字符串长度满足 n>=0 && n <= 100  
进阶：空间复杂度 O(1) , 时间复杂度 O(n)  

``` javascript
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param name string字符串 变量名
 * @return string字符串
 */
function format( name ) {
  // write code here
  if (name.length <= 0) {
      return name;
  }
  
  if (name.indexOf('_') >= 0) {
      name = name.toLowerCase();
  }
  
  name = name.replace(/_[a-z]/g, function(word){
      return word.substring(1, 2).toUpperCase();
  });
  
  return name[0].toLowerCase() + name.substring(1);
}
```

## 最长连续子字符串

<https://www.nowcoder.com/test/question/done?tid=49821751&qid=2049845>

输入一个字符串 s ，请返回该字符串的“只包含一种字符的最长非空子字符串”。  

数据范围：n >= 0 && n <=1000  
进阶：空间复杂度 O(n)，时间复杂度 O(n)  

输入例子1:  
"ssssssssssssssshhhhopeeeeeeee"  

输出例子1:  
"sssssssssssssss"  

输入例子2:  
""  

输出例子2:  
""  

``` javascript
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param str string字符串 1 <= str.length <= 1000
 * @return string字符串
 */
function findLongestSubstr(str) {
  // write code here
  if (str.length <= 0) {
    return str;
  }

  let res = str[0];
  let currentRes = str[0];

  for (let i = 1; i < str.length; ++i) {
    if (str[i].toLowerCase() === currentRes[0] || str[i].toUpperCase() === currentRes[0]) {
      currentRes += str[i];
    } else {
      if (currentRes.length > res.length) {
        res = currentRes;
      }
      currentRes = str[i];
    }
  }

  if (currentRes.length > res.length) {
    res = currentRes;
  }
  return res;
}
```

## 落单字符

给定字符串，请帮小虾米找出最后一个只出现一次的字符。  

输入例子1:  
"shopee"  

输出例子1:  
"p"  

<https://www.nowcoder.com/test/question/done?tid=49821751&qid=2049846>

``` javascript
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param str string字符串
 * @return string字符串
 */
function lastUniqueChar(str) {
  // write code here
  if (str.length <= 0) {
    return str;
  }

  let repeatStr = new Set();

  for (let i = str.length - 1; i >= 0; --i) {
    if (repeatStr.has(str[i])) {
      continue;
    }

    if (str.indexOf(str[i]) === i) {
      return str[i];
    }

    repeatStr.add(str[i]);
  }

  return '';
}
```
