import {
    listDoneContent, listContent, listProgress, listAddCounter,
    listProgressCounter, listDoneCounter, todos,
    windowDescription, backdropOn, backdropOff, descriptionTitle, descriptionText,
    confirmDescriptionBtn, user, flag} from "./index.js"


import { windowWarning, confirmWarningBtn, warningText } from "./index.js"

export const setName = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

export const getName = () => {
    const array = JSON.parse(localStorage.getItem('todos'))

    array.forEach(()=>(item,index)=> {
        const cardNew = document.createElement('div')
        cardNew.classList.add('list-add__card', 'card')
        cardNew[index]

        const cardItemTitle = document.createElement('div')
        cardItemTitle.setAttribute('class', 'card__item')

        const cardItemDescription = document.createElement('div')
        cardItemDescription.setAttribute('class', 'card__item')

        const cardItemUser = document.createElement('div')
        cardItemUser.setAttribute('class', 'card__item')

        const spanTitle = document.createElement('span')
        spanTitle.classList.add('title')
        spanTitle.innerHTML = array[index].title

        const divButtons = document.createElement('div')
        divButtons.classList.add('divButtons')


        const editBtn = document.createElement('button')
        editBtn.setAttribute('type', 'button')
        editBtn.classList.add('card-item__btn')
        editBtn.innerHTML = 'EDIT'

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('card-item__btn', 'delete-btn')
        deleteBtn.innerHTML = 'DELETE'

        const spanDescription = document.createElement('span')
        spanDescription.classList.add('text')
        spanDescription.innerHTML = array[index].text

        const applyBtn = document.createElement('button')
        applyBtn.classList.add('card-item__btn', 'card-item__btn-apply')
        applyBtn.innerHTML = '>'

        const spanUser = document.createElement('span')
        spanUser.classList.add('name')
        spanUser.innerHTML = array[index].user

        const divDate = document.createElement('div')
        divDate.setAttribute('class', 'date')
        divDate.innerHTML = array[index].time

        const backBtn = document.createElement('button')
        backBtn.classList.add('card-item__btn', 'back-btn')
        backBtn.innerHTML = 'BACK'

        const comleteBtn = document.createElement('button')
        comleteBtn.classList.add('card-item__btn', 'comlete-btn')
        comleteBtn.innerHTML = 'COMPLETE'

        divButtons.append(editBtn, deleteBtn)
        cardItemTitle.append(spanTitle, divButtons)
        cardItemDescription.append(spanDescription, applyBtn)
        cardItemUser.append(spanUser, divDate)

        cardNew.append(cardItemTitle, cardItemDescription, cardItemUser)

        if (array[index].status === 'TODO') listContent.append(cardNew)
        if (array[index].status === 'In progress') {
            cardNew.style.backgroundColor = 'rgb(240, 240, 255)'
            applyBtn.remove()
            editBtn.remove()
            deleteBtn.remove()
            divButtons.append(backBtn, comleteBtn)
            listProgress.append(cardNew)
        }
        if (array[index].status === 'Done') {
            cardNew.style.backgroundColor = 'rgb(135, 206, 250)'
            backBtn.remove()
            comleteBtn.remove()
            editBtn.remove()
            applyBtn.remove()
            divButtons.append(deleteBtn)
            listDoneContent.append(cardNew)
        }



        const todoNew = {}
        todoNew.id = array[index].id
        todoNew.user = array[index].user
        todoNew.title = array[index].title
        todoNew.text = array[index].text
        todoNew.time = array[index].time
        todoNew.status = array[index].status

        todos.push(todoNew)

        document.addEventListener('click', (event) => {
            if (event.target == editBtn) {
                windowDescription.style.display = 'flex'
                descriptionText.value = spanDescription.innerHTML
                descriptionTitle.value = spanTitle.innerHTML
                user.value = spanUser.innerHTML
                flag.key = false
                const confirmDescriptionBtnEvent = (event) => {
                    if (event.target === confirmDescriptionBtn && descriptionTitle.value.trim() !== '' && descriptionText.value.trim() !== '' && user.value !== '') {
                        if(item.id) {
                            windowDescription.style.display = 'none';
                            array[index].title = descriptionTitle.value;
                            array[index].text = descriptionText.value;
                            array[index].user = user.value;
                            todoNew.title = array[index].title;
                            todoNew.text = array[index].text;
                            todoNew.user = array[index].user;
                            setName();
                            spanTitle.innerHTML = descriptionTitle.value;
                            spanDescription.innerHTML = descriptionText.value;
                            spanUser.innerHTML = user.value;
                            flag.key = true;
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

                    todoNew.status = 'In progress'
                    setName()

                    cardNew.style.backgroundColor = 'rgb(240, 240, 255)'
                    applyBtn.remove()
                    editBtn.remove()
                    deleteBtn.remove()
                    divButtons.append(backBtn, comleteBtn)
                    listProgress.append(cardNew)
                } else {
                    windowWarning.style.display = 'flex'
                    warningText.innerHTML = 'Сначала нужно выполнить текущие дела!'
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
                cardNew.remove()
                todos.splice(todos.indexOf(todoNew), 1)
                setName()
            }
            if (event.target == backBtn) {
                listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
                listAddCounter.innerHTML = ++listAddCounter.innerHTML;
                cardNew.style.backgroundColor = 'rgb(152, 223, 138)'
                divButtons.append(editBtn, deleteBtn)
                cardItemDescription.append(applyBtn)
                backBtn.remove()
                comleteBtn.remove()
                listContent.append(cardNew)

                todoNew.status = 'TODO'
                setName()
            }
            if (event.target == comleteBtn) {
                listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
                listDoneCounter.innerHTML = ++listDoneCounter.innerHTML;
                cardNew.style.backgroundColor = 'rgb(135, 206, 250)'
                backBtn.remove()
                comleteBtn.remove()
                divButtons.append(deleteBtn)
                listDoneContent.append(cardNew)

                todoNew.status = 'Done'
                setName()
            }
        })
    })
}