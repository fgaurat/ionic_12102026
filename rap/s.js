
const arr = [10,20,30,40]

const [a,b,c,...d] = arr
console.log(a,b,c,d);



function f(...a){
    console.log(a)
}

f(1,2,3,4)

const o = {name:"GAURAT",firstName:"Fred",age:22}
const o1 = {firstName:"Fred",name:"GAURAT",age:22}
const {firstName,name} = o

const o2 = {...o,age:50}
const o3 = {...o1,age:50}

console.log(o2)
console.log(o3)