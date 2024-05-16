import { listDoneContent, listContent, listProgress, listAddCounter, listProgressCounter, listDoneCounter, todos, windowDescription, backdropOn, backdropOff, descriptionTitle, descriptionText, confirmDescriptionBtn, user, flag} from "./index.js"
import {setName} from "./localstorage.js";
import {windowWarning, confirmWarningBtn, warningText} from "./index.js"

export const createCard = () => {
    const card = document.createElement('div')
    card.classList.add('list-add__card', 'card')


    const cardItemTitle = document.createElement('div')
    cardItemTitle.setAttribute('class', 'card__item')

    const cardItemDescription = document.createElement('div')
    cardItemDescription.setAttribute('class', 'card__item')

    const cardItemUser = document.createElement('div')
    cardItemUser.setAttribute('class', 'card__item')

    const spanTitle = document.createElement('span')
    spanTitle.classList.add('title')
    spanTitle.innerHTML = descriptionTitle.value

    const divButtons = document.createElement('div')
    divButtons.classList.add('divButtons')

    const editBtn = document.createElement('button')
    editBtn.setAttribute('type', 'button')
    editBtn.classList.add('card-item__btn', 'edit-btn')
    editBtn.innerHTML = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('card-item__btn', 'delete-btn')
    deleteBtn.innerHTML = 'DELETE'

    const spanDescription = document.createElement('span')
    spanDescription.classList.add('text')
    spanDescription.innerHTML = descriptionText.value

    const applyBtn = document.createElement('button')
    applyBtn.classList.add('card-item__btn', 'card-item__btn-apply')
    applyBtn.innerHTML = '>'

    const spanUser = document.createElement('span')
    spanUser.classList.add('name')
    spanUser.innerHTML = user.value

    const divDate = document.createElement('div')
    divDate.setAttribute('class', 'date')
    divDate.innerHTML = document.querySelector('.clock').innerHTML


    divButtons.append(editBtn, deleteBtn);
    cardItemTitle.append(spanTitle, divButtons);
    cardItemDescription.append(spanDescription, applyBtn);
    cardItemUser.append(spanUser, divDate);

    card.append(cardItemTitle, cardItemDescription, cardItemUser)
    listContent.append(card);

    const backBtn = document.createElement('button')
    backBtn.classList.add('card-item__btn', 'back-btn')
    backBtn.innerHTML = 'BACK'

    const comleteBtn = document.createElement('button')
    comleteBtn.classList.add('card-item__btn', 'comlete-btn')
    comleteBtn.innerHTML = 'COMPLETE'

    const todo = {};
    todo.id = Date.now()
    todo.user = spanUser.innerHTML
    todo.title = spanTitle.innerHTML
    todo.text = spanDescription.innerHTML
    todo.time = divDate.innerHTML
    todo.status = "TODO"
    todos.push(todo);
    console.log(todos)

    document.addEventListener('click', (event) => {
        if (event.target == editBtn) {
            const todoParent = event.target.closest('.list-add__card');
            let indexTodoParent = Array.from(todoParent.parentElement.children).indexOf(todoParent);
            windowDescription.style.display = 'flex'
            descriptionText.value = spanDescription.innerHTML
            descriptionTitle.value = spanTitle.innerHTML
            user.value = spanUser.innerHTML
            flag.key = false
            let confirmDescriptionBtnEvent = (event) => {
                if (event.target === confirmDescriptionBtn && descriptionTitle.value.trim() !== '' && descriptionText.value.trim() !== '' && user.value !== '') {
                    if(todos[indexTodoParent].id) {
                        windowDescription.style.display = 'none';
                        todos[indexTodoParent].title = descriptionTitle.value;
                        todos[indexTodoParent].text = descriptionText.value;
                        todos[indexTodoParent].user = user.value;
                        todo.title = todos[indexTodoParent].title;
                        todo.text = todos[indexTodoParent].text;
                        todo.user = todos[indexTodoParent].user;
                        setName();
                        spanTitle.innerHTML = descriptionTitle.value;
                        spanDescription.innerHTML = descriptionText.value;
                        spanUser.innerHTML = user.value;
                        flag.key = true;
                        descriptionTitle.value = '';
                        descriptionText.value = '';
                        user.value = '';
                    }
                    document.removeEventListener('click', confirmDescriptionBtnEvent);
                }
            }
            document.addEventListener('click', confirmDescriptionBtnEvent);
        }

        if (event.target == applyBtn) {

            if (listProgressCounter.innerHTML < 6) {
                listAddCounter.innerHTML = --listAddCounter.innerHTML;
                listProgressCounter.innerHTML = ++listProgressCounter.innerHTML;
              
                todo.status = 'In progress'

                setName()   
              
                card.style.backgroundColor = 'rgb(240, 240, 255)'
                applyBtn.remove()
                editBtn.remove()
                deleteBtn.remove()
                divButtons.append(backBtn, comleteBtn)
                listProgress.append(card) 
            } else {
                windowWarning.style.display = 'flex'
                warningText.innerHTML = 'Сначала нужно выполнить текущие дела'
                confirmWarningBtn.hidden = true
            }
        }
        if (event.target == deleteBtn) {
            if (deleteBtn.closest('.list-add')) {
                listAddCounter.innerHTML = --listAddCounter.innerHTML;
            }
            if (deleteBtn.closest('.list-done')) {
                listDoneCounter.innerHTML = --listDoneCounter.innerHTML;
            }
            card.remove()
            todos.splice(todos.indexOf(todo), 1)
            setName()
        }
        if (event.target == backBtn) {
            listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
            card.style.backgroundColor = 'rgb(152, 223, 138)'
            divButtons.append(editBtn, deleteBtn)
            cardItemDescription.append(applyBtn)
            backBtn.remove()
            comleteBtn.remove()
            listContent.append(card)

            todo.status = 'TODO'
            setName()
        }
        if (event.target == comleteBtn) {
            listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
            listDoneCounter.innerHTML = ++listDoneCounter.innerHTML;
            card.style.backgroundColor = 'rgb(135, 206, 250)'            
            backBtn.remove()
            comleteBtn.remove()
            divButtons.append(deleteBtn)
            listDoneContent.append(card)

            todo.status = 'Done'
            setName()
        }
    })
    setName()
}