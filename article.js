const database = {};

const container = document.querySelector('.articles');

class Article {
    constructor(title, date, tags, id) {
        this.title = title;
        this.date = date;
        this.tags = tags;
        this.id = id;
    }

    static sort() {
    }

    static add() {
        const title = document.querySelector('#user_input').value;
        const description = document.querySelector('#description').value;
        const tags = document.querySelector('#tags').value;
        const select = document.querySelector('select#articles');
        const id = Object.keys(database).length + 1;

        database[title] = new Article(title, new Date(), tags, id);
        
        const html = document.createElement('div');
        html.classList = `article id-${id}`;

        const content = document.createElement('div');
        content.classList = 'content';
        content.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            <span>${tags}</span>`;
        html.appendChild(content);
        container.appendChild(html);

        const option = document.createElement('option');
        option.setAttribute('value', `id-${id}`)
        option.textContent = title;
        select.appendChild(option);
    }

    static remove() {
        const selectMenu = document.querySelector('select#articles');
        const selected = selectMenu.value;
        const option = document.querySelector(`option[value="${selected}"]`);

        const article = document.querySelector(`.article.${selected}`);
        console.log(article);
        console.log(option);
        container.removeChild(article);
        selectMenu.removeChild(option);
        
        delete database[selected];
        
    }

    static {
        // Static Initialization Block
        // executes everything on class declaration

        const buttons = document.querySelectorAll('button');
        buttons.forEach( btn => {
            btn.addEventListener('click', (e) => {
                const value = e.target.textContent.toLowerCase();
                console.log(e);

                switch (true) {
                    case (value.includes('add')):
                        this.add();
                        break;
                    case (value.includes('remove')):
                        this.remove();
                }
            });
        })
    }
}