import { search } from "./searchItem.js";
import { createResultItem } from "./utilities.js";

const inputElement = document.querySelector('.search-input');
const searchList = document.querySelector('.search-list');
const resultList = document.querySelector('.result-list');
const noResultElement = document.querySelector('.result-unsearched');

const render = (element, target) => {
    const data = {
        name: target.textContent,
        owner: target.dataset.owner,
        stars: target.dataset.stargazers_count,
    }
    const item = createResultItem(data);
    element.appendChild(item);

    resultList.style.display = 'block';
    noResultElement.style.display = 'none';
    searchList.innerHTML = '';
    inputElement.value = '';
}

export const init = () => {
    inputElement.addEventListener('keyup', search);
    
    document.addEventListener('click', (event) => {
        const { target } = event;
    
        if (target.classList.contains('search-item')) {
            render(resultList, target);
        }
    
        if (target.classList.contains('remove')) {
            const resultItem = target.closest('.result-item');
            resultItem.remove();
    
            if(resultList.textContent.length === 0) {
                noResultElement.style.display = 'block';
            }
        }
    });
}
