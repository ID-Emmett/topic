//?  1，EventLoop Node与浏览器
/*

        因为js是单线程的，使用事件轮询机制可以实现异步操作。

        宏任务与微任务:
        macrotask：包含执行整体的js代码，事件回调，XHR回调，定时器（setTimeout/setInterval/setImmediate），IO操作，UI render
        microtask：更新应用程序状态的任务，包括promise回调，MutationObserver，process.nextTick，Object.observe

        浏览器与Node区别: 事件轮询的不同点在于宏任务是否归类与微任务何时执行。
                        浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，
                        microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。
        浏览器: 宏任务会按照事件队列的顺序依次执行，宏任务可能产生微任务，微任务会在当前宏任务结束后执行。
        Node: 宏任务分为六种，加上整体的js代码 共七种。timers阶段有几个setTimeout/setInterval都会依次执行，
                setTimeout内的微任务会在这些代码执行完毕后执行。
                由于node版本更新到11，Event Loop运行原理发生了变化，一旦执行一个阶段里的一个宏任务就立刻执行微任务队列，浏览器端一致。

        process.nextTick:
        这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，
        就会清空队列中的所有回调函数，并且优先于其他 microtask 执行
*/
//?  2，Vue2与Vue3
/*
        1，vue3模板支持多标签
        2，compostionAPI取代OptionsAPI    老版本ts支持有限，因为有幕后操作，代码阻止逻辑差，可复用差
        3，瞬移组件
        4，不再打包到没用的模块
        5，对ts更好的支持
        6，性能更好，数据双向绑定使用proxy取代Object.definePropert
*/
//?  3，Vue与React
/*
        1，模板编写的区别，vue写的是近似常规HTML，react有专门的jsx语法。
        2，vue2底层重写了八个数组方法
        3，react单项数据流，vue数据响应式，react的优化需要手动，vue自动，问题是若是vue的state过多，
                watcher也会很多会导致卡顿，所以大型应用使用react更加可控。
        4，类式组件的写法和声名式的写法
        5，dom的更新策略不同。react 会自顶向下全diff，vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树
*/
//?  4，Vue双向绑定(响应式)
/*
        通过数据劫持结合发布者-订阅者模式的方式来实现的,实例化时遍历属性，为属性绑定set和get方法进行劫持。
        首先通过Object.defineProperty来监听属性，当这个属性的值发生变化时通过set方法设定后续操作，

        在vue中大致是通过Object.defineProperty作为发布者劫持数据，编译时将v-model v-bind等指令作为订阅者都添加到
        一个数组dep中，发生数据变化时通过set方法通知订阅者dep，dep数组就会循环执行订阅者们的update方法更新视图


        最简单的双向绑定实现：input输入文本 p标签同步变化，为输入框绑定input事件，每次通过input框更改值时触发，
        将更改的值设定为监听对象对应属性的值，使用defineProperty劫持，触发了set方法，在这更改p标签的innerText值，完成

        var xysObj = {}
        var names = '';
        Object.defineProperty(xysObj,'names',{
                set: (value=>{
                names = value
                console.log('设置名称为'+value);
                }),
                get:()=>{
                return '改名为' + names
                }
        })
        xysObj.names = 'set' //设置赋值names属性时触发 set
        console.log(xysObj.names);  //获取names属性时触发  get
*/
//?  5，mixins，
/*
        类似js的公共方法，mixins为一个对象，可以存放公用的数据或者通用的方法，使用mixins:[minxinsOption]调用
*/
//?  6，computed watch
/*
        共同点: 都是希望在依赖数据发生改变的时候，执行预先定义好的函数。
        不同点: 各自处理数据的场景不同，当数据变化需要异步或开销较大时watch更有效但没有缓存，computed不支持异步，基于数据的响应式依赖进行缓存。
        总结: 如果一个数据依赖其他数据时使用computed，如果一个数据变化后触发回调则使用watch
        watch:  immediate：true 回调将会在监听开始后立即执行，可以监听到第一次变化，deep：true 可以监听对象的所有属性
*/
//?  7，vue路由的实现原理
/*
        基于hash或history API 实现前端页面的部分更新，并且不会发送请求，例如hash的hashchange事件，更改url后会执行
        它的回调，在回调中获取到url参数，然后再执行相应的操作。

        vue-router使用params与query传参的区别：
                params是路由的一部分，必须要有使用需要用name不能path，query是拼接在url后面的参数，没有也可以。
                params不设置的时候刷新页面或返回参数会丢，query不会。
*/
//?  8，TypeScript
/*
        TS是强类型的JS的超集，支持ES6语法
        优点：编译时检查错误，支持所有js库，支持ES6，有助于代码结构，通过定义模块来定义命名空间，使用继承可提供重用性
        缺点：需要长时间编译，书写代码会更麻烦一点
        类型：共12个，基础类型9个，js的加上 tuple（元组） enum（枚举） never（代表不会出现的）
                不包含值的类型 void 不会有返回值 ，any任何类型
        编译：tsc xxx.ts
        TS接口：TS核心就是对值的结构进行类型检查，在参数类型检查时使用接口定义的规则进行检查，方便重用，更简洁，且规则可继承。
                接口可以定义对象数组函数类等，可以互相继承，可以继承类，可选属性和额外检查。
                接口就是对一些方法和变量的类型声明集合，可以实现继承，复用等
        TS类：描述某一组对象共有属性状态或行为的实体
        泛型：泛指某一类型，像一个类型变量，由尖括号包裹<T>，定义时不指定类型  使用时传入类型
        接口和类型别名type的区别：类型别名不能继承，对于元组，联合类型一般使用别名
        映射文件：是编译后的js与源文件直接的映射文件，调试器使用该文件，是我们可以直接调试ts而不是编译后的js
        类型断言：可以手动指定一个值的类型，也就是允许从一种类型更改为另一种。两种方式：<类型>变量、变量as类型（tsx只能用这个）
                let a:any ='sss';let b:number = (<string>a).length
        类型推断：当没有指定类型时编译器会试图推断类型 例let a = 0 执行推断为number 若要更改a的值为其他类型会报错。
        枚举：可以使定义的一些带名字的常量 用于清晰的表达意图和创建一组由区别的用例，有两种，数字自增和字符串，还有结合两者的异构枚举
        声明合并：编译器将两个或多个同名声明合并为一个，合并后的声明拥有被合并声明的所有特性，除了类不行。
        变量作用域：全局 类 局部 三种
        联合类型：var val:string|number   一个变量可以有多种类型
        元组：定义数组时指定数组元素的类型 let user: [string, number] = ["p", 1]


*/
//?  9，MVC，MPV，MVVM
/*
        都是常见的软件架构设计模式，通过分离关注点来改进代码的组织方式。

        MVC：将应用抽象为数据层（Model）、视图层（View）、逻辑层（controller），降低了项目耦合。但MVC并未限制数据流，Model和View之间可以通信。

        MVP：限制了Model和View的交互都要通过Presenter，这样对Model和View解耦，提升项目维护性和模块复用性。

        MVVM：是对MVP的P的改造，用VM替换P，将很多手动的数据=>视图的同步操作自动化，降低了代码复杂度，提升可维护性。
        它抽离了视图、数据和逻辑，并限定了Model和View只能通过VM进行通信，VM订阅Model并在数据更新时候自动同步到视图。
        最大特点是双向绑定，实现了view通过viewmodel对model自动同步，或者反向同步
*/
//?  10，递归
/*
        函数内部直接或间接调用函数本身即为递归
        一般用法 判断条件，不符合则return自己继续传递计算后的值调用，否则return结果
*/
//?  11，闭包
/*
        闭包的特点就是子函数能访问父函数的变量  不return子函数则外部无法访问内部变量
        用途: 1，能够让外部访问函数内的变量。2，变量的值始终保持在内存中
        内存泄漏？仅限IE低版本
*/
//?  12，继承方式
/*
        多种方式:1，原型链继承
                2，构造函数继承
                3，组合继承
                4，原型式继承
                5，寄生式继承
                6，寄生组合式继承(常用)
*/
//?  13，call applay bind
/*
        三者都可以改变this指向
        不同点:1，bind返回的是绑定this后的新函数，需要调用且传值可分多次，另两者会立即执行 传值也之只能一次
        2，传参方式 三者第一个参数均为this要指的对象，其余参数传给applay需数组形式，其他两者可直接传递
*/
//?  14，ES6+
/*
        1、let和const   不可重复声明、块级作用域、没有变量提升(存在暂时性死区 即声明前使用会报错)
        2、箭头函数      是匿名函数、没有原型、没有arguments对象，可用扩展运算取代、this指向（固定的）由上下文决定，无法new
        3、模板字符串    方便简洁不易出错，不再被单双引号困扰
        4、解构赋值      从数组和对象中提取值，对变量进行赋值
        5、for of      遍历数组，可用原生for的break、return，of是取value，遍历对象报错需要通过Object.keys
        6、import/export  模块化导入和导出，一般exprot default fn  import fn from '...'使用默认导出时导入不需要{}
        7、Set去重      [...new Set(arr)]
        8、展开运算符    可以将数组或对象里的值展开，或者多个值收集为一个变量
        9、修饰器       语法糖，用于修改类的行为
        10、class      类的继承，一个语法糖，让代码看起来更像面向对象的写法 es5 的继承是通过原型或者是构造函数机制来实现，
                        class里面有构造方法，类之间通过 extends 关键字实现，子类必须在 constructor 方法中调用 super 方法。
        11、promise    promise是同步，then是异步
        12、symbol     基本数据类型、唯一值、可用作对象的key
        13、proxy      代理   监听对象的操作，做一些相应的操作
        14、async/await   async声明一个函数是异步的，await用于等待一个异步方法执行完成
        15、属性简写     key == value 时 写一个即可
        16、属性名表达式  obj['test'] == obj.test
        17、generator  就是一个封装的异步任务的容器，async就是基于generator的语法糖 可暂停函数，yield会暂停，next向下执行
        17、Set和Map    Set对象允许存储任何类型的值，但是成员的值是唯一的。
                        Map对象与Object主要是Map的键可以是任意值，可以通过size获取键值对个数。有序
                        共同点：都有delete、has、clear等方法，Set还有add，Map还有set、get方法
                                遍历方法都有keys values entries forEach
*/
//?  15，跨域
/*

        浏览器的同源策略导致的问题,解决跨域有多种方式,在vue项目中常用的就是proxy代理解决
        还有JSONP,CORS等多种方式均能解决跨域问题
        JSONP:跨域实现是因为script标签没有跨域的限制,先定义一个回调,
        在script标签中引入需要访问资源的接口,加上一个callback(也可能是其他名称cb等)回调,回调就是定义的那个函数。仅限get请求。
        CORS:需要前后端配合使用,后端设定请求头等信息

        JSONP:跨域实现是因为script标签没有跨域的限制,先定义一个回调,
                在script标签中引入需要访问资源的接口,加上一个callback(也可能是其他名称cb等)回调,回调就是定义的那个函数。仅限get请求。

        CORS: （跨域资源共享）关键在于后端设置请求头。基本思想：使用自定义的HTTP头部让浏览器与服务器进行沟通，IE10以下不行，支持三种请求方式。

        Nginx:反向代理，安装nginx，修改nginx.conf配置文件，网站放到相应目录即可。

        window.postMessage: html5的API 跨窗口通信

        document.domian: 主域相同，二级域名不同可以使用

        proxy(vue开发环境): 将域名发送给本地服务器，再由本地的服务器去请求真正的服务器。

*/
//?  16，XSS,CSRF攻击
/*
        CSRF: 跨站请求伪造。引诱用户打开危险的网站，在危险网站中，利用用户的登录状态发起跨站请求 利用cookie
        解决CSRF攻击:1，验证HTTP Referer 字段 2，请求携带token 3，验证码 4，尽量使用post请求

        XSS:代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，
        攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全.
        解决XSS攻击:过滤输入和转义输出
*/
//?  17，HTTP1与HTTP2
/*
        HTTP1.0(短连接)
        HTTP1.1(长连接即TCP连接默认不关闭，最高支持6个持久连接)(分块传输，生产一块数据就发送一块)
        HTTP2.0(长连接+多路复用)
        HTTP1.1与2.0区别:
        1，多路复用   (只需一个连接即可实现并行，避免堵塞)
        2，采用二进制格式而非文本格式(帧) 更高效 错误更少
        3，服务器推送 (允许服务器未经请求，主动向客户端发送资源)
        4，请求头压缩(降低开销，相同的头部，只需要请求一次) gzip压缩
*/
//?  18，回流重绘 浏览器渲染
/*
        输入网址后:
        DNS服务器解析拿到服务器IP，浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手，请求到资源。
        浏览器解析:
        解析html文件 自上而下，遇到link，style，script会造成阻塞
        css解析,
        将css与dom合并
        布局绘制

        浏览器渲染流程: 1，处理HTML标记构建DOM树，
                2，处理CSS标记构建CSSOM树，
                3，将DOM与CSSOM合并为render tree (渲染树)
                3.1，从DOM树的根节点开始遍历每个节点，
                3.2，对于那些节点，找到CSSOM树对应的规则并应用  display:none元素会忽略
                3.3，根据每个可见节点及对应的样式，组合生成渲染树
                4，根据渲染树布局，计算每个节点的几何信息
                5，将各个节点绘制到屏幕
                理解为：3、4表示回流(重排) 5表示重绘
        回流(reflow): 当渲染树中因元素尺寸、布局。隐藏等改变而需要重新构建的过程、重新渲染的
                (宽高位移伪类字体大小增删)
        重绘(repaint): 元素的样式改变不影响布局时，浏览器会将新样式重新赋予元素并重新绘制。(bg color )

        优化：css：直接改变classname、避免table布局、transform替代top、硬件加速
        js：避免频繁操作样式，一次性重新style或改变classname、复杂动画元素使用定位脱离文档流

        总结: 回流必将引起重绘，重绘不一定引起回流
        关于浏览器通过队列化批量执行修改操作 通过一定时间或一定操作数量触发
    */
//?  19，防抖节流
/*
        防抖: 高频率事件在n秒内只触发一次，若再次被触发则重新计时
        防抖场景: 用户点击按钮太快造成多次请求、调整浏览器窗口，resize次数过多造成计算过多、实时编辑停止后保存
        防抖实现: 方案1，基于闭包实现，创建防抖函数，定义一个变量为null(接收定时器)，返回一个函数，
                      返回的函数清除该变量的定时器再执行一个定时器赋值给该变量，定时器内部执行需要调用的函数。
        防抖代码:       基于闭包实现的基本防抖封装
                      function debounce(fn,time){
                        let timeout = null
                        return function () {
                          clearTimeout(timeout)
                          timeout = setTimeout(fn,time)
                        }
                      }
        节流=CD: 游戏技能触发后将有‘CD’时间，指定时间内技能不能再次触发
        节流场景: scroll事件，每隔一秒计算一次位置信息、浏览器播放事件，每隔一秒计算一次进度、input实时请求
        节流实现: 方案1，时间戳方式，首次触发立即执行。创建节流函数定义上一次时间为0返回一个函数获取当前时间，
                      再判断当前时间-上次>间隔时间，执行需调用的函数并将当前时间赋值给上次时间变量
        代码实现:
                      function throttle(fn,time){
                        let prev = 0
                        return function () {
                          let now = Date.now()
                          if(now-prev>time){
                            fn()
                            prev = now
                          }
                        }
                      }
                方案2，定时器方式，首次触发需等待间隔时间再执行。创建节流函数，声明一个记录变量，返回一个函数，
                      判断变量为false时将定时器赋值给变量，定时器内执行需要调用的函数，并清除自己或设为null
        代码实现:
                      function throttle(fn,time){
                        let timeout
                        return funtion () {
                          if(!timeout){
                            timeout = setTimeout(()=>{
                              fn()
                              timeout = null
                            },time)
                          }
                        }
                      }
    */
//?  20，元素实现居中
/*
        块级元素垂直水平居中:
                        1，flex justify-content:center;align-items:center;
                        2，父相对定位，子绝对定位 top和left设置50%; transform: translate(-50%,-50%); (偏移法)
                        3，父相对定位，子绝对定位 top left right bottom全0 + margin:auto; (绝对定位法)
                        4，(明确宽高) 父相子绝 margin-top margin-left  值都是一半的宽高
        行或行块元素垂直居中: 1，父 line-height=hieght、text-align:center;
*/
//?  21，BFC
/*
        简述: 块级格式化上下文，可以理解为一个独立的盒子，盒子内容与外界毫不相干。
        触发条件: 元素设定绝对或固定定位，overflow不为visible，float不为none, display:flex或inline-black等
        作用:
                1,最常用的就是清除浮动，设定父元素，overflow:hidden;
                2,避免margin重叠(同一BFC中元素margin会重叠)
                3,阻止元素被浮动元素覆盖，被影响的元素设定overflow: hidden;
        缺点: 会引起重排,消耗性能?
*/
//?  22，ECharts
/*
        获取元素，初始化类  配置， 导入配置渲染
*/
//?  23，Vue闪烁
/*
        1，使用v-cloak指令:

            <ul v-cloak>
              <li v-for="(item, index) in 10" :key="index">{{item}}</li>
            </ul>

        2，随后设定css:

            [v-cloak] {
                display: none;
            }
*/
//?  24，虚拟DOM
/*
        虚拟dom是一个对象，一个用js来模拟真实dom的对象，
        因为直接操作dom性能开销会比较大，而通过js来操作这个虚拟dom再通过diff算法来对比差异，更新会更高效。

        如果在一段时间内更改多次dom结构，可能会造成浏览器多次重排，使用虚拟DOM可以在拿到最后的变更后只进行一次重排。

        diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。

        缺点：1.首屏加载时间更长 2.端场景下性能不是最优解（节点全改的话相当于无效diff）

*/
//?  25，new操作的过程
/*
        (1)创建一个新对象
        (2)构造函数的this指向这个新对象
        (3)执行构造函数的所有代码
        (4)返回新对象

        1，创建一个空对象
        var obj = new Object()

        2，链接到原型
        obj.__proto__ = Func.prototype

        3，绑定this指向，执行构造函数
        (创建新的对象之后，将构造函数的作用域赋给新对象(因此this就指向了这个新对象))
        var result = Func.call(obj)

        4，返回新对象，如果这个函数没有返回其他对象的话
        (如果是值则返回obj否则返回这个引用类型的对象)
        if (typeof(result) == "object"){
         func=result;
        }
        else{
         func=obj;;
        }
*/
//?  26，深浅拷贝
/*
        基本数据类型的赋值都是深拷贝，
        在引用类型的数据中实现浅拷贝可以使用
        es6扩展运算符 Array.from方法 concat()方法 slice()方法,onject.assign()方法
        其中concat和slice只能深拷贝一层数据，多层嵌套则会直接引用，变成浅拷贝
        深拷贝：
        JSON.parse和JSON.stringify方法  JSON.parse(JSON.stringift(obj))
        但是JSON的方法会忽略 undefined,无法对function处理，不能解决循环引用的对象
        或者使用递归的方式写一个深拷贝

        深浅拷贝是针对object和array这样的引用数据类型

        浅拷贝是只复制栈地址，也就是复制某个对象的指针而不是本身，新旧对象还是共享同一块内存
        深拷贝会创造一个一样的对象，新对象跟原对象不共享内存，修改新对象不影响原对象

        直接赋值与浅拷贝的区别: 直接赋值无论任何类型的数据改变都会影响双方，浅拷贝后修改基本数据类型的值时原数据不会变化。

        浅拷贝: Object.assign({},obj)只有一层对象时是深拷贝、{...obj}扩展运算符、array.concat()、array.slice() ‘奈’
                最后两个数组方法如果元素为基本数据则为深拷贝

        深拷贝: JSON.parse(JSON.stringify(arr或obj)) 原理，将对象或数组的键值对转为json字符串再解析，
                会忽略 undefined,不能解决循环引用的对象，处理函数直接抛错、  手写递归方法
*/
//?  27，node的优缺点
/*
        单线程、事件驱动、异步非阻塞I/O、性能出众、基于js
        Node通过event loop来实现并发操作. 非阻塞(例:无需等待硬盘，硬盘准备好的时候非阻塞接口会通知node)
        应用场景:
        适合I/O密集型的应用，如在线多人聊天，多人在线小游戏，实时新闻，博客，微博之类的。
        不适合的场景有：cpu密集型的应用，如计算圆周率，视频解码等业务场景较多的。逻辑复杂的事务。
*/
//?  28，localStorage sessionStorage cookie token session
/*
        session: 会话。服务器区分各个客户端是谁发送的请求，每个客户端的身份标识就是session
                 用于区分不同的客户端请求，客户端采用cookie保存身份标识。请求时携带session_id
                 服务端通过session判断是否存在。

        token:   令牌。验证用户身份的方式，由uid time 签名 组成，使用哈希算法压缩。应用场景:
                 用户首次登录或注册时服务端生成并保存在数据库，再返回给客户端，客户端拿到后保存在本地
                 下次打开网站时将token值附带到参数中发送给服务器验证。

        cookie:  Cookie辨认用户状态,当数据交换完毕后客户端与服务端会断开链接,再次连接的时候可以通过cookie辨认用户

        token与session: token更安全，因为token加密过，只有服务器才能解密识别。无法被篡改

        cookie与session: Cookie通过在客户端记录信息确定用户身份，Session通过在服务器端记录信息确定用户身份。

        localsStorage、sessionStorage、cookie:
                  共同点: 都是保存在浏览器端，且遵循同源策略
                  不同的: 1，大小: 前两者最大可存储5M，cookie为4k且一般不能超过20条cookie
                         2，生命周期: cookie可设定有效期，ls永久性存储除非手动清除。ss会话级 关闭窗口即失效
                         3，通信: 前两者存储于客户端不参与，cookie每次都携带在请求头中，过多数据会带来性能问题
*/
//?  29，get，post
/*
        GET重点获取数据，POST是发送数据
        GET传输数据是通过URL请求的，这个过程用户是可见的，传输量小于POST，受URL长度限制
        POST可以传输大量数据，上传文件只能选择POST
        POST相比GET更安全，发送数据的内容发在请求体中
*/
//?  30，数组方法，对象方法
/*
        1.Array.map((item,index,arr)=>{}) //必须return返回新数组
        2.Array.forEach((item,index,arr)=>{}) //没有return 改变原数组
        3.Array.filter(item=>{})  //过滤 传入一个判断条件，将满足条件的值变成一个新的数组返回
        4.Array.every(item=>{})  //判断所有元素全部为true才返回true 否则false
        5.Array.some(item=>{})  //若有一项为true则返回true
        6.Array.reduce(初始值（或上次返回值），当前元素是，当前索引，arr) //为数组中的每一个元素依次执行回调函数
        7.Array.push(一个或多个元素) //数组尾部推入元素，改变长度
        8.Array.pop() //删除数组最后一个元素，改变数组长度
        9.Array.shift() //删除数组第一个元素，改变数组长度
        10.Array.unshift(一个或多个元素) //数组前添加一个或多个元素，改变数组长度
        11.Array.isArray(arr) //判断一个对象是否为数组是则返回布尔值
        12.Array.concat(newarr) //将多个数组合并成一个数组
        13.Array.toString() //将数组转变为字符串格式，元素间隔为(,)
        14.Array.join('')  //将数组转变为字符串格式，但是可以设置元素之间的间隔
        15.Array.splice(开始位置， 删除的个数，元素) //可以实现增删改，会影响数组
        16.Array.slice(开始下标，结束下标) //从原数组开始下标到结束下标截取返回新数组
        17.Array.includes(查询数组内的的某元素) //判断数组中是否有传入的元素，有则true
        18.Array.indexOf(要查的项，查找起点的下标) //从数组开头向后查找 有则返回该元素索引无责-1
        19.Array.sort() //按指定的参数对数组进行排序，改变原数组。返回排序后的数组 无参数
        20.Array.fill(替换的值，从哪个下标开始替换，结束的下标) //替换数组中的元素，改变原数组 传一个值会替换整个数组
        21.Aarray.flat //数组扁平化

        1.Object.assign(原对象，需克隆对象) //克隆对象，合并新对象，改变第一个参数的对象
        2.Object.is(值1，值2)  //比较两个参数 不会强制转换类型，返回布尔值
        3.Object.keys(对象)  //获取对象的key，返回包含key值的数组
        4.Object.values(对象) //获取对象的value，返回包含value值的数组
        5.Object.defineProperty(要加属性的对象，属性的key，对象)  //对象的属性的属性特征 value设置属性名，
                        enumerable设置该属性是否可以被枚举。未设置的枚举的属性不能被for in遍历和keys获取。
        6.Object.defineProperties() //可添加多个属性，与上对应
        7.Object.isPrototypeOf(实例对象) //检查一个对象是否存在另一个对象的原型链中。
*/
//?  31，箭头函数与普通函数
/*
        1，不能作为构造函数，不能new，不绑定arguments(可用扩展符充当)和this，
        2，没有原型属性prototype，不会创建自己的this，只会从作用域链的上一层继承。
        3，在定义时this就被绑定了，而不是调用时。
*/
//?  32，Promise
/*
        promise是异步编程的一种解决方案，也解决了回调地狱的问题。

        有三种状态：pending（等待） resolved/fullfilled（成功） rejectd（失败）

        创建Promise对象的两种方式：
                1，new Promise(r=>r(v)) 参数具有then方法
                2，Promise.resovle(v) 参数没有then方法或无参，
                        返回一个resovle状态的promise，相当于定义有状态的promise

        then也有两个回调，成功与失败的回调，失败后会进入失败回调，若定义了catch则最终进入catch
        catch也会像then一样返回一个promise对象，并且是成功状态，所以，catch后面若是有then 也会执行。所以一般catch放最后
        Promise.allSettled  需要执行多个平行和独立的异步操作并收集所有结果时非常有效，即使某些异步操作可能失败
                与 all()的区别：
                   all()返回一个直接包裹resolve内容的数组，而allSettled()返回一个包裹着对象的数组。
                   all()一个错则全错，allSettled()可以继续使用成功的数据

        Promise.catch  捕获异常
        Promise.then .then和.catch 的参数期望是函数，传入非函数则会发生值穿透。（值为最初的）
                        一定要return结果（同步）或新的promise对象（异步任务时使用）才能让之后的then回调接收
        Promise.race 返回最先结束的结果，无论成败
        Promise.all  多个任务，如果成功则以数组的形式返回所有结果，若有一个失败则返回失败
        Promise.finally  无论成功与否都会执行

        promise中断请求:
        1,抛出错误即中断
        2,设定状态为reject中断
*/
//?  33，垃圾回收机制
/*
        垃圾回收：找出不再需要的变量，然后释放其占用的内存，但是这个过程不是实时的，因为开销比较大，
                 所以垃圾回收系统会按照固定的时间间隔，周期性的执行。
        实现方式：标记清除(常用)和引用计数
                 标记清除: 进入环境->离开环境
                 引用计数: 跟踪记录每个值被引用的次数。当变量被引用的次数为0时清除。
*/
//?  34，history与hash
/*
        主要是history刷新会丢失页面，需要进行nginx路由配置， 微信web界面开发不能使用history
        hash: 特点是url带有# 后面hash值发生变化并不会导致浏览器发送请求，也就不会刷新页面
              每次hash值的变化都会触发hashchange事件，所以可以监听这个事件实现更新页面部分内容
        history: 14年html5推出的API，它可以使用pushState()方法记录操作历史，监听popstate事件来监听到状态变更；
                 用户刷新页面会404，因为没有#，所有浏览器会发送请求到服务器，解决方案，可以把所有路由都重定向到根页面
*/
//?  35，http请求头
/*
        1，accept:浏览器可以接受的文件类型
        2，accept-encoding:浏览器可以接受的数据编码
        3，accept-language:浏览语言
        4，cookie:存放用户相关的信息
        5，user-agent:浏览器版本信息
        6，content-encoding:压缩类型
        7，content-length:数据大小
        8，content-type:数据格式
        9，set-cookie:服务端通知客户端设定cookie
*/
//?  36，项目优化方案
/*
        尽可能少的操作dom，不仅是dom相对较慢，更是防止回流或重绘

        性能分析  window.performance.timing
                主要性能指标 DNS查询耗时、request请求耗时、解析dom树耗时、白屏时间

        有三个部分  1，代码层优化
                                正确区分v-if和show使用场景。computed和watch场景
                                v-for添加key且同时避免使用v-if，使用key能使diff更快速准确的区分，v-for优先级比if快
                                vue组件销毁时销毁事件，定时器等。
                                封装公共组件
                                图片资源懒加载
                                路由懒加载
                                第三方插件按需引入
                                优化长列表，上拉加载
                                2，webpack配置层优化
                                对图片进行压缩

                                3，基础的web技术层优化
                                开启gzip压缩
                                浏览器静态资源缓存
                                cnd 通过不同的域名来加载文件，从而使下载文件并发连接数大大增加
                                使用http2
                                图片资源 雪碧图或icon svg图标
*/
//?  37，首屏优化方案
/*
        1，静态文件缓存方案
        2，资源动态加载: 按需引入，组件懒加载，图片懒加载（通过img标签的loading='lazy'），雪碧图或使用svg或字体图标 icon
        3，减少请求的数量，主要是针对http1.1，因为是1.1请求是串行的，每个请求都需要往返后才可以继续下个操作
                合并请求可以减少在传输过程中浪费的事件，此外还会带来重复的请求头信息。
        4，页面使用骨架屏，在渲染完成前通过简单的元素进行占位，用户体验更好。
        5，引用http2，主要是提升传输的性能，
        6，优化cssom，因为css加载会阻塞dom的渲染，gzip压缩或缩小体积以及缓存很重要。
        7，利用CDN，部署多态服务器，离用户最近的服务器工作
*/
//?  38，iframe
/*
        iframe是一个内联框架，用来在当前html页面中嵌入另一个文档。
        <iframe src='文件路径'></iframe>
        性能不好，样式脚本需额外链入，会增加请求。
        已被取代
*/
//?  39，语义化
/*
        使用合理的HTML标签表达页面结构，能够通过标签判断内容。
        语义化的好处:利于SEO、没有CSS也能很好的呈现页面结构，利于开发维护
        常用标签: ul li nav(导航) footer(页脚) ...
*/
//?  40，数组扁平化
/*
        多维数组(数组嵌套)，将其转为一维数组
           const arr = [1,[2,[3,[4,5]]],6]
        1，使用flat()
           arr.flat(Infinity)
           console.log(arr.flat(Infinity))
        2，递归
           const res = [];
           const fn = arr => {
             for(let i =0;i<arr.length;i++){
               if(Array.isArray(arr[i])){
                 fn(arr[i])
               }else{
                 res.push(arr[i])
               }
             }
           }
           fn(arr)
           console.log(res)
*/
//?  41，高阶函数、高阶组件
/*
        一个函数能接收另一个函数作为参数或返回值，这就是高阶函数。
        例: map() reduce() filter() forEach()
        因为js中一切皆对象，且函数作为一等公民，可以将它作为参数传递给其他函数，或者赋值给变量并传递。

        1，高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。新的组件使用传入的组件作为子组件。
        2，高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中。
           新的组件和传入的组件通过 props 传递信息。
*/
//?  42，import和require
/*
        import: es6语法。编译时调用，必须放在文件开头
        require: AMD规范的引入方式，运行时调用，可以随处引用。
        总结: 模块化思想，都是引用模块的方式。模块化规范不同，写法不同。
              require是赋值过程，他的结果就是对象函数等，
              再把require的结果赋值给某个变量。import是解构过程，
              export用于对外输出本模块变量的接口，import加载引用。
*/
//?  43，原型和原型链
/*
        隐式原型:__proto__
        显示原型:prototype
        区别: 实例对象.__proto__ === 构造函数.prototype
        原型: 每一个对象都与另一个对象相关联，那个关联的对象就称为原型。
        原型链: 原型对象实际也是个普通对象，它也有自己的原型，层层递进形成链条。就是原型链。
        作用: 实现继承
*/
//?  44，清除浮动
/*
        末尾子元素clear:both; 2,父元素设定height; 3,伪类; 4,父元素设定overflow:hidt,与width,不能有height
        当父元素没有设定高度其子元素又设定了浮动的情况下就会造成父元素高度塌陷。清除浮动后高度为子元素最高高度。

        浮动造成的副作用: 1，为父元素设定overflow:hidden;激活BFC，BFC会将浮动元素高度也计算进去。(不推荐)
                          2，父元素设定高度
                          3，最后一个浮动子元素后新增空标签设定clear:both;
                          4，伪类after -> visibility: hidden;
*/
//?  45，url输入到浏览器渲染过程
/*
        域名解析->TCP三次握手->发送HTTP请求->服务器响应->传输资源->浏览器解析->渲染
*/
//?  46，钩子函数
/*
        钩子函数: 只是一个函数，但特殊的是它是在系统消息触发的时候被系统调用而不是用户自己触发。
                 一般来说钩子函数是某些框架的叫法，在这个框架的生命周期的某一阶段触发的回调函数。
        回调函数: 定义一个方法给事件，事件触发后执行该方法。
*/
//?  47，遍历的几种方法
/*
        for (普通遍历)
        for...in (遍历对象)
        for...of (无法遍历对象)
        forEach(没有返回值)
        map() (return返回新数组)

        for...in:
            for(let key in obj){

            }
        for...of:
            for(let item of arr){

            }
        forEach():
            //回调接收三个参数，当前项，索引，所属数组对象
            arr.forEach((item,index,arr)=>{

            })
        map():
            //原数组经过处理 再return 映射成对应的新数组
            let arr2 = arr.map((item,index,arr)=>{
              return item + 1
            })
        forEach()和map()区别:
            forEach() 没有返回值 (没有return) 不能中断 影响数组
            map() 支持return 不影响原数组

        forEach更多的用来遍历数组
        for in 一般常用来遍历对象或json
        for of数组对象都可以遍历，遍历对象需要通过和Object.keys()
        for in循环出的是key，for of循环出的是value
*/
//?  48，拦截器
/*
        导航守卫，检查请求头是否有token，没有则重定向登录页，有则可以跳转
        Axios拦截器，拦截后端接口
                每次发送请求之前判断vuex或者本地存储是否存在token，存在则在请求头加上token发送
        导航守卫就是路由守卫，判断是否有权限访问，axios拦截器就是发送请求判断token的有效性。
        一起使用确保登录状态。
*/
//?  49，css引入
/* 
        1. 导入式    @import"mystyle.css";

                        会在整个网页装载完后再装载CSS文件,可能导致闪烁白屏

        2. 链接式    <link rel="stylesheet" type="text/css" href="my.css"/>

                        最能体现DIV+CSS中的内容与显示分离的思想，也最易改版维护，代码看起来也是最美观的一种。

        3. 行内式    <span style="color:red">信息</span>
            
                        难看，不利于维护，不可复用
                
        4. 内嵌式    <style type="text/css"> div{color:blue} </style>

                        门户网站使用较多，优点：速度快  缺点：在单个页面中，会臃肿 维护也麻烦
*/
//?  50，内存泄漏
/*
        程序不再需要的或无法访问到的变量没有回收仍然占据着内存则导致了内存泄漏
        导致内存泄漏: 1，意外的全局变量。没有通过声名的变量将会一直留在内存中或this创建的变量，会挂到window上
                    2，未清除的计时器或回调。
                    3，脱离DOM的引用。  dom元素已删除，但引用的变量仍然保留在内存，应设null
        避免内存泄漏: 1，减少不必要的全局变量。2，避免进入死循环。3，避免创建过多的对象。
*/
//?  51，事件冒泡，事件捕获和事件委托
/*
        事件冒泡: 从当前触发的目标向上一级一级传递，依次触发事件，直到document。
        事件捕获: 与冒泡相反，从document开始向下传递，依次触发事件，直到真正事件目标。
        事件委托: (事件代理) 利用冒泡机制，监听父元素，给不同的子元素绑定事件
        设定捕获: el.addEventListener('click',fn, true);第三个参数默认为false，即冒泡
        阻止冒泡: e.stopPropagation(); 帕波给生
*/
//?  52，h5新特性
/*
        1，音视频API WEBRTC
        2，canvas，svg
        3，webstorage
        4，语义化元素:  header、nav、footer、article
        5，表单控件:  date、time、url、email
        6，history API
    */
//?  53，优雅降级，渐进增强
/*
        | 向下兼容,向上兼容
        1，优雅降级:  预先开发完整项目功能，再针对各浏览器作测试和修复适配。
        2，渐进增强:  预先针对低版本浏览器构建基础功能，再针对高级浏览器进行效果、交互、追加功能提升体验。
*/
//?  54，webpack
//?  55，伪类与伪元素
/*
        都不在DOM树中。
        伪类使用单冒号: hover、nth-child(2n)选择子元素 link未访问、visted访问过、focus等
        伪元素使用双冒号: after后、before前、first-line添加样式到文本首行、first-letter首字母
        总结: 伪类的效果需要一个实际的类才能达到。伪元素需要实际的元素达到。
*/
//?  56，nextTick
/*
        解释: Vue执行DOM的异步更新，只要观察到数据变化，vue会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
             (改变data中的数据变更dom实际上是异步操作)
             nextTick会在dom更新后执行延迟回调，而不是马上执行，确保能获取到最新的dom元素。

             Vue中的nextTick涉及到Vue中DOM的异步更新,  nexttick的回调就是在异步操作执行完毕后才执行的，主要就是为了在数据变化之后等待 Vue 完成更新 DOM

        分析源码: 把回调函数放入callbacks等待执行，将执行函数放到微任务或宏任务中(根据环境，优先微任务)，
                事件循环到了微任务或宏任务，执行函数依次执行callbacks回调

                Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替

        Vue.nextTick() 是全局方法。this.$nextTick() 是实例方法

        应用场景: 1，created()钩子中操作DOM时必须放在nextTick中，因为created阶段dom未渲染
                 2，在数据变化后要执行某个操作，而这个操作需要使用随数据而改变的dom结构时
*/
//?  57，keep-alive
/*
        被<keep-alive>包裹的组件或router-view会缓存，且该组件会多两个生命周期，
        activated、deactivated。
        1.activated：首次进入触发的顺序是created->mounted->activated  离开时触发deactivated 再次进入只触发activated
        2.deactivated: 组件停用时会触发deactivated，当再次前进或者后退的时候只触发activated

        include和exclude用法: <keep-alive include="bookLists,bookLists"><keep-alive exclude="indexLists">
                             include表示会缓存的组件名，exclude不会缓存的组件名。
                             或者也可以直接在router中设定meta:{keepAlive:true}表示该组件会被缓存，
                              {
                                path:'/',
                                name:'home',
                                components:Home,
                                meta:{
                                  keepAlive:true //需要被缓存的组件
                              },
                             使用:
                             <router-view v-if="this.$route.meat.keepAlive"></router-view>
*/
//?  58，Vue父子生命周期
/*
        创建父子: 父创建前后->父挂载前->子创建前后->子挂载前后->父挂载后
        更新子影响父: 父更新前->子更新前后->父更新后
        更新子不影响父: 子更新前后
        更新父影响子|不影响子: 同上
        销毁子: 子销毁前后
        销毁父: 父销毁前->子销毁前后->父销毁后
     */
//?  59，判断类型的方法
/*
        1，typeof: 它是一元运算符，返回全小写字符串，null、[]等返回object。例: typeof []; //object
        2，instanceof: 通过原型链判断A是否为B的实例。 例: [] instanceof Array;  //true
        3，constructor: 通过原型链遗传的类型，创建的值的类型被遗传了。 例: ''.constructor == string //true
        4，Object.prototype.toString(): Object的原型方法。
            使用方法: object类型直接使用，其他类型需要call或apply。常用于判断浏览器内置对象。
            例: Object.prototype.toString.call('')  //"[object String]"
        5，Array.isArray(): 判断是否为数组。 例: //Array.isArray([]) //true
*/
//?  60，Vue组件通信
/*
        1，props （父传子）（单项数据流）
                  父组件传值给子组件，子组件通过props接收数据或方法并可以设置必填项和参数类型等
        2，$emit/$on （子传父）
                  子组件定义事件，调用this.$emit(事件名,数据)，父组件在子组件标签上使用v-on监听事件，（v-on:事件名='方法'）取值
                  props结合$emit方式实现双向绑定
        3，vuex
                  状态管理，就像是一个全局的变量集合，但是又是响应式的，而且只能通过commit->mutaion来改变数据
                  五大模块：state 存放变量
                          getter 相当于计算属性
                          mutation 修改store中的变量的方法
                          action 异步操作后提交给mutations改变变量
                          module vuex模块化，所有的访问都要经过命名空间
        4，$parent / $children
                  parent写在子组件，children写在父组件中可获得变量和方法
        5，$attrs/$listeners
                  $attrs：
                          父组件的属性如果子组件没有通过props接收则该属性就会存在于子组件的$attrs上，
                          通过v-bind='$attrs'传给下个子组件 各个子组件可使用this.$attrs取值
                  $listeners：
                          子组件的事件通过$listeners传递给父组件，父组件通过v-on='$listeners'向上传递
                          父组件监听事件v-on:event=’onevent‘，子孙组件使用this.$emit(‘event‘,‘数据‘)触发，父孙中间组件就是用v-on$listteners传递
                  inheritAttrs: false  只继承class属性 true继承除props外的所有属性（元素结构会显示值）

        6，provide/inject
                  主要在开发高阶插件/组件库时使用，不推荐普通代码使用
                  父组件注册了provide，子组件无论层级多深都能通过注册inject拿到值
        7，EventBus
                  事件总线，相当于中介，小项目推荐使用，使用方式分为局部和全局
                  局部：新建eventbus.js文件 不需要dom 创建实例方法即可 import Vue from 'vue'
                        export const EventBus = new Vue()
                  全局：在mian.js中将eventbus挂载到vue实例即可。Vue.prototype.$EventBus = new Vue()
                  使用局部： import EventBus from '../eventBus.js'
                        // 发送消息
                        EventBus.$emit(channel: string, callback(payload1,…))
                        // 监听接收消息
                        EventBus.$on(channel: string, callback(payload1,…))
                        多次触发解决：页面销毁时需要清除，EventBus.$off()全清或EventBus.$off('amsg')指定清除
                  使用全局：
                        this.$bus.$emit("sendMsg", '数据');
                        this.$bus.$on('updateMessage', function(value) {
                          console.log(value); // 数据
                        })
        8.$refs
                  父组件给子组件绑定ref='child'即可使用this.$refs.child拿到子组件的变量或方法
        9.Pinia
                  与vuex相比 更好的ts支持 没有了mutations，不再需要注入、导入函数、调用函数，无需动态添加 Store，不再有 modules 的嵌套结构。
        10.mitt
                  vue3的事件总线

*/
//?  61，Vue hooks
/*
        理解：js代码组件化，UI和逻辑解耦提高可维护性
        使用：封装某一功能的代码，在需要的地方导入调用（自定义hooks）

        2023： hooks一般是带有生命周期或者是vue api的，涉及到变量保存等，普通函数例如 utils 一般是工具类方法
*/
//?  62，React hooks
/*
        react有两种组件，函数组件和类组件，官方推荐组件的最佳写法应该是函数而不是类，类会比较复杂。
        但是纯函数组件又有很多硬伤，比如没有状态，没有生命周期，没有this。这也就表示函数组件只能写
        UI展示类型的组件，要是涉及到状态的管理和切换就不得不使用类组件或redux了。后来官方为了解决
        这些问题，设计了hooks，hooks的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用
        钩子把代码钩进来。约定：钩子一律使用use前缀命名，useState userContext useEffect userReduce四种常用钩子
 */
//?  63，微信小程序
/*
        1，封装请求：根目录创建utils目录及api.js和apiConfig.js文件
                        在apiConfig里封装基础的get、post等请求方法，设置请求体带上token
                        在api引入apiConfig，根据页面数据请求的urls，设置对应的方法并导出
                        在使用的页面引入

        2，传值的方式：使用全局变量、页面跳转或重定向时url携带参数、使用组件目部传值、使用缓存传值、使用数据库传值
        3，小程序的双向绑定和vue的区别：大体相同，但小程序直接this.data的属性是不可以同步到视图的，必须调用setData方法
        4，生命周期函数：onLoad 页面加载触发，只调用一次，可获取当前页面的路径参数
                        onShow 页面显示/切入前台触发。一般用来发送数据
                        onReady 页面初次渲染完成后触发，代表可以与页面交互
                        onHide 页面隐藏/切入后台触发
                        onUnload 页面卸载触发
        5，小程序原理：本质是一个单页面应用，所有的页面渲染和事件处理都在一个页面进行，但又可以通过微信客户端调用原生的各种接口
                        数据驱动架构，UI和数据分离，所有页面更新都需要对数据更改来实现
                        技术和前端差不多，采用js wxml wxss三种技术进行开发
                        功能分为webview和appservice两部分
                        webview展示UI，appService处理业务逻辑数据及接口调用
        6，小程序和原生app：小程序主要是开发成本低和无需下载等优势，但限制在微信 功能和原生接口并不多，体验没有原生好。
        7，bindtap与catchtap的区别：都是点击事件函数，点击触发，区别是bingdtap不会阻止事件冒泡
        8，路由区别：wx.navigateTo 保留当前页面，跳转到页面某个页面，但不能是tabbar页面
                        wx.redirectTo 关闭当前页面，跳转到页面某个页面，但不能是tabbar页面
                        wx.switchTab 跳转到tabbar页面，并关闭其他所有非tabbar页面
                        wx.navigateBack 关闭当前页面，返回上一页或多级页面
                        wx.reLaunch 关闭所有页面，打开到应用内的某个页面
        9，小程序与H5的区别：运行环境不同、开发成本不同（h5需要兼容不同浏览器）、获取系统权限不同、流畅度不同（h5需要看浏览器）
        10，持久化：通过wx.setStorageSync方法。
        11，下拉刷新：通过wx.startPullDownRefresh
*/
//?  64，移动端
/*
        click的300ms延迟问题和点击穿透问题：一般使用touchstart touchend touchmove tap事件取代click

        防止手机页面放大缩小：meta标签的content设定

        实现自适应布局：用媒体查询做响应式页面、flex、bootstrap栅格系统

*/
//?  65，nginx
/*
        特点：跨平台、配置简单、反向代理、高并发连接
        功能：做负载均衡，反向代理和缓存http请求等
        使用：修改nginx.conf文件

*/
//?  66，flex
/*
        flex-direction 排列方向
        flex-wrap 是否换行
        flex-flow 前两简写模式
        justify-content 主轴对其方式
        align-item 交叉轴对齐方式
*/
//?  67，Vue数据侦测
/*
        对象侦测的方式：检测到变更后执行对应的操作
        1，Object.defineProperty()（vue2）：缺陷，不能监听新增属性和数组的变化(vue重写7个数组方法解决)，
                必须深层遍历对象所有属性或嵌套对象，也就是对象的每个属性都调用一次defineProperty为止。

        2，ES6的proxy（vue3）：支持新增属性监听 支持数组（15种方法），不需要对对象的每个属性都进行遍历，对象的所有key都可以走进set，
                同样不支持嵌套对象，需要遍历。关键（不会污染原对象，返回新对象）

*/
//?  68，自定义指令
/*
        自定义指令一般是用来操作DOM的，或者用来集成第三方插件(方便使用插件，例如指令传参配置插件调用)
        使用方法: (directive)分为全局注册和局部注册，然后在模块中直接使用。
        提供了几种钩子函数: bind  绑定元素时调用，执行一次
                        inserted  被绑定的元素，插入到父节点的dom时调用
                        update 更新、unbind 解绑，执行一次、
                        componentUpdated 组件与子组件更新时调用
        除update 与 componentUpdated 钩子函数之外，每个钩子函数都含有 el、binding、vnode 这三个参数
        可以写修饰符和传参
*/
//?  69，变量提升与函数提升，意外的全局变量
/*
        未定义的变量在赋值前使用不存在变量提升，直接抛错。
        重新声明一个变量，它不会丢失其值
        1，在浏览器进行编译的时候，变量声明和函数声明都会提升，并且函数声明的提升优先级大于变量声明的提升
        2，函数表达式不可提升
*/
//?  70，浮点数
/*
        二进制浮点运算导致  十进制转为二进制运算后再转为十进制输出导致的差异。
        解决: 1，扩大倍数，((0.1*100+0.2*100)/100)
              2，toFixed(2)，保留两位小数，四舍五入法
*/
//?  71，设计组件
/*
        单一职责、无副用(不应对父组件产生副作用)、传参类型检查，可重用性、可扩展性

*/
//?  72，单页面，多页面区别
/*
        单页面SPA: 首屏加载慢，不利于SEO(需要单独的方案做)，页面切换快
        多页面MPA: 反之
*/
//?  73，执行上下文
/*
        1，JavaScript是单线程
        2，栈顶的执行上下文处于执行中，其它需要排队
        3，全局上下文只有一个处于栈底，页面关闭时出栈
        4，函数执行上下文可存在多个，但应避免递归时堆栈溢出
        5，函数调用时就会创建新的上下文，即使调用自身，也会创建不同的执行上下文

        2023：
        在代码开始执行的时候，首先会产生一个全局执行上下文环境，调用函数时，会产生函数执行上下文环境，函数调用完成后，
        它的执行上下文环境以及其中的数据都会被销毁，重新回到全局执行环境，网页关闭后全局执行环境也会被销毁，
        其实这是压栈出栈的过程，全局执行上下文环境永远在栈底，而当前正在执行的函数上下文在栈顶。
*/
//?  74，commonjs和es6 module
/*
        语法不同
        commonjs是动态引入，执行时引入
        ES6  是静态引入，编译时引入，一般放在顶部
*/
//?  75，Vue修饰符
/*
        .sync 可以实现子组件与父组件的双向绑定，并且可以实现子组件同步修改父组件的值。
        .stop 阻止事件继续传播
        .prevent 阻止标签默认行为
        .capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
        .self 只当在 event.target 是当前元素自身时触发处理函数
        .once 事件将只会触发一次
        .passive 告诉浏览器你不想阻止事件的默认行为

        除此还有v-model事件和键盘事件修饰符
*/
//?  76，盒模型
/*
        标准盒模型(W3C盒子),IE盒模型(怪异盒子)
        标准:content仅限content;  IE:content包括content与border,padding
*/
//?  77，HTTP与HTTPS
/*
        HTTP协议在TCP协议之上，在他们之间添加一个安全协议层(SSL或TSL)就是HTTPS
        通信不适用明文加密，内容可能被窃取，(抓包分析)
        不验证通信方身份，可能遭到伪装
        无法验证报文完整性，可能被篡改
        HTTPS是HTTP+SSL加密处理+认证+完整性保护(HTTPS利于SEO)(需要SSL证书)
*/
//?  78，数学方法
/*
        取整数

        Math.parseInt();

        进1

        Math.ceil();

        向下取整

        Math.floor()；

        四舍五入

        Math.round()

        负数转为正数
        Math.abs(-2)
*/
//?  79，局部变量提升为全部变量
/*
        调用函数，函数内局部变量赋值给全局变量
*/
//?  80，delete和Vue.delete删除数组的区别
/*
        delete删除的元素下标不变值变成undefined，长度不变，vue.delete会改变数组键值，长度改变
*/
//?  81，vue或react的全局常量
/*
        process.env.NODE_ENV
*/
//?  82，AJAX原理
/*
        简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据
        之前都是客户端请求，服务端将文本的结果写入页面，使用ajax可先由js处理，然后刷新页面。

        AJAX的核心就是异步请求，就是XMLHttpRequest
        AJAX的无刷新请求功能就是利用了XMLHttpRequest的异步请求来完成的
*/
//?  83，Axios
/*
        请求拦截器，请求之前在请求头上加上token鉴权
        响应拦截器，响应之前判断响应状态，判断token是否过期

        路由拦截：meta添加require
        字段 判断没有token则需要登录
*/
//?  84，vue-router
/*
        SPA的路径管理器，本质是建立url和页面之间的映射关系

        导航钩子：
        全局守卫：beforeEach     可以在这判断是否有token 检查每一次跳转
        全局解析守卫： router.beforeResolve
        全局后置钩子： router.afterEach
        组件内的守卫： beforeRouteEnter、beforeRouteUpdate

        实现页面路由更改渲染不同组件,hash模式就监听onhashchange事件

        route和router 的区别：
        router控制页面跳转,route用于获取传递过来的数据.
        router是VueRouter的一个全局的对象，包含了所有的路由
        route是一个跳转的局部路由对象，每个路由都有一个route对象，可以获取name path params query等

        动态路由：this.$route.params接收参数  刷新会丢失

        关于权限:
                1、
                通过v-if来判断菜单,操作按钮的显示等,阻止通过链接或输入地址访问没有权限的页面.应该重定向到login页
                登录后获得token,在请求拦截器中加入,每次请求都需要根据token来获取数据,在初始化的时候先挂载不需要权限的路由
                登录页  404等,如果用户通过url强制访问则会直接进入404.登录后 获取用户的权限信息,然后筛选有权限访问的路由,
                在全局路由守卫进行调用addRoutes添加路由.

                2、
                通过meta的roles进行角色的控制，每个路由的元信息meta中都能添加相应的访问权限，
                再到beforEach中对to.mate.roles与当前角色的权限做判断，next({path:'/404'})或者next()

                3、
                动态路由添加:初始化时挂载默认的共同路由，获得到用户的权限后使用addRoutes动态渲染相应的路由，404需要放到最后

        路由懒加载：路由文件的component中使用require引入组件，只有当访问到的时候才会请求组件数据。

*/
//?  85，模块化:
/*
        ES6 Module   编译时引入，需要放在前面
        export导出，需要 {} 大括号取出
        export default 默认导出，不需要花括号
        ES6 Module编译时引入，commonJS加载时引用
        common的作用域是单独的，除非是global对象的属性
*/
//?  86，继承
/*
        实现继承：虽然继承的方式有很多种，但实际上都离不开原型对象与原型链的内容

        1，原型链继承:
                        通过将子类的原型对象指向父类的实例来实现继承

                        因为核心就是我们会重写某个构造函数的原型（​​prototype​​），使其指向父类的一个实例，以此让它们的原型链不断串联起来，从而实现继承。

                        优点：
                                子类实例可以直接访问到父类实例或父类原型上的属性方法

                        缺陷：
                                属性共享，私有属性和方法子类是不能访问的
                                不能传参：父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
                                实例化时，不能传参数

        2，构造函数继承：
                        通过在子类的构造函数中调用父类的构造函数来实现继承。

                        在子类构造函数中，调用父类构造函数方法，但通过​​call​​​或者​​apply​​​方法改变了父类构造函数内​​this​​的指向，
                        使得子类实例出来的对象，自身拥有来自父类构造函数的方法跟属性，且分别独立，互不影响。

                        这种方式的优点是子类可以访问父类的私有属性和方法，

                        优点：
                                修改一个实例对象的引用类型属性时，不会导致所有实例对象受到影响
                                利用构造函数继承，实例化对象时，可传参
                        缺点：
                                无法继承父类原型上的属性与方法

        3，组合继承：
                        通过结合原型链继承和借用构造函数继承的优点来实现继承。

                        利用原型链继承，实现实例对父类原型（​​Animal.protoytype​​​）上的方法与属性继承；利用借用构造函数继承，
                        实现实例对父类构造函数（​​function Animal() {}​​）里方法与性的继承，并且解决原型链继承的缺陷。

                        这种方式的优点是既可以访问父类的私有属性和方法，又可以避免每个子类实例都有一份父类实例的拷贝。

                        优点：
                                实例对象继承父类原型​​​的方法与属性
                                可传参
                        缺点：
                                两次调用父类构造函数

        4，原型式继承：
                        利用原型链继承，实现实例对父类原型（​​Animal.protoytype​​​）上的方法与属性继承；利用借用构造函数继承，
                        实现实例对父类构造函数（​​function Animal() {}​​）里方法与性的继承，并且解决原型链继承的缺陷。

                        优点：
                                实现比原型链继承更简洁（不需要写什么构造函数了，也不需要写子类​​Cat​​，直接父类继承​​Animal​​）
                                子类实例可以直接访问到父类实例或父类原型上的属性方法
                        缺点：
                                不能传参

        5，寄生式继承：
                        它其实就是对原型式继承进行一个小封装，增强了一下实例出来的对象

                        优点：
                                实现比原型链继承更简洁
                                子类实例可以访问到父类的属性方法
                        缺点：
                                不能传参数
        6，寄生组合继承：
                        利用原型链继承，实现实例对父类原型（​​Animal.prototype​​​）方法与属性的继承；
                        利用借用构造函数继承，实现实例对父类构造函数（​​function Animal() {}​​）里方法与属性的继承，并且解决了组合继承带来的缺陷

        7,class
                        使用 extends 与 super 实现继承

                        定义类,内部必须要定义构造函数constructor
                        继承时需要使用 extends
                        子类使用父类方法需要使用super 相当于调用父类的构造函数
*/
//?  87，Render函数
/*
        用处：避免使用template导致的某些结构代码大量重复的问题
        渲染函数接收一个createElement函数，这个函数接收三个参数，返回的是一个Vnode虚拟节点，
        createElement接收的三个参数
        1.HTML标签或组件，2.属性对象如class或监听点击事件，3.子元素或直接渲染文本。

        最终template会转成render函数生成虚拟节点。
*/
//?  88，slot插槽
/*
        匿名插槽：父组件在子组件标签内加入的东西，子组件内使用<slot>标签接收，作用域为只能访问父组件的数据
                若想使用子组件内部的属性，可以通过在slot标签上使用:bind="user"方式绑定属性，
                父组件使用指令v-slot='slotProps'拿到值，子组件使用属性 slotProps.user
        具名插槽：slot标签有name属性 多个插槽时使用

        2023：传值需要在子组件使用bind绑定，父组件使用，同时还能进行解构。可以使用 #缩写
 */
//?  89，vue-loader
/*
        vue-loader是什么？使用它的用途有哪些？
        vue文件的一个加载器，将template/js/style转换成js模块。（将vue文件转换成js模块）
        用途:js可以写es6 style可以写scss less 等等
*/
//?  90，assets和static的区别
/*
        都是放静态资源 assets 打包压缩 static不压缩
*/
//?  91，vue核心
/*
        数据驱动、组件系统
*/
//?  92，中断请求
/*
        ajax中断请求
        abort()方法    实例: let aj = null; aj = $ajax({...})   中断 aj.abort()

        axios中断请求
        CancelToken 构造函数创建取消函数cancel，直接调用cancel取消函数即可
*/
//?  93，自定义组件的v-model
/*
        一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，
        但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。
        在自定义组件中使用model 选项可以用来避免这样的冲突
        例 复选框：
        model:{
          prop: 'checked',
          event: 'change'
        },
        props:{},
        data:{},
*/
//?  94，vue2与vue3的v-model的区别
/*
        1：prop和事件名称改变，
        prop：value -> modelValue
        event：input -> update:modelValue

        2：vue3移除了.sync修饰符，可以自定义修饰符，可以实现多个v-model绑定
*/
//?  95，小程序如何实现数据的监听
/*
        在组件中使用 observer
        在页面中使用可以自定义一个数据侦听器，使用Object.definePropery或proxy实现
*/
//?  96，回流重绘
/*
        定义：回流必将引起重绘，而重绘不一定会引起回流
        优化：css透明度尽量使用 opacity 代替 visiability
        优化：若需要 js 控制 css ，建议提前写一个 class 而不是 style 修改 避免多次重绘
        优化：使用 translate 代替 top ，translate 不会引起回流

        优化方案总结: 1 避免使用触发回流的 css 属性
                     2 尽量减少 js 操作修改 dom 的 css 次数
                     3 将需要多次重绘回流的 dom 元素单独作为一个独立图层
*/
//?  97，async/await与promise
/*
        async 生成的结果是 promise 对象
        promise 手动控制更方便, 适合单独控制，但是多个 promise 写起来麻烦,太多 .then();
        await 适合批量处理一系列动作,在 async 函数里，依次 await 就行;
*/
//?  98，diff
/*
        diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。
        1.比较只会在同层级进行, 不会跨层级比较
        2.updateChildren是核心算法部分，在diff比较的过程中，循环从两边向中间比较

*/
//?  98，工厂模式
/*
        工厂模式就是一个简单的函数，这个函数可以创建对象，为它添加属性和方法，然后返回这个对象。这个模式在构造函数出现后就很少用了。

*/
//?  98，map
/*
        其本质也是键值对，只是其键不局限于普通对象的字符串
        Map保留键值对，并记住键的实际插入顺序。映射仅允许存储唯一值。
        map有has，get, delete,set,clear 五种方法，还有个size属性（返回元素数量）

        使用场景：在需要对除字符串以外的数据类型进行映射的时候，Map就可以派上用场，比如比对dom时，使用dom作为key。

*/
//?  99， rem
/*
        1，原理：
                rem是相对长度单位，相对于html元素(根元素)font-size计算值的倍数的css单位

        2，适配原理：
                js设置 html标签的font-size = 移动设备宽度/设计稿宽度 * 100 + “px” （为了方便计算，倍数一般为10或100）

        3，js实现
                根据获取到的设备宽度，动态修改根元素的font-size值

*/
//?  100，事件模型
/*
        1，事件流：都会经历三个阶段
                事件捕获阶段(capture phase)
                处于目标阶段(target phase)
                事件冒泡阶段(bubbing phase)

        2，事件模型可以分为三种：
                原始事件模型(DOM0级)
                        特点：原始事件模型中，事件发生后没有传播的概念，没有事件流。事件发生，立即处理。
                        缺点： a、逻辑与显示没有分离。
                              b、相同事件的监听函数只能绑定一个，后绑定的会覆盖掉前面的。
                              c、无法通过事件的冒泡、委托等机制等。

                标准事件模型(DOM2级)
                        会进行事件流的三个阶段。

                IE事件模型(基本不用)
                        特点：IE是将event对象在处理函数中设为window的属性，一旦函数执行结束，便被置为null。
                        缺点：只能IE自己用，太高冷了。IE中不支持事件捕获，只有事件冒泡。

*/
//?  101，JavaScript错误类型
/*
        1，SyntaxError    语法错误
        2，TypeError      类型错误
        3，ReferenceError 引用错误
                （当找不到变量的引用、在变量作用域范围之外使用变量、使用未声明的变量时、在暂时性死区期间使用变量时都会抛出此错误。）
        4，RangeError     范围错误
                （将变量设置在其限定的范围之外、将值传递给超出范围的方法、调用一个不会结束的递归函数时就会抛出此错误。）
        5，URIError       URI 错误
        6，EvalError      Eval 错误
                当 eval() 函数调用发生错误时，会抛出 EvalError。当前ECMAScript不再抛错
        7，InternalError  内部错误
                当 JavaScript 引擎上的工作负载突然激增时，会抛出此错误。
                当有太多数据需要处理时，工作量就会激增，比如函数调用包含过多的递归或者过多的switch case时。
*/
//?  102，埋点
/*
        又称为事件追踪，指的是针对特定用户行为或事件进行捕获，处理和发送的相关技术及其实施过程。（收集用户数据进行分析）
*/
//?  103，迭代器
/*
        迭代就是指可以从一个数据集中按照一定的顺序，不断取出数据的过程。
        迭代与遍历的区别
                迭代强调依次取数据的过程，不保证把所有的数据都取完
                遍历强调的是要把所有的数据依次全部取出

        通过可迭代对象中的迭代器工厂函数 Symbol.iterator来生成迭代器。
                const arr = [1, 2, 3, undefined]

                const iter1 = arr[Symbol.iterator]()   // 通过迭代器工厂函数 Symbol.iterator 来生成迭代器。
                console.log(iter1)

                console.log(iter1.next())
                console.log(iter1.next())
                console.log(iter1.next())
                console.log(iter1.next())
                console.log(iter1.next())
        输出：
                Array Iterator {}
                {value: 1, done: false}
                {value: 2, done: false}
                {value: 3, done: false}
                {value: undefined, done: false}
                {value: undefined, done: true}

        使用next()可以按照顺序取值
*/
//?  104，Generator（发电机函数）
/*
        function关键字与函数名之间有一个星号 “*” （推荐紧挨着function关键字）
        函数体内使用 yield 表达式，定义不同的内部状态 （可以有多个yield）
        直接调用 Generator函数并不会执行，也不会返回运行结果，而是返回一个遍历器对象（Iterator Object）
        依次调用遍历器对象的next方法，遍历 Generator函数内部的每一个状态

        应用场景：人头抽奖，实现长轮询等
*/
//?  105，this
/*
        特点：
                this永远指向一个对象；
                this的指向完全取决于函数调用的位置；
                函数中的this只能在运行时才能最终确定运行环境。

        1. 作为普通函数在全局环境中被调用
                在全局环境里面，this 永远指向 window，因此在全局环境里作为普通函数被调用的时候，this 也是指向 window。(!node)

        2.作为对象的属性被调用
                如果函数作为一个对象的属性方法，并且被调用的时候，this 就指向这个对象。

        3. 作为构造函数被调用
                作为构造函数被调用的时候，this 代表它即将 new 出来的对象。

        4. 作为 call/apply/bind 方法的调用
                作为 call/apply/bind 方法被调用的时候指向传入的值

        5. 严格模式下面
                在严格模式下，在全局环境中执行函数调用的时候 this 并不会指向 window 而是会指向 undefined

        6. setTimeout、setInterval中的this
                setTimeout/setInterval 执行的时候，this 默认指向 window 对象，除非手动改变 this 的指向。

        7. 构造函数 prototype 属性
                在 Person.prototype.sayName 函数中，this 指向的 person 对象。即便是在整个原型链中,this 也代表当前对象的值。
        
        8. Eval函数
                在 Eval 中，this 指向当前作用域的对象。   

        9. 箭头函数
                箭头函数里面 this 始终指向外部对象，因为箭头函数没有 this，因此它自身不能进行new实例化，
                同时也不能使用 call, apply, bind 等方法来改变 this 的指向。
*/
//?  106，js预编译
/* 
        运行三部曲
                语法分析：   
                        引擎检查代码是否存在基本的的语法错误
                预编译：     
                        预编的时候会生成AO (Activetion Object,执行期上下文)和GO (Global Object,等于window)

                        内存中开辟一些空间，存放一些变量与函数 
                        变量声明会被提升，但是变量的赋值不会被提升
                        函数声明会被提升，但是函数表达式不会被提升
                        在同一个作用域中，变量名不能重复声明。
                解释执行：   
                        执行代码，解释一行执行一行，一旦出错立即停止执行。

*/
//?  107，微前端
/* 
        将庞大的整体拆成可控的小块，并明确它们之间的依赖关系。关键优势在于：
                代码库更小，更内聚、可维护性更高
                松耦合、自治的团队可扩展性更好
                渐进地升级、更新甚至重写部分前端功能成为了可能

*/
//?  108，postMessage
/* 
        使用window.postMessage方法实现跨域通信，可以在不同窗口之间传递数据，从而实现跨域请求。
        但是这种方式需要在客户端和服务器端同时进行处理，并且存在一些安全问题。

        父窗口通过iframe嵌套子窗口，父窗口获取子窗口的窗口对象，然后发送数据：iframeWin.postMessage('数据..',子窗口url)
        子窗口接收数据 window.addEventListener("message", function( event ) {console.log(event.data)}) // 数据..
*/
//?  109，单点登录
/* 
        在同一帐号平台下的多个应用系统中，用户只需登录一次，即可访问所有相互信任的应用系统。
        例如：在百度平台登录后，打开谷歌平台，谷歌能够正常使用百度的Session ID （或 Token ）进行数据请求，实现单点登录

        LocalStorage 跨域的实现方式：

                1.前端在每次向后端发送请求时，主动将 LocalStorage 的数据传递给服务端
                2.后端需要做的仅仅是在用户登录成功后，将 Session ID （或 Token ）放在响应体中传递给前端。
                3.前端拿到 Session ID （或 Token ）后，除了将它写入自己的 LocalStorage 中之外，
                  还可以通过特殊手段将它写入多个其他域下的 LocalStorage 中。
                  
                  实现原理：1.在A平台中，创建一个不可见的iframe  let iframe = document.createElement("iframe");
                           2.iframe加载跨域HTML（B平台）  iframe.src = "http://B.com/proxy.html";
                           3.使用postMessage跨域传值    iframe.contentWindow.postMessage(token, "http://B.com");
                           4.移除 iframe.remove();

                4.在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
                  window.addEventListener('message', function (event) {
                        localStorage.setItem('token', event.data)
                  }, false);
                
        通过 iframe+postMessage() 方式，将同一份 Token 写入到了多个域下的 LocalStorage 中，
        每次在向后端发送请求之前，都会主动从 LocalStorage 中读取 Token 并在请求中携带，
        这样就实现了同一份 Token 被多个域所共享。

        在创建iframe时，正确判断B窗口创建成功
        A窗口打开B窗口，当B窗口加载后，B窗口就会postMessage给A窗口一个信息，当A窗口收到信息之后再postMessage给B窗口信息(token)

        // A: A.html
        let token = 'token值'
        const iframe = document.createElement("iframe");
        iframe.src = "http://B.com/proxy.html";
        window.addEventListener("message", (e) => {
                if(e.origin === "http://B.com") {
                        iframe.contentWindow.postMessage(token, "http://B.com");
                        iframe.remove();
                }
        }) 
        // B: proxy.html
        const opener = window.opener
        opener.postMessage("ready", "http://A.com")
        window.addEventListener("message", (e) => {
                localStorage.setItem('token', e.data)
        })
*/

// todo       