import { Main, Header, App, Button, Input } from './components';
import { Spinner } from 'spin.js';
import {
  clearInputs,
  updateProduct,
  deleteProduct,
  Admin,
} from './core/functions';

import {
  getData,
  validateEmail,
  validatePassword,
  createNewProduct,
} from './core/functions';
import './style.css';
const existingUsersString = localStorage.getItem('Users');
let users = existingUsersString ? JSON.parse(existingUsersString) : [];

let isAdmin = false;
//spinner
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
const inputContainer = document.createElement('div');
inputContainer.className = 'input__container';

const header = new Header({
  tagName: 'header',
  className: 'header',
  id: 'header',
  children: [],
}).toHTML() as HTMLElement;

const main = new Main({
  tagName: 'main',
  className: 'main',
  id: 'main',
  children: [],
}).toHTML() as HTMLElement;

const emailInput = new Input({
  type: 'text',
  placeholder: 'Email',
  id: 'email-input',
  className: 'email-input',
}).toHTML();

const passwordInput = new Input({
  type: 'password',
  placeholder: 'Password',
  id: 'password-input',
  className: 'password-input',
}).toHTML();
const titleInput = new Input({
  type: 'text',
  placeholder: 'title',
  id: 'title-input',
  className: 'title-input',
}).toHTML();
const priceInput = new Input({
  type: 'text',
  placeholder: 'price',
  id: 'price-input',
  className: 'price-input',
}).toHTML();
const descriptionInput = new Input({
  type: 'text',
  placeholder: 'description',
  id: 'desc-input',
  className: 'desc-input',
}).toHTML();
const idInput = new Input({
  type: 'text',
  placeholder: 'id',
  id: 'id-input',
  className: 'id-input',
}).toHTML();
const imageInput = new Input({
  type: 'text',
  placeholder: 'image',
  id: 'image-input',
  className: 'image-input',
}).toHTML();
const addProductBtn = new Button({
  textContent: 'Add product',
  className: 'add_product_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        if (header.contains(inputContainer)) {
          createNewProduct(
            titleInput,
            priceInput,
            descriptionInput,
            idInput,
            imageInput,
            main
          );
          titleInput.remove();
          priceInput.remove();
          descriptionInput.remove();
          imageInput.remove();
          addProductBtn.remove();
        }
      },
    },
  ],
}).toHTML();

const addNewProductBtn = new Button({
  textContent: 'Add new product',
  className: 'add_new_product_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        header.append(inputContainer);
        if (!inputContainer.contains(titleInput)) {
          inputContainer.append(
            titleInput,
            priceInput,
            descriptionInput,
            imageInput,
            addProductBtn
          );
        }
      },
    },
  ],
}).toHTML();
const updateProductsBtn = new Button({
  textContent: 'update product',
  className: 'update_products_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        header.append(inputContainer);
        if (!inputContainer.contains(titleInput)) {
          inputContainer.append(
            titleInput,
            priceInput,
            idInput,
            updateProductBtn
          );
        }
      },
    },
  ],
}).toHTML();
const updateProductBtn = new Button({
  textContent: 'update product',
  className: 'update_product_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        if (header.contains(inputContainer)) {
          updateProduct(titleInput, priceInput, idInput, main);
          titleInput.remove();
          priceInput.remove();
          idInput.remove();
          updateProductBtn.remove();
        }
      },
    },
  ],
}).toHTML();
const deleteProductsBtn = new Button({
  textContent: 'delete product',
  className: 'delete_products_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        header.append(inputContainer);
        if (!inputContainer.contains(titleInput)) {
          inputContainer.append(idInput, deleteProductBtn);
        }
      },
    },
  ],
}).toHTML();
const deleteProductBtn = new Button({
  textContent: 'delete product',
  className: 'delete_product_btn',
  events: [
    {
      type: 'click',

      listener: () => {
        if (header.contains(inputContainer)) {
          deleteProduct(idInput, main);

          idInput.remove();
          deleteProductBtn.remove();
        }
      },
    },
  ],
}).toHTML();

const loginButton = new Button({
  textContent: 'Login',
  className: 'login-btn',
  events: [
    {
      type: 'click',

      listener: () => {
        if (validateEmail(emailInput) && validatePassword(passwordInput)) {
          const spinner = new Spinner(opts).spin();
          main.appendChild(spinner.el);
          setTimeout(() => {
            getData(main);
            main.append(addNewProductBtn, updateProductsBtn, deleteProductsBtn);
            spinner.stop();
            isAdmin = true;
          }, 2000);
        } else {
          const user = {
            email: emailInput.value,
            password: passwordInput.value,
          };
          users.push(user);
          localStorage.setItem('Users', JSON.stringify(users));
          localStorage.setItem('CurrentUser', user.email);
          const spinner = new Spinner(opts).spin();
          main.appendChild(spinner.el);
          setTimeout(() => {
            getData(main);

            spinner.stop();
            isAdmin = false;
          }, 2000);
        }
        emailInput.remove();
        passwordInput.remove();
        loginButton.remove();
        clearInputs(emailInput, passwordInput);
      },
    },
  ],
}).toHTML();

const app = new App({
  tagName: 'div',
  className: 'app',
  id: 'app',
  children: [header, main],
}).toHTML();
main.append(emailInput, passwordInput, loginButton);
document.body.append(app);
