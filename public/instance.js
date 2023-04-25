// 1.深拷贝
const deepClone = (obj) => {
  let objClone = Array.isArray(obj) ? [] : {}; //判断obj类型 赋值给objClone
  if (obj && typeof obj === "object") {
    //判断数据是否为对象
    for (var key in obj) {
      //遍历
      if (obj.hasOwnProperty(key)) {
        //判断传进来的obj对象是否存在该项属性‘key’
        if (obj[key] && typeof obj[key] === "object") {
          //判断该对象得到key是否还是对象
          objClone[key] = deepClone(obj[key]); //是对象则再次将obj的该属性拷贝 深度遍历
        } else {
          objClone[key] = obj[key]; //否则直接复制
        }
      }
    }
  }
  return objClone;
};
let a = [1, 2, 3, 4, 5],
  b = deepClone(a);
a[0] = 2;
console.log(a, b); //[ 2, 2, 3, 4, 5 ] [ 1, 2, 3, 4, 5 ]
//-----------------
// 基本数据类型存放于栈中
var aa = 1;
var bb = aa;
aa = 2;
console.log(aa, bb); //2 1
// 引用数据类型值存放在堆中，栈中的变量对象的值指向的是堆中的值，引用地址
var ab = { cc: 1 };
var ab2 = ab;
ab.cc = 2;
console.log(ab, ab2); //{ cc: 2 } { cc: 2 }
//-----------------

// 2.事件循环
console.log('1');
async function async1 () {
  console.log('2');
  await async2();
  console.log('3');
}
async function async2 () {
  console.log('4');
}

process.nextTick(function () {
  console.log('5');
})

setTimeout(function () {
  console.log('6');
  process.nextTick(function () {
    console.log('7');
  })
  new Promise(function (resolve) {
    console.log('8');
    resolve();
  }).then(function () {
    console.log('9')
  })
})

async1();

new Promise(function (resolve) {
  console.log('10');
  resolve();
}).then(function () {
  console.log('11');
});
console.log('12');

// 2.1------------------------

async function async1 () {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise resolve");
  });
  //以下是new promise的then 如果没有指定成功或失败 则是pinding状态不执行
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => {
  //这个.then的res是函数async()的返回值 没有放回值则为undfined
  console.log(res);
});
new Promise((resolve) => {
  console.log("promise2");
  setTimeout(() =>
    console.log("timer")
  );
});
// 2.2--------------------
async function async1 () {
  await async2()
  console.log('async1 end');
}
async function async2 () {
  return new Promise(resolve => {
    resolve()
  }).then(function () {
    console.log('async2');
  })
}
async1()
new Promise(resolve => {
  resolve()
}).then(function () {
  console.log('promise1');
}).then(function () {
  console.log('promise2');
}).then(function () {
  console.log('promise3');
})
////  async2 promise1 promise2 async1 end promise3

// 2.3--------------------
async function async1 () {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2 () {
  console.log('async2 start');
  return new Promise((resolve, reject) => {
    resolve();
    console.log('async2 promise');
  })
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
}).then(function () {
  console.log('promise3');
});
console.log('script end');


// 2.4--------------------
const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      resolve(6);
      console.log(p)
    }, 0)
    resolve(1);
  });
  resolve(2);
  p.then((arg) => {
    console.log(arg);
  });
}));
first().then((arg) => {
  console.log(arg);
});
console.log(4);


// 2.5--------------------
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise resolve')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => {
  console.log(res)
})
new Promise(resolve => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
})


// 3.红绿灯实现间隔交替，promise实现
const redtest = () => {
  console.log("redtest");
};
const greentest = () => {
  console.log("greentest");
};
const yellowtest = () => {
  console.log("yellowtest");
};

const timebh = (time, fn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });
};
const rgyfn = () => {
  Promise.resolve()
    .then(() => {
      return timebh(3000, redtest);
    })
    .then(() => {
      return timebh(2000, greentest);
    })
    .then(() => {
      return timebh(1000, yellowtest);
    })
    .then(() => {
      return rgyfn();
    });
};
rgyfn()


// 4.防抖
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */

function debounce (func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 5.节流
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle (func, wait, type) {
  if (type === 1) {
    let previous = 0;
  } else if (type === 2) {
    let timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}

// 6.非for输出多次内容
let num = 0;
while (num < 20) {
  console.log("*");
  num++;
}

// 7.函数简单算数
const createBase = (val) => {
  return function (e) {
    return console.log(val + e);
  };
};
// const createBase = val => e => val + e;   // 简写
var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27

// 8.字符串反转
function fanzhuan (value) {
  return console.log(value.split("").reverse().join("")); // 字符串各项拆分为数组，数组各项反转，数组各项合并为字符串
}
fanzhuan("hello word");

// 9.生成100个随机数去重
function suiji () {
  let sjsz = [];
  for (let index = 0; index < 100; index++) {
    sjsz.push(Math.ceil(Math.random() * 10));
  }
  let qcsz = [...new Set(sjsz)];
  console.log(sjsz);
  return console.log(qcsz);
}
suiji();

// 10.递归求1-100的和
const appp = (num1, num2) => {
  let num = num1 + num2;
  if (num2 + 1 > 100) return num;
  return appp(num, num2 + 1);
};
console.log(appp(1, 2));

// 11去重
let arr1 = [1, 2, 3, 4, 5, 5, 6, 6, 7];
let arr2 = [...new Set(arr1)];
console.log(arr2); //[1, 2, 3, 4, 5, 6, 7]

// 11.1 手写去重
let arre = [1, 2, 3, 4, 1, 2, 3, 5];
const arrefn = (arr) => {
  let newarr = [];
  for (let index = 0; index < arr.length; index++) {
    if (newarr.indexOf(arr[index]) === -1) {
      newarr.push(arr[index]);
    }
  }
  return newarr;
};
console.log(arrefn(arre));

// 12冒泡排序
var bubarr = [83, 54, 4, 2, 7, 8, 3, 11, 18, 10];
function bubfn (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return console.log(bubarr);
}
bubfn(bubarr);

// 13.打印三角形
function sjx (row) {
  let log = ''
  for (let i = 1; i <= row; i++) {
    for (let y = 1; y <= i; y++) {
      if (i <= 2 || i >= row) {
        log += '*  '
      } else {
        if (y === 1 || i === y) {
          log += '*  '
        } else {
          log += '   '
        }
      }
    }
    log += '\n'
  }
  return log
}
console.log(sjx(20));

// 14. Object.defineProperty使用
function observe (obj, callback) {
  let newobj = {}
  for (const item in obj) {
    Object.defineProperty(obj, item, {
      get: () => {
      },
      set: (val) => {
        newobj[item] = val
        callback(item, newobj[item])
      }
    })
  }
  return obj
}
const obj = observe(
  {
    name: '子君',
    sex: '男'
  },
  (key, value) => {
    console.log(`属性[${key}]的值被修改为[${value}]`)
  }
)

// 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
obj.name = '妹纸'
// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.sex = '女'

// 14.不创建变量替换两个整数
let an = 199998
let bn = 25
an = [...(an + String(bn))]
bn = an.splice(0, an.length - String(bn).length).join('')
an = an.join('')
console.log(an, bn)

// 15.九九乘法表三种方案

// 15.1 最基础的js for
for (let i = 1; i <= 9; i++) {
  let storage = "";
  for (let y = 1; y <= i; y++) {
    storage += `${y}×${i}=${y * i} `;
  }
  console.log(storage);
}
let list = ''
for (let i = 1; i <= 9; i++) {
  for (let y = 1; y <= i; y++) {
    list += y + '*' + i + '=' + (y * i) + ' '
  }
  list += '\n'
}
console.log(list);
// 15.2 使用js map映射+递归
(function () {
  console.log("");
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr.map((item) => {
    let storage = "",
      ind = 9;
    rec();
    function rec () {
      if (item > ind) return;
      storage += item + "*" + ind + "=" + item * ind + " ";
      ind--;
      return rec();
    }
    console.log(storage);
  });
})();

// 15.3 js纯递归
(function () {
  let col = 9,
    row = 0,
    storage = "";
  const rec1 = () => {
    if (row <= col) {
      console.log(storage);
      storage = "";
      return rec2();
    }
  };
  const rec2 = () => {
    if (row >= col) {
      row = 0;
      col--;
      return rec1();
    } else {
      row++;
      storage += row + "×" + col + "=" + row * col + " ";
      return rec2();
    }
  };
  rec1();
})();

// 16.数字转rmb格式

function rmb (number) {
  let newNumber = number.toString().split("").reverse().map((item, index) => {
    if (index % 3 === 0 && index !== 0) return item + ",";
    return item;
  });
  return newNumber.reverse().join("")
}
console.log(rmb(12345678910));

// 17.字符串反转

let str = 'penzekun'
console.log(str.split('').reverse().join(''));

let newstr = ''
for (let i = str.length; i > 0; i--) {
  newstr += str[i - 1]
}
console.log(newstr);

// 18.求出数组元素是否有其他两个元素的和

let arradd = [11, 65, 22, 45, 4, 7, 1, 8, 99, 66, 99, 20, 98];
for (let i = 0; i < arradd.length; i++) {
  for (let y = i + 1; y <= arradd.length; y++) {
    for (let z = 0; z < arradd.length; z++) {
      if (arradd[i] + arradd[y] === arradd[z]) {
        console.log(arradd[z]);
      }
    }
  }
}

// 19.字符串去重

let atrre = 'penzekun'
console.log([...new Set(atrre.split(''))].join(''))

// 20.删除字符串相连重复字符

let atr = "pennzeeekkkkkkuuuunnnn";
let newatr = "";
for (let i = 0; i < atr.length; i++) {
  if (atr[i] !== atr[i + 1]) {
    newatr += atr[i];
  }
}
console.log(newatr);

// 21.阿拉伯数字转化为大写汉字

// 方案1 多次遍历替换筛选 手写
function capital (num, shor = false) {
  // 第二个参数为true值时设定简体
  let str = parseInt(+num).toString();
  console.log(str.length);
  if (str.length > 15) return "数据过长";
  let numArr = str.split("");
  let capArr, capunit;
  let capbigunig = ["", "万", "亿", "兆"];
  if (shor) {
    capArr = "零一二三四五六七八九";
    capunit = ["千", "百", "十", ""];
  } else {
    capArr = "零壹贰叁肆伍陆柒捌玖";
    capunit = ["仟", "佰", "拾", ""];
  }
  let fre = Math.ceil(numArr.length / 4);
  let storage = [];
  let freStorage = "";
  let freArr = null;
  // 实现基本对照转化
  for (let i = 0; i < fre; i++) {
    let numArrl = numArr.length;
    // 分组 最多四位一组
    if (numArrl < 4) {
      freArr = numArr;
    } else {
      freArr = numArr.splice(numArrl - 4, 4);
    }
    // 对应中文
    for (let y = 0; y < freArr.length; y++) {
      if (freArr[y] === "0") {
        freStorage += capArr[freArr[y]];
      } else {
        let unit = Math.abs(4 - (freArr.length - y));
        freStorage += capArr[freArr[y]] + capunit[unit];
      }
    }
    freStorage += capbigunig[i];
    storage.unshift(freStorage);
    freStorage = "";
  }
  console.log(+num);
  let atr = storage.join("");
  let newatr = "";
  // 相邻零去重
  for (let i = 0; i < atr.length; i++) {
    if (atr[i] !== atr[i + 1]) {
      newatr += atr[i];
    }
  }
  storage = newatr.split("");
  let storl = storage.length;
  if (storage[storl - 1] === capArr[0]) storage.pop(); // 清尾零
  let en_string = "";
  // 针对性过滤
  for (let i = 0; i < storl; i++) {
    if (storage[i] === capArr[0] && storage[i - 1] === capunit[2]) continue; // 十零 删零
    if (storage[i] === capArr[0] && capbigunig.indexOf(storage[i + 1]) !== -1)
      continue; // 零亿.万.千.百.十 删零
    if (storage[i] === capbigunig[1] && storage[i - 2] === capbigunig[2])
      continue; // 亿万 删万
    if (storage[i] === capbigunig[2] && storage[i - 2] === capbigunig[3])
      continue; // 兆亿 删亿
    if (storage[i] === capunit[0] && storage[i - 4] === capbigunig[2]) {
      // 亿.*千 加零
      en_string = en_string.slice(0, -1) + capArr[0] + en_string.slice(-1);
    }
    en_string += storage[i] || "";
  }
  return en_string;
}
let fnn = "123456789123456";
console.log(capital(fnn, true));


// 方案2 拦截更改  手写
function capital2 (num, shor = false) {
  // 第二个参数为true值时使用简写汉字
  let str = parseInt(+num).toString();
  if (str.length > 15) return "数据过长";
  let numArr = str.split("");
  let capArr, capunit;
  let capbigunig = ["", "万", "亿", "兆", "京"];
  if (shor) {
    capArr = "零一二三四五六七八九";
    capunit = ["千", "百", "十", ""];
  } else {
    capArr = "零壹贰叁肆伍陆柒捌玖";
    capunit = ["仟", "佰", "拾", ""];
  }
  let fre = Math.ceil(numArr.length / 4);
  let storage = [];
  let freStorage = "";
  let freArr = null;
  for (let i = 0; i < fre; i++) {
    let numArrl = numArr.length;
    if (numArrl < 4) {
      freArr = numArr;
    } else {
      freArr = numArr.splice(numArrl - 4, 4);
    }
    if (freArr.join("") === "0000") {
      let storZeor = storage.join('')[0]
      if (storZeor && storZeor !== capArr[0]) storage.unshift(capArr[0]);
      continue
    };
    let freArrl = freArr.length;
    for (let y = 0; y < freArrl; y++) {
      if (y === 0 && freArr[0] === "0") {  // 首位: 首位0  -> 加零
        freStorage += capArr[0];
        continue;
      }
      if (y === 1 && freArr[0] === "0" && freArr[1] === "0") continue;   // 百位: 千位0 百位0
      if (y === 2 && freArr[0] === "0" && freArr[1] === "0" && freArr[2] === "0") continue;  // 十位: 千位0 百位0 十位0 
      if (freArr[y] === "0" && freArr[0] === "0" && freArr[freArrl - 1] !== "0") { // 当前: 首位0 尾位非0  -> 加零
        freStorage += capArr[0];
        continue;
      }
      if (y !== 0 && freArr[y - 1] !== "0" && freArr[y] === "0" && freArr[freArrl - 1] !== "0") { // 非千位: 上位非0 当前0 尾非0 -> 加零
        freStorage += capArr[0];
        continue;
      }
      if (y === 1 && freArr[0] !== "0" && freArr[1] === "0" && freArr[2] !== "0" && freArrl === 4) {
        freStorage += capArr[0];
        continue;
      }
      if (freArr[y] === "0") continue;
      let unit = Math.abs(4 - (freArrl - y));
      freStorage += capArr[freArr[y]] + capunit[unit];
    }
    freStorage += capbigunig[i];
    storage.unshift(freStorage);
    freStorage = "";
  }
  return storage.join("");
}
console.log(capital2(fnn, true));



// 方案3 正则  bug多 网上复制
function fn (n) {
  if (!/^([1-9]\d*)/.test(n)) {
    return "非法数据";
  }
  var unit = "千百十亿千百十万千百十个";
  if (n.length > unit.length) {
    return "数据过长";
  }
  var newStr = "";
  var nlength = n.length;
  unit = unit.substr(unit.length - nlength);
  for (var i = 0; i < nlength; i++) {
    newStr += "零一二三四五六七八九".charAt(n[i]) + unit.charAt(i);
  }
  newStr = newStr.substr(0, newStr.length - 1);
  newStr = newStr
    .replace(/零(千|百|十)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(亿|万)/g, "$1");
  return newStr;
}
console.log(fn(fnn));

// 22 .defineProperty的使用

var xysObj = {}
var names = '';
Object.defineProperty(xysObj, 'names', {
  set: (value => {
    names = value
    console.log('设置名称为' + value);
  }),
  get: () => {
    return `改名为:${names}`
  }
})
xysObj.names = 'set' //设置赋值names属性时触发 set
console.log(xysObj.names);  //获取names属性时触发  get


// 23 使用正则处理myRecord.js中的内容，返回数组对象
const text = `
//?  91，vue核心
/*
        数据驱动、组件系统
*/
`;

const regex = /\s*\/\/\?\s*(.*?)\s*\/\*([\s\S]*?)\*\//g;
const matches = text.matchAll(regex);

const results = [];
for (const match of matches) {
  const name = match[1];
  const value = match[2];
  // results.push(`{'${name}':\n\`${value}\`\n}`);
  results.push(`{name: '${name}',value: \`${value}\`}`);
}

let textFormat = eval('[' + results.join(',') + ']')
// console.log(textFormat);


// 24 正则匹配添加标签
// function addSpanTags (str) {
//   const regex = /([^\u4e00-\u9fa5\s]*[a-zA-Z]+[^\u4e00-\u9fa5\s]*)/g;
//   return str.replace(regex, match => `<span>${match}</span>`);
// }
function addSpanTags (str) {
  const regex = /([^\u4e00-\u9fa5，。、；‘’“”！？【】《》（）「」『』【】·`~!@#$%^&*()_+=[\]\\{}|;':",/<>?\s]*[a-zA-Z]+[^\u4e00-\u9fa5，。、；‘’“”！？【】《》（）「」『』【】·`~!@#$%^&*()_+=[\]\\{}|;':",./<>?\s]*)/g;
  return str.replace(regex, match => `<span>${match}</span>`);
}

textFormat.forEach(e => {
  e.name = addSpanTags(e.name)
  e.value = addSpanTags(e.value)
});

console.log(textFormat);

// 25 自定义intanceof

function myIntanceof (left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

// 26 0.1 + 0.2 = 0.3
function countNum (a, b) {
  return Math.abs(a - b) < Number.EPSILON
}
console.log(countNum(0.1 + 0.2, 0.3)); // true

// 27 手写call 和bind
Function.prototype.myCall = function (context) {
  if (typeof context !== 'function') {
    throw new TypeError('error')
  }
  let args = [...arguments].slice(1)
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}


Function.prototype.myAplay = function (context) {

}


Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数 
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn () {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};

