const items = [
  {
    title: "Маракуйя (Бразилия)",
    description: "Очень ароматная с кисло-сладким вкусом, небольшого калибра.",
    tags: ["Акция"],
    price: 3,
    img: "./img/1.jpg",
    score: 4.4,
  },
  {
    title: "Гуава Белая (Вьетнам)",
    description: "Очень нежная мякоть, которую можно есть ложкой!",
    tags: ["Акция"],
    price: 28,
    img: "./img/2.jpg",
    score: 3.9,
  },
  {
    title: "Ананас Мини (Маврикий)",
    description: "Намного ароматнее, слаще и вкуснее любого ананаса из представленных на полках сетевых магазинов!",
    tags: [],
    price: 18,
    img: "./img/3.jpg",
    score: 5.0,
  },
  {
    title: "Личи (Вьетнам)",
    description: "Личи имеет свой неповторимый вкус, который не похож на другие фрукты. Это точно стоит попробовать!",
    tags: [],
    price: 7,
    img: "./img/4.jpg",
    score: 4.7,
  },
  {
    title: "Папайя (Таиланд)",
    description: "Папайя из Таиланда является самой сладкой в мире. Можно полить папайю соком лайма, это полностью раскроет ее замечательный вкус!",
    tags: [],
    price: 78,
    img: "./img/5.jpg",
    score: 4.9,
  },
  {
    title: "Манго Австралийский (Вьетнам)",
    description: "Австралийский — это название сорта, который привезли в Вьетнам из этой страны сотни лет назад. Это чистый сорт манго с минимальным количеством волокон и очень сладким насыщенным вкусом.",
    tags: [],
    price: 47,
    img: "./img/6.jpg",
    score: 3.2,
  },
  {
    title: "Рамбутан (Вьетнам)",
    description: "Рамбутан выглядит очень необычно и экзотично. Под волосатой оболочкой скрывается упругая белая мякоть, по текстуре и вкусу чем-то напоминающая виноград с киви.",
    tags: [],
    price: 9,
    img: "./img/7.jpg",
    score: 3.7,
  },
  {
    title: "Питахайя Желтая (Вьетнам)",
    description: "Эти невероятные розовые плоды удивят абсолютно любого своим внешним видом! Она идеально подойдет для подарочных коробок и корзин. В меру сладкая и имеет приятно хрустящие косточки.",
    tags: [],
    price: 24,
    img: "./img/8.jpg",
    score: 3.4,
  },
  {
    title: "Питахайя Белая (Таиланд)",
    description: "Питахайя имеет очень экзотическую внешность. По вкусу питахайя чем-то напоминает арбуз или киви.",
    tags: ["Акция"],
    price: 26,
    img: "./img/9.jpg",
    score: 4.8,
  },
  {
    title: "Манго НамДокМай (Таиланд)",
    description: "Данный сорт является самым лучшим сортом манго в мире! Не имеет волокон, с мягкой и нежной текстурой, которая держит форму и не расплывается.",
    tags: [],
    price: 26,
    img: "./img/10.jpg",
    score: 4.5,
  },
  {
    title: "Магностин (Таиланд)",
    description: "Мангостин невероятно вкусный и необычный фрукт! Его дольки, по внешнему виду напоминающие чеснок, на самом деле очень сочные и сладкие!",
    tags: [],
    price: 8,
    img: "./img/11.jpg",
    score: 3.4,
  },
  {
    title: "Кокос питьевой (Таиланд)",
    description: "В отличие от привычных всем кокосов присутствует мягкая мякоть, которую можно легко есть ложкой. А из мякоти и кокосовой воды, взбив это все в блендере, получится свежее и вкусное кокосовое молоко.",
    tags: ["Акция"],
    price: 22,
    img: "./img/12.jpg",
    score: 4.1,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });

  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }

  const shopItems = document.querySelectorAll(".shop-item");

  for (let shopItem of shopItems) {
    const buttonUpItemCounter = shopItem.querySelector("#up-btn");
    const buttonDownItemCounter = shopItem.querySelector("#down-btn");

    buttonUpItemCounter.addEventListener("click", function addToCart() {
      const itemCounter = shopItem.querySelector(".item-count");
      const count = parseInt(itemCounter.textContent);

      if (count >= 0) {
        itemCounter.textContent = count + 1;
        putCart(shopItem);
      }
    });

    buttonDownItemCounter.addEventListener("click", function deleteFromCart() {
      const itemCounter = shopItem.querySelector(".item-count");
      const count = parseInt(itemCounter.textContent);

      if (count > 0) {
        itemCounter.textContent = count - 1;
        deleteCart(shopItem);
      }
    });
  }

}

function sortByAlphabet(a, b) {

  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, score } = shopItem;
  const item = itemTemplate.content.cloneNode(true);

  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} Br`;
  item.querySelector(".item-counter-cart");
  item.querySelector(".item-count").textContent = 0;

  const scoreContainer = item.querySelector(".score");

  for (let i = 0; i < score; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    scoreContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {

  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );

  currentState.sort((a, b) => sortByAlphabet(a, b));

  renderItems(currentState);

  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "score": {
      currentState.sort((a, b) => b.score - a.score);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }

  renderItems(currentState);
});

const cartShell = document.querySelector(".cart-shell");
const cartItems = document.querySelector("#cart-items");
const itemTemplateCart = document.querySelector("#cart-item-template");
const iconCart = document.querySelector(".cart i");

iconCart.addEventListener("click", function openCloseCart() {
  cartShell.classList.toggle('openClose');
});

function putCart(elementCart) {
  const cartCount = document.querySelector(".cart-count");
  const totalPrice = document.querySelector(".total-price");
  const count = parseInt(cartCount.textContent);

  cartCount.textContent = count + 1;

  totalPrice.textContent = parseInt(totalPrice.textContent) + parseInt(elementCart.querySelector(".price").textContent);

  cartItems.prepend(prepareCartItem(elementCart));
}

function deleteCart(elementCart) {
  const cartCount = document.querySelector(".cart-count");
  const totalPrice = document.querySelector(".total-price");
  const count = parseInt(cartCount.textContent);
  cartCount.textContent = count - 1;

  const itemsCart = document.querySelectorAll(".cart-item");

  for (let itemCart of itemsCart) {
    if (elementCart.querySelector("h1").textContent === itemCart.querySelector("h2").textContent) {
      itemCart.remove();
      totalPrice.textContent = parseInt(totalPrice.textContent) - parseInt(elementCart.querySelector(".price").textContent);
      break;
    }
  }

}

function prepareCartItem(elementCart) {

  const item = itemTemplateCart.content.cloneNode(true);

  item.querySelector("h2").textContent = elementCart.querySelector("h1").textContent;
  item.querySelector("p");
  item.querySelector("img").src = elementCart.querySelector("img").src;
  item.querySelector(".count").textContent = 1;
  item.querySelector(".price").textContent = parseInt(elementCart.querySelector(".price").textContent);
  item.querySelector(".btn-delete");

  return item;
}

const saleFilter = document.querySelector(".sale");

saleFilter.addEventListener("click", filterByTag);

function filterByTag() {
  if (saleFilter.classList.toggle('active')) {
    currentState = items.filter((el) => el.tags[0]);
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
  }
  else {
    applySearch();
  }
}