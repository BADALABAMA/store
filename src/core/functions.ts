import { Card } from '../components';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
interface IData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  id: number;
  images: string[];
}
const productContainer = document.createElement('div');
productContainer.className = 'product_container';

let isExistModal: boolean = false;

enum Admin {
  email = 'admin@22.ua',
  password = 'admin22',
}

export async function getData(node: HTMLElement, page: number = 1) {
  let limit = 20;
  const offset = (page - 1) * limit;

  const data = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  const parsedData = await data.json();

  if (node) {
    displayProduct(parsedData, node);

    createPagination(parsedData, page, node);

    console.log(parsedData);
  }
}

function displayProduct(data: Product[], node: HTMLElement) {
  data.forEach((product) => {
    createProductCard(product, node);
    node.appendChild(productContainer);
  });
}

function createModal(node: HTMLElement, product: HTMLDivElement) {
  let isVisible: boolean = true;

  const modalWindow = document.createElement('div');
  modalWindow.className = 'modal';

  const hideModalBtn = document.createElement('button');
  hideModalBtn.className = 'hide_btn';
  hideModalBtn.textContent = 'hide';
  hideModalBtn.addEventListener('click', () => {
    if (isVisible) {
      modalWindow.classList.add('modal_hide');
      isVisible = false;
      isExistModal = false;
      product.remove();
      console.log(modalWindow);
    } else {
      return;
    }
  });

  const showModalBtn = document.createElement('button');
  showModalBtn.className = 'show_btn';
  showModalBtn.textContent = 'show';
  showModalBtn.addEventListener('click', () => {
    if (!isVisible) {
      modalWindow.classList.remove('modal_hide');
      isVisible = true;
      modalWindow.append(product);
      console.log(modalWindow);
    } else {
      return;
    }
  });
  console.log(isVisible);

  modalWindow.append(hideModalBtn, showModalBtn, product);
  node.append(modalWindow);
  isExistModal = true;
}

function createModalCard(product: Product) {
  const modalImageCard = new Card({
    tagName: 'img',
    className: 'product_image',
    id: '#',
    textContent: '',
    children: [],
  }).toHTML();
  modalImageCard.src = product.images[0] as string;

  const modalProductTitle = new Card({
    tagName: 'h3',
    className: 'product_title',
    id: '#',
    children: [],
    textContent: String(product.title),
  }).toHTML();
  modalProductTitle.textContent = product.title;

  const modalProductDescription = new Card({
    tagName: 'p',
    className: 'product_description',
    id: '#',
    children: [],
    textContent: product.description,
  }).toHTML();
  modalProductDescription.textContent = product.description;

  const modalProductPrice = new Card({
    tagName: 'p',
    className: 'product_price',
    id: '#',
    children: [],
    textContent: '',
  }).toHTML();
  modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
  const modalInfoCard = new Card({
    tagName: 'div',
    className: 'product_info',
    children: [
      modalImageCard,
      modalProductTitle,
      modalProductDescription,
      modalProductPrice,
    ],
    events: {
      dblclick: () => {
        if (isExistModal) {
          const modalWindow: HTMLDivElement = document.querySelector('.modal');
          modalWindow.remove();
          isExistModal = false;
        }
      },
    },
  }).toHTML();
  return modalInfoCard;
}

function createProductCard(
  product: Product,

  node: HTMLElement
) {
  const imageCard = new Card({
    tagName: 'img',
    className: 'product_image',
    id: '#',
    textContent: '',
    children: [],
  }).toHTML();
  imageCard.src = product.images[0] as string;

  const productTitle = new Card({
    tagName: 'h3',
    className: 'product_title',
    id: '#',
    children: [],
    textContent: String(product.title),
  }).toHTML();
  productTitle.textContent = product.title;

  const productDescription = new Card({
    tagName: 'p',
    className: 'product_description',
    id: '#',
    children: [],
    textContent: product.description,
  }).toHTML();
  productDescription.textContent = product.description;

  const productPrice = new Card({
    tagName: 'p',
    className: 'product_price',
    id: '#',
    children: [],
    textContent: '',
  }).toHTML();
  productPrice.textContent = `$${product.price.toFixed(2)}`;

  const infoCard = new Card({
    tagName: 'div',
    className: 'product_info',
    children: [imageCard, productTitle, productDescription, productPrice],
  }).toHTML();

  const productCard = new Card({
    tagName: 'div',
    className: 'product_card',
    id: `product_${product.id}`,
    children: [infoCard],
    events: {
      dblclick: () => {
        if (!isExistModal) {
          createModal(node, createModalCard(product));
        }
      },
    },
  });

  productContainer.append(productCard.toHTML());
}

function createPagination(
  data: Product[],
  currentPage: number,
  node: HTMLElement
) {
  const totalPages = Math.ceil(data.length / 10);

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = `${i}`;
    pageButton.addEventListener('click', (e) => {
      e.preventDefault();
      getData(node, i);
      const productContainer = document.querySelector('.product_container');
      const productCards = document.querySelectorAll('.product_card');
      productCards?.forEach((card) => {
        card.remove();
      });
      productContainer?.remove();

      paginationContainer.remove();
    });

    if (i === currentPage) {
      pageButton.classList.add('active');
    }

    paginationContainer.appendChild(pageButton);
  }

  node.appendChild(paginationContainer);
}

export function validateEmail(email: HTMLInputElement) {
  if (
    email.value.includes('@') &&
    email.value.indexOf('.') > email.value.indexOf('@') &&
    email.value.length >= 4 &&
    email.value === Admin.email
  ) {
    return true;
  } else {
    return false;
  }
}

export function validatePassword(password: HTMLInputElement) {
  if (
    password.value.length >= 5 &&
    /\d/.test(password.value) &&
    /[a-zA-Z]/.test(password.value) &&
    password.value === Admin.password
  ) {
    return true;
  } else {
    return false;
  }
}
export function clearInputs(...inputs: HTMLInputElement[]) {
  for (const input of inputs) {
    input.value = '';
  }
}

export async function createNewProduct(
  titleInput: HTMLInputElement,
  priceInput: HTMLInputElement,
  descriptionInput: HTMLInputElement,
  idInput: HTMLInputElement,
  imageInput: HTMLInputElement,
  node: HTMLElement
) {
  const postData: IData = {
    title: titleInput.value,
    price: parseInt(priceInput.value),
    description: descriptionInput.value,
    categoryId: 1,
    id: parseInt(idInput.value),
    images: [imageInput.value],
  };
  const url = 'https://api.escuelajs.co/api/v1/products/';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  const data = await response.json();
  createProductCard(data, node);
  clearInputs(titleInput, priceInput, descriptionInput, imageInput);
  console.log('Success:', data);
}