import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

form.addEventListener(`input`, throttle(onInputForm, 500));
form.addEventListener(`submit`, onSubmitForm);

const formData = {};

function onInputForm(e) {
  formData[e.target.name] = e.target.value;
  const enterFormData = JSON.stringify(formData);
  localStorage.setItem(LOCAL_STORAGE_KEY, enterFormData);
}

function onSubmitForm(e) {
  e.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля');
  }

  console.log({ email: email.value, message: message.value });

  form.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return !serializedState ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCAL_STORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
