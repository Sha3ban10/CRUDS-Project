let title = document.getElementById("title");
let Price = document.getElementById("Price");
let Taxes = document.getElementById("Taxes");
let Ads = document.getElementById("Ads");
let Discount = document.getElementById("Discount");
let total = document.getElementById("total");
let Count = document.getElementById("Count");
let Category = document.getElementById("Category");
let totalCount = document.getElementById("total-count");
let submit = document.getElementById("submit");
let table = document.getElementById("Data");
let DeleteAllPRoducts = document.getElementById("DeleteAll");
let Search = document.getElementById("Search");

let Mode = "Create";
let SearchMode = "Title";
let index;
let Products = [];

// GET Total

function GetTotal() {
  if (Price.value) {
    let result = +Price.value + +Taxes.value + +Ads.value - +Discount.value;
    total.innerHTML = result;
    totalCount.classList.remove("text-bg-danger");
    totalCount.classList.add("text-bg-success");
  } else {
    totalCount.classList.add("text-bg-danger");
    totalCount.classList.remove("text-bg-success");
    total.innerHTML = "";
  }
}

// Get Data From LocalStorage

if (localStorage.product != null) {
  Products = JSON.parse(localStorage.product);
} else {
  Products = [];
}

// Cleat Data
function ClearData() {
  title.value = "";
  Price.value = "";
  Taxes.value = "";
  Ads.value = "";
  Discount.value = "";
  Count.value = "";
  Category.value = "";
  total.innerHTML = "";
}

// Create Data

function Create() {
  let product = {
    title: title.value,
    Price: Price.value,
    Taxes: Taxes.value,
    Ads: Ads.value,
    Discount: Discount.value,
    total: total.innerHTML,
    Count: Count.value,
    Category: Category.value,
  };

  if (
    title.value != "" &&
    Price.value != "" &&
    Category.value != "" &&
    Count.value <= 100
  ) {
    if (Mode === "Create") {
      if (product.Count > 1) {
        for (let i = 0; i < product.Count; i++) Products.push(product);
      } else {
        Products.push(product);
      }
    } else {
      Products[index] = product;
      Mode = "Create";
      submit.innerHTML = "Create";
      Count.style.display = "block";
    }
    ClearData();
  }
  localStorage.setItem("product", JSON.stringify(Products));
  Read();
}

// Read Data

function Read() {
  GetTotal();
  let data = "";
  for (let i = 0; i < Products.length; i++) {
    data += `
        <tr>
            <td>${i + 1}</td>
            <td>${Products[i].title}</td>
            <td>${Products[i].Price}</td>
            <td>${Products[i].Taxes}</td>
            <td>${Products[i].Ads}</td>
            <td>${Products[i].Discount}</td>
            <td>${Products[i].total}</td>
            <td>${Products[i].Category}</td>
            <td><button onclick="UpdateProduct(${i}) " class="btn btn-outline-success">Update</button></td>
            <td><button onclick="DeleteProduct(${i}) " class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `;
  }
  table.innerHTML = data;
  if (Products.length > 0) {
    DeleteAllPRoducts.innerHTML = `<button" onclick="DeleteAll()" class="btn btn-outline-danger w-100">Delete All (${Products.length})</button>`;
  } else DeleteAllPRoducts.innerHTML = ``;
}

Read();

// Delete Data
// specific product
function DeleteProduct(i) {
  Products.splice(i, 1);
  localStorage.product = Products;
  Read();
}

// Alldata

function DeleteAll() {
  localStorage.clear();
  Products.splice(0);
  Read();
}

//   Update

function UpdateProduct(i) {
  title.value = Products[i].title;
  Price.value = Products[i].Price;
  Taxes.value = Products[i].Taxes;
  Ads.value = Products[i].Ads;
  Discount.value = Products[i].Discount;
  Category.value = Products[i].Category;
  submit.innerHTML = "Update";
  Count.style.display = "none";
  index = i;
  Mode = "Update";
  GetTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search

function GetSearchMode(id) {
  if (id === "Title") {
    SearchMode = "Title";
  } else {
    SearchMode = "Category";
  }
  Search.focus();
  Search.placeholder = " Search By " + SearchMode;
  Search.value = "";
  Read();
}

function SearchProduct(value) {
  let data = "";

  for (let i = 0; i < Products.length; i++) {
    if (SearchMode === "Title") {
      if (Products[i].title.toLowerCase().includes(value.toLowerCase())) {
        data += `
        <tr>
            <td>${i + 1}</td>
            <td>${Products[i].title}</td>
            <td>${Products[i].Price}</td>
            <td>${Products[i].Taxes}</td>
            <td>${Products[i].Ads}</td>
            <td>${Products[i].Discount}</td>
            <td>${Products[i].total}</td>
            <td>${Products[i].Category}</td>
            <td><button onclick="UpdateProduct(${i}) " class="btn btn-outline-success">Update</button></td>
            <td><button onclick="DeleteProduct(${i}) " class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `;
      }
    }
    if (SearchMode === "Category") {
      if (Products[i].Category.toLowerCase().includes(value.toLowerCase())) {
        data += `
        <tr>
            <td>${i + 1}</td>
            <td>${Products[i].title}</td>
            <td>${Products[i].Price}</td>
            <td>${Products[i].Taxes}</td>
            <td>${Products[i].Ads}</td>
            <td>${Products[i].Discount}</td>
            <td>${Products[i].total}</td>
            <td>${Products[i].Category}</td>
            <td><button onclick="UpdateProduct(${i}) " class="btn btn-outline-success">Update</button></td>
            <td><button onclick="DeleteProduct(${i}) " class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `;
      }
    }
  }
  table.innerHTML = data;
}
