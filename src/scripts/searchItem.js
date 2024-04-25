import { debounce, createSearchItem } from "./utilities.js";

async function getRepos(value) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${value}+in:name&sort=stars&order=desc`, {
            headers: {
              'Accept': 'application/vnd.github+json'
            }
        })
        const { items: repos } = await response.json();
        return repos.slice(0, 5);
    } catch (err) {
        console.log(err);
    }
}

const updateInputElement = debounce((value) => render(value), 500)

const render = async (value) => {
    const searchList = document.querySelector('.search-list');
    const responce = await getRepos(value);
    searchList.innerHTML = '';

    for (let i = 0; i < responce.length; i += 1) {
        const item = createSearchItem(responce[i]);
        searchList.append(item);
    }
}

export const search = (event) => {
    const searchList = document.querySelector('.search-list');
    const { value } = event.target;

    if(value.length === 0) {
        searchList.style.display = 'none';
    } else {
        updateInputElement(value);
        searchList.style.display = 'block';
    }
}