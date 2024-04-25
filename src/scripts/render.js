import { search } from "./searchItem.js";
import { createResultItem } from "./utilities.js";

const render = () => {
    const container = `<div class="container">
        <div class="search">
            <input class="search-input" type="text">
            <ul class="search-list"></ul>
        </div>
        <div class="result">
            <div class="result-unsearched">No results yet.</div>
            <ul class="result-list"></ul>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", container);
}

render();

export const init = () => {
    const inputElement = document.querySelector('.search-input');
    const searchList = document.querySelector('.search-list');
    const resultList = document.querySelector('.result-list');
    const noResultElement = document.querySelector('.result-unsearched');

    inputElement.addEventListener('keyup', search);
    
    document.addEventListener('click', (event) => {
        const { target } = event;
    
        if (target.classList.contains('search-item')) {
            const data = {
                name: target.textContent,
                owner: target.dataset.owner,
                stars: target.dataset.stargazers_count,
            }
            const item = createResultItem(data);
            resultList.appendChild(item);

            resultList.style.display = 'block';
            noResultElement.style.display = 'none';
            searchList.innerHTML = '';
            inputElement.value = '';
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
