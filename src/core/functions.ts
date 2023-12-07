import { Card } from '../components';
import { Spinner } from 'spin.js';
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
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  id?: number;
  images?: string[];
}
export enum Admin {
  email = 'admin@22.ua',
  password = 'admin22',
}
const opts = {
  lines: 12, // The number of lines to draw
  length: 38, // The length of each line
  width: 16, // The line thickness
  radius: 41, // The radius of the inner circle
  scale: 1.05, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ba3636', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};
const productContainer = document.createElement('div');
productContainer.className = 'product_container';

let isExistModal: boolean = false;

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
  const imageCard: HTMLImageElement = new Card({
    tagName: 'img',
    className: 'product_image',
    id: '#',
    textContent: '',
    children: [],
  }).toHTML();
  imageCard.src = product.images[0] as string;
  imageCard.alt = 'something went wrong';

  const productTitle: HTMLHeadingElement = new Card({
    tagName: 'h3',
    className: 'product_title',
    id: '#',
    children: [],
    textContent: String(product.title),
  }).toHTML();
  productTitle.textContent = product.title;

  const productDescription: HTMLParagraphElement = new Card({
    tagName: 'p',
    className: 'product_description',
    id: '#',
    children: [],
    textContent: product.description,
  }).toHTML();
  productDescription.textContent = product.description;

  const productPrice: HTMLParagraphElement = new Card({
    tagName: 'p',
    className: 'product_price',
    id: '#',
    children: [],
    textContent: '',
  }).toHTML();
  productPrice.textContent = `$${product.price.toFixed(2)}`;

  const infoCard: HTMLDivElement = new Card({
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
      const spinner = new Spinner(opts).spin();

      node.appendChild(spinner.el);
      setTimeout(() => {
        spinner.stop();
        getData(node, i);
        const productContainer = document.querySelector('.product_container');
        const productCards = document.querySelectorAll('.product_card');
        productCards?.forEach((card) => {
          card.remove();
        });
        productContainer?.remove();

        paginationContainer.remove();
      }, 2000);
    });

    if (i === currentPage) {
      pageButton.classList.add('active');
    }

    if (!paginationContainer.contains(pageButton)) {
      paginationContainer.appendChild(pageButton);
    }
  }
  if (!node.contains(paginationContainer)) {
    node.appendChild(paginationContainer);
  }
}

export function validateEmail(email: HTMLInputElement) {
  if (
    email.value.includes('@') &&
    email.value.indexOf('.') > email.value.indexOf('@') &&
    email.value.length >= 4 &&
    email.value.toLowerCase() === Admin.email
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
    password.value.toLowerCase() === Admin.password
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
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    createProductCard(data, node);
    clearInputs(titleInput, priceInput, descriptionInput, imageInput);
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function updateProduct(
  titleInput: HTMLInputElement,
  priceInput: HTMLInputElement,
  idInput: HTMLInputElement,
  node: HTMLElement
) {
  const updateData: IData = {
    title: titleInput.value,
    price: parseInt(priceInput.value),
    id: parseInt(idInput.value),
  };
  const url = ` https://api.escuelajs.co/api/v1/products/${idInput.value}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedProduct = await response.json();

    const existingProductCard = document.getElementById(
      `product_${updatedProduct.id}`
    );

    if (existingProductCard) {
      const productTitle = existingProductCard.querySelector('.product_title');
      const productPrice = existingProductCard.querySelector('.product_price');

      if (productTitle && productPrice) {
        productTitle.textContent = updatedProduct.title;
        productPrice.textContent = `$${updatedProduct.price.toFixed(2)}`;
      }
    }

    clearInputs(titleInput, priceInput, idInput);
    console.log('Success:', updatedProduct);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteProduct(
  idInput: HTMLInputElement,
  node: HTMLElement
) {
  const deleteData: IData = {
    id: parseInt(idInput.value),
  };
  const url = ` https://api.escuelajs.co/api/v1/products/${idInput.value}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const deletedProduct = await response.json();

    const existingProductCard = document.getElementById(
      `product_${deletedProduct.id}`
    );

    if (existingProductCard) {
      existingProductCard.remove();
    }

    clearInputs(idInput);
    console.log('Success:', deletedProduct);
  } catch (error) {
    console.error('Error:', error);
  }
}
