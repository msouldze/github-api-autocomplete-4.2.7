const createElement = (className) => {
    const item = document.createElement('li');
    item.classList.add(className);
    return item;
}

const debounce = (fn, debounceTime) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, debounceTime);
    };
};

const createResultItem = (data) => {
    const { name, owner, stars } = data;
    const item = createElement('result-item');
    const content = `<div>Name: ${name}</div>
        <div>Owner: ${owner}</div>
        <div>Stars: ${stars}</div>
        <div class="remove"></div>`
    item.innerHTML += content;
    return item;
}

const createSearchItem = (repo) => {
    const { name, owner: { login }, stargazers_count } = repo;
    const item = createElement('search-item');
    item.textContent = name;
    item.setAttribute("data-owner", login);
    item.setAttribute("data-stargazers_count", stargazers_count);
    return item;
};

export { debounce, createSearchItem, createResultItem };