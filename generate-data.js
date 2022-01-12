const casual = require("casual");
const fs = require("fs");
casual.locale = "vi";
const randomNCategories = (n) => {
  if (n <= 0) return [];
  let categories = [];
  Array.from(new Array(n)).forEach(() => {
    let category = {
      id: casual.uuid,
      name: casual.company_name,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    categories.push(category);
  });
  return categories;
};

(() => {
  // 1. Create db

  let categories = randomNCategories(4);

  const db = {
    categories: categories,
    products: [],
    profile: {
      name: "Vuong Do",
      mobile: "0789200396",
    },
  };
  // 2. Save in db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully");
  });
})();
