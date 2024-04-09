import { debounce, createSearchItem } from "./utilities.js";

const searchList = document.querySelector('.search-list');

async function getRepos(value) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${value}&sort=stars&order=desc`)
        const { items: repos } = await response.json();
        return repos;
    } catch (err) {
        console.log(err);
    }
}

const updateInputElement = debounce((value) => render(searchList, value), 500)

const render = async (element, value) => {
    const responce = await getRepos(value);
    element.innerHTML = '';

    for (let i = 0; i < 5; i += 1) {
        const item = createSearchItem(responce[i]);
        element.appendChild(item);
    }
}

export const search = (event) => {
    const { value } = event.target;

    if(value.length === 0) {
        searchList.style.display = 'none';
    } else {
        updateInputElement(value);
        searchList.style.display = 'block';
    }
}