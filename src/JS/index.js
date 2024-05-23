import {clock} from './clock.js';
import {inputSearch, search} from "./search.js";
import {getUserName} from "./users.js";
import {createCard} from './cards.js';

clock.innerHTML = clock()

export const listAddCounter = document.querySelector('.list-add__header-number');
export const listProgressCounter = document.querySelector('.list-progress__header-number');
export const listDoneCounter = document.querySelector('.list-done__header-number');
listAddCounter.innerHTML = 0;
listProgressCounter.innerHTML = 0;
listDoneCounter.innerHTML = 0;

export let todos = [];


export const listContent = document.querySelector('.list-add__content')
export const addContentBtn = document.querySelector('.add-btn')

export const listProgress = document.querySelector('.list-progress__content')

export const listDoneContent = document.querySelector('.list-done__content')
export const deleteAllBtn = document.querySelector('.delete-all-btn')


export const windowDescription = document.querySelector('.window-description')
export const descriptionTitle = document.querySelector('.description__title')
export const descriptionText = document.querySelector('.description__text')
export const cancelDescriptionBtn = document.querySelector('.description-cancel-btn')
export const confirmDescriptionBtn = document.querySelector('.description-confirm-btn')
export const user = document.querySelector('select')
export const flag = {key:true};


export const windowWarning = document.querySelector('.window-warning')
export const cancelWarningBtn = document.querySelector('.warning-cancel-btn')
export const confirmWarningBtn = document.querySelector('.warning-confirm-btn')
export const warningText = document.querySelector('.warning__text')


// export const backdropOn = () => {};
// export const backdropOff = ()  => {};

document.addEventListener('click', ({target}) => {
    if (target == addContentBtn) {
        confirmDescriptionBtn.classList.add('description-confirm-btn')
        windowDescription.style.display = 'flex'
    }
    if (target == deleteAllBtn) {
        if (listDoneCounter.innerHTML > 0) {
            warningText.innerHTML = 'Вы уверены, что хотите удалить все выполненные карточки?'
        } else {
            warningText.innerHTML = 'Список пуст'
            confirmWarningBtn.hidden = true
        }
        windowWarning.style.display = 'flex'
    }
    if (target == cancelDescriptionBtn) {
        descriptionTitle.value = '';
        descriptionText.value = '';
        user.value = '';
        windowDescription.style.display = 'none'

    }
    if (target == confirmDescriptionBtn
        && descriptionTitle.value.trim() !== ''
        && descriptionText.value.trim() !== ''
        && user.value !== '') {

        windowDescription.style.display = 'none'

        if (flag.key == true) {
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
            createCard()
            descriptionTitle.value = '';
            descriptionText.value = '';
            user.value = '';
        }
    }
    if (target == cancelWarningBtn) {
        windowWarning.style.display = 'none'

    }
    if (target == confirmWarningBtn) {
        listDoneContent.innerHTML = ''
        listDoneCounter.innerHTML = 0;

        const array = todos.filter(value => value.status !== 'Done')
        todos = array

        windowWarning.style.display = 'none'

    }
    if (target == inputSearch) {
        document.addEventListener('input', search);
    }
})

export let userName = [];
await getUserName();

for (let i = 0; i < userName.length; i++) {
    const listUsers = document.createElement('option');

    listUsers.innerHTML = userName[i];
    user.appendChild(listUsers);
};

