var message = "hello world";
console.log(message);
//定义变量不能用name 会与dom的window对象下的name属性重名。
var tt = 'tutao';
//类型断言
//可以手动指定一个值的类型，即允许一个变量从一个类型更改为另一个类型。
var str = '1';
var str2 = str;
console.log(str2);
//类型推断
//如果缺乏类型声明，ts可以通过类型推断来推断类型
//如果由于缺乏声明而不能推断出类型，那么他的类型被视为动态any类型
var num = 18; //类型推断其类型为number
// num  = 'xixi';//会报错   因为 默认已推断为number  xixi 为字符类型。
var global_num = 12;
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13;
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 15;
    };
    Numbers.sval = 10;
    return Numbers;
}());
console.log('全局变：' + global_num);
console.log('静态变：' + Numbers.sval);
var obj = new Numbers();
//函数传参   可以传且写明参数类型   而且  如果为可传可不传   就   str？：type  
console.log(Number.MAX_VALUE);
