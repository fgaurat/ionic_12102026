function hello() {
  //a
  console.log("hello", b);
  let a = 2;
}

// hello();
// console.log("global scope",a);

function getTodo(id) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      const todo = {
        id, // id:id
        title: `Titre Todo ${id}`,
        completed: false,
      };

      resolve(todo);
    }, 500);
  });
  return p;
}

// pTodo = getTodo(1);
// pTodo
//   .then((todo) => {
//     console.log(todo);
//     return getTodo(todo.id + 1);
//   })
//   .then((todo) => {
//     console.log(todo);
//   });


// pTodo1 = getTodo(1);
// pTodo2 = getTodo(2);
// pTodo3 = getTodo(3);
// pTodo4 = getTodo(4);

// Promise.all([pTodo1,pTodo2,pTodo3,pTodo4]).then(console.log)



async function main(){

   
    todo1 = await getTodo(1);
    console.log(todo1);
    
    todo2 = await getTodo(2);
    console.log(todo2);
    todo3 = await getTodo(3);
    todo4 = await getTodo(4); 
}

main()


