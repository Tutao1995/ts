var message: string = "hello world";
console.log(message);
//定义变量不能用name 会与dom的window对象下的name属性重名。
var tt = "tutao";
//类型断言
//可以手动指定一个值的类型，即允许一个变量从一个类型更改为另一个类型。
var str = "1";
var str2: number = <number>(<any>str);
console.log(str2);
//类型推断
//如果缺乏类型声明，ts可以通过类型推断来推断类型
//如果由于缺乏声明而不能推断出类型，那么他的类型被视为动态any类型
var num = 18; //类型推断其类型为number
// num  = 'xixi';//会报错   因为 默认已推断为number  xixi 为字符类型。

var global_num: number = 12;
class Numbers {
    num_val = 13;
    static sval = 10;
    storeNum(): void {
        var local_num = 15;
    }
}

console.log("全局变：" + global_num);
console.log("静态变：" + Numbers.sval);
var obj = new Numbers();

//函数传参   可以传且写明参数类型   而且  如果为可传可不传   就   str？：type
console.log(Number.MAX_VALUE);

//联合类型    ：type1|type2

//接口
interface IPercen {
    firstName: string;
    lastName: string;
    sayHi: () => string;
}

var student: IPercen = {
    firstName: "tu",
    lastName: "tao",
    sayHi: (): string => {
        return "Hi there";
    },
};

//类型的别名  type
type stringAria = "abc";
const testStr: stringAria = "abc";
//字符串字面量类型   type定义了类型组  那么赋值只能是其中一个
type EventName = "xm" | "xh" | "xb";
const testEventNameStr: EventName = "xm";

//元组   一个带有不同值的数组
const confusion: [string, number] = ["a", 1];

//接口  interface
interface Parent {
    name: string;
}

interface Child extends Parent {
    age: number;
}

const kid: Child = {
    name: "tutao",
    age: 18,
};

//类  class
// class Parent {
//     constructor() {}
//     suck() {}
// }

// interface CChild extends Parent {
//     suck(): void;
//     name: string;
// }

//泛型  指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候在指定类型的一种特性  使用<T> 代表类型的变量，T只是约定用法，可以任意指定
function getArrVal<T>(something: T): Array<T> {
    return [something];
}
//一次性定义多个泛型

function Test<T, U>(name: T, age: U) {
    return {
        name,
        age,
    };
}

// 枚举  enum
//enum 类型是对javascript标准数据类型的一个补充，像C#一样，使用枚举类型可以为一组数值赋予友好的名字

enum Color { Red = 1, Green = 2, Blue }
let color: Color = Color.Green;
console.log(color)

//类型断言  
// 第一种：尖括号
let someValue: any = 'i am value';
let strLen: number = (<string>someValue).length

// 第二种 ： as
let someValue2: any = 'i am value'
let strLen2: number = (someValue as string).length;



// let and  const  ；
// const 能阻止一个变量再次被赋值
//原因： setTimeout 为异步的函数  当for循环完成时 i值为10， 才会执行异步内容， 所以一直为10
for(var i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)// 结果 ： 10 个 10
    }, 1000)
}

//闭包处理  将i值作为参数传递给闭包内部， 闭包内部可以保存i的当前内容
for(var i = 0; i < 10; i++) {
    (function(i){
        setTimeout(() => {
            console.log(i)// 结果 ： 结果 ： 1 到 10
        }, 1000)
    })(i)
}


// let 块级作用域   暂时性死区
for(let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)// 结果 ： 1 到 10
    }, 1000)
}


// const b不允许二次赋值

// for example

const constTest = {
    name: 'tuto'
}

//会报错  error
// constTest = {
//     name: 'tuming'
// }

constTest.name = 'tuming' // ok

//接口  interface   类型  type  
/* 
接口 和类型的异同

相同：都可以描述一个对象或函数

interface User {
    name: string,
    age: number
}

interface setUser{
    (name: string, age: number):void
}

type User = {
    name: string,
    age: number
}

type setUser = (name:string, age: number ): void


拓展（extends）和交叉类型（Intersection Types）

interface 可以extends  type 不允许 extends 和 implement，
type 可以通过交叉类型实现interface的extends行为，并且两者并不是相互独立的

interface extends interface  
type & type
interface extends type
type & interface  


不同点：
1. type 可以 而interface不行
type可以声明基本类型类别名，联合类型，元组
type Name = string
interface Dog {
    wang()
}
*/

// 额外的属性检查
interface SquareConfig {
    color?: string,
    width?: number
}

function createSquare(config: SquareConfig) : {color: string, area: number} {
    return {
        color: config.color,
        area: config.width ** 2
    }
}

// let mySquare = createSquare({ colour: "red", width: 100 }); // 会报错 
//绕开这些检查非常简单。 最简便的方法是使用类型断言, 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);  // 断言的形式

interface SquareConfig {
    color?: string,
    width?: number,
    [propName: string] : any
}


//函数类型
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

/* 
类 class

implements
顾名思义，实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

extends
顾名思义，继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

派生类通常被称作 子类，基类通常被称作 超类。
派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。

抽象类  作为其他派生类的基类使用，一般不会直接被实例化   abstract 关键字是用于定义抽象类和抽象类内部定义抽象方法
在派生类的构造函数中必须调用 super()

abstract class Animal {
    abstract makeSound():void;
    move():void {
        console.log('roaming the earch')
    }
}
类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

注意点
接口不能实现接口或者类，所以实现只能用于类身上,即类可以实现接口或类
接口可以继承接口或类
类不可以继承接口，类只能继承类
可多继承或者多实现

*/


/* 
    高级技巧 
    构造函数
*/

//当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型。
// 这里，我们写了 let greeter: Greeter，意思是 Greeter类的实例的类型是 Greeter

class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return `Hello ${this.greeting}`
    }
}

let greeter: Greeter;
greeter = new Greeter('tutao');

console.log(greeter.greet());


// 构造函数

let Greeter1 = (function() {
    function Greeter(message) {
        this.greeting = message
    }
    Greeter.prototype.greet = function() {
        return `Hello ${this.greeting}`
    }
    return Greeter
})()



//函数

//书写完整函数类型

let func: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y
}

// 推断类型

let func1: (x: number, y: number) => number = function(x, y) {
    return x + y
}

//可选参数   可选参数必须跟在必须参数后面
function buildName (firstName: string, lastName?: string): string {
    return `${firstName} ${lastName}`
}

//给定默认值（初始值）
function init(initString: string = 'init') {

}

// 剩余参数

function restParams<T>(firstNam: string, ...restParam: T[]):T[] {
    return restParam
}

//泛型   我们不仅要创建一致的定义良好的API，同时也要考虑可重用性
//hello world  
//不用泛型
function identity (arg: number): number {
    return arg
}

//我们需要一种方法使返回值的类型与传入参数的类型是相同的
//使用泛型
function identityT<T>(arg: T): T {
    return arg
}

//使用

identityT<string>('tutao')   // 指明类型

identityT('tutao')  // 类型推断

//泛型类型
//泛型接口
interface GenerricIdentityFn {
    <T>(arg: T): T
}

function identityInterface<T>(arg: T): T {
    return arg
}

let myIdentity: GenerricIdentityFn

// 泛型约束  传递的参数就必须存在 我们约束的内容  不能为任何的类型

interface Lengthwise {
    length: number
}

function loggerIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg
}