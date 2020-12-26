import './styles/style.css';
import logo from './images/logo.png';

// set logo image
const img = document.querySelector('#img');
img.src = logo;

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const resetError = (error) => {
  error.textContent = '';
  error.className = 'error';
};

// changes req color according to isValid boolean value
const togglePasswordError = (isValid, req) => {
  req.style.color = isValid ? 'var(--red)' : '#000';
  req.className = isValid ? 'req active' : 'req';
};

// set button to enabled/disabled
const toggleButton = () => {
  const inputs = [...document.querySelectorAll('input')];
  const btn = document.querySelector('#btn');
  // disable button if at least one input is invalid
  for (const i of inputs) {
    if (i.className.includes('invalid') || !i.className.includes('valid')) {
      btn.disabled = true;
      break;
    }

    // if all inputs are valid
    btn.disabled = false;
  }
};

const showError = (input) => {
  let txt = '';
  // select error for current input
  const error = document.querySelector(`#${input.id} + span.error`);

  // create error message
  switch (input.id) {
    case 'username':
      txt = 'Username';
      break;
    case 'email':
      txt = 'E-mail address';
      break;
    default:
      txt = '';
  }

  // if input is invalid
  if (!input.validity.valid) {
    if (input.validity.valueMissing)
      error.textContent = `${txt} must not be empty`;
    else if (input.validity.typeMismatch)
      error.textContent = `Invalid ${txt.toLowerCase()}`;
    else if (input.validity.tooShort)
      error.textContent = `${txt} must be at least ${input.minLength} characters`;

    error.className = 'error active';
    input.className = 'invalid';
    // if input is valid, reset error
  } else {
    resetError(error);
    input.className = 'valid';
  }

  toggleButton();
};

const showPasswordError = (input) => {
  const reqs = document.querySelectorAll('.req');
  // if input is empty, change all reqs to red
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      reqs.forEach((req) => {
        req.style.color = 'var(--red)';
      });
    }
    // check for password length
    else if (input.validity.tooShort)
      togglePasswordError(input.validity.tooShort, reqs[3]);
  } else {
    reqs.forEach((req) => {
      req.style.color = '#000';
    });
    togglePasswordError(false, reqs[3]);
  }

  // check for uppercase character
  togglePasswordError(input.value === input.value.toLowerCase(), reqs[0]);
  // check for number
  togglePasswordError(!/\d/.test(input.value), reqs[1]);
  // check for special character
  togglePasswordError(
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(input.value),
    reqs[2]
  );

  // set class of password to valid if every req is fulfilled
  for (const req of reqs) {
    if (req.className.includes('active')) {
      password.className = 'invalid';
      break;
    }

    password.className = 'valid';
  }
  toggleButton();
};

username.addEventListener('input', () => showError(username));
email.addEventListener('input', () => showError(email));
password.addEventListener('input', () => showPasswordError(password));
