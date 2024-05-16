import { listContent } from "./index.js";
import { listProgress } from "./index.js";
import { listDoneContent } from "./index.js";

export const inputSearch = document.querySelector('.search-todo')

export const search = () => {
    const filter = inputSearch.value.toLowerCase();

    if (filter.length > 0) {
        for (let i = 0; i < listContent.children.length; i++) {
            const title = listContent.children[i].querySelector(".title");
            const text = listContent.children[i].querySelector(".text");
            const name = listContent.children[i].querySelector(".name");

            if (title.innerHTML.toLowerCase().indexOf(filter) > -1
                || text.innerHTML.toLowerCase().indexOf(filter) > -1
                || name.innerHTML.toLowerCase().indexOf(filter) > -1) {

                listContent.children[i].style.display = "";
            } else {
                listContent.children[i].style.display = "none";
            }
        }
        for (let i = 0; i < listProgress.children.length; i++) {
            const title = listProgress.children[i].querySelector(".title");
            const text = listProgress.children[i].querySelector(".text");
            const name = listProgress.children[i].querySelector(".name");

            if (title.innerHTML.toLowerCase().indexOf(filter) > -1
                || text.innerHTML.toLowerCase().indexOf(filter) > -1
                || name.innerHTML.toLowerCase().indexOf(filter) > -1) {

                listProgress.children[i].style.display = "";
            } else {
                listProgress.children[i].style.display = "none";
            }
        }
        for (let i = 0; i < listDoneContent.children.length; i++) {
            const title = listDoneContent.children[i].querySelector(".title");
            const text = listDoneContent.children[i].querySelector(".text");
            const name = listDoneContent.children[i].querySelector(".name");

            if (title.innerHTML.toLowerCase().indexOf(filter) > -1
                || text.innerHTML.toLowerCase().indexOf(filter) > -1
                || name.innerHTML.toLowerCase().indexOf(filter) > -1) {

                listDoneContent.children[i].style.display = "";
            } else {
                listDoneContent.children[i].style.display = "none";
            }
        }

    } else if (filter.length === 0) {
        for (let child of listContent.children) {
            child.style.display = 'flex'
        }
        for (let child of listProgress.children) {
            child.style.display = 'flex'
        }
        for (let child of listDoneContent.children) {
            child.style.display = 'flex'
        }
    }
}

