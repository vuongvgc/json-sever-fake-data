const casual = require('casual');
const fs = require('fs');
casual.locale = 'vi';
const randomNCategories = (n) => {
  if (n <= 0) return [];
  let categories = [];
  Array.from(new Array(n)).forEach(() => {
    let category = {
      id: casual.uuid,
      name: casual.company_name,
      address: casual.address,
      employee: getRandomInt(10),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categories.push(category);
  });
  return categories;
};
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const randomProducts = (categories, numOfProduct) => {
  let products = [];
  if (numOfProduct <= 0) {
    return [];
  }
  categories.forEach((category) => {
    Array.from(Array(numOfProduct)).forEach(() => {
      let product = {
        id: casual.uuid,
        name: casual.name,
        age: casual.age,
        address: casual.address,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        categoryId: category.id,
      };
      products.push(product);
    });
  });
  return products;
};
const randomTodos = (n) => {
  if (n <= 0) return [];
  let todos = [];
  Array.from(new Array(n)).forEach(() => {
    let todo = {
      id: casual.uuid,
      content: casual.description,
    };
    todos.push(todo);
  });
  return todos;
};

(() => {
  // 1. Create db

  let categories = randomNCategories(4);
  let products = randomProducts(categories, 5);
  let todos = randomTodos(10);

  const db = {
    categories: categories,
    products: products,
    todos: todos,
    profile: {
      name: 'Vuong Do',
      mobile: '0789200396',
    },
  };
  // 2. Save in db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');
  });
})();
