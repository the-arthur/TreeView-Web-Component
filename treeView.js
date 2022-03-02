import items from './data.js';


class TreeView extends HTMLElement {

    constructor() {
        super();
        this.items = items;
        this.attachShadow({ mode: 'open' })
        this.container = document.createElement('div');
        this.container.classList.add('container')
        this.ul = document.createElement('ul');
        this.ul.classList.add('items_ul')
        this.shadowRoot.appendChild(this.container);
        this.header = document.createElement('div');
        this.header.classList.add('header')
        this.container.appendChild(this.header);
        this.container.appendChild(this.ul);
        this.ul.innerHTML += `
            <style>
                .items_ul::-webkit-scrollbar {
                    width: 5px;
                }  
                .items_ul::-webkit-scrollbar-thumb {
                    background-color: #5F5F5F;
                }
                .container {
                    width: 295px;
                    margin: auto;
                }
                .items_ul {
                    padding: 0;
                    padding-left: 20px;
                    background: #3D3D3D;
                    margin: 0;
                    height: 140px;
                    overflow: auto;
                    position: relative;
                }
                .left_border{

                }
                ul {
                    list-style-type: none;
                }
                .polygon {
                    width: 5px;
                    height: 3px;
                    cursor: pointer;
                    position: absolute;
                    left: 8px;
                    z-index: 1;
                    transition: 0.3s;
                }
                .polygon:hover {
                    transform: scale(1.5);
                }
                .polygon_active{
                    transform: rotate(-90deg);
                }
                .item {
                    padding: 10px 0px;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    height: 35px;
                    box-sizing: border-box;
                }
                .item_selected {
                    background: #424242;
                }
                .item:before {
                    content: '';
                    z-index: 1;
                    height: 35px;
                    width: 1px;
                    position: absolute;
                    left: 0;
                    margin-left: 28px;
                    background: #6a6a6a;
                }
                .item:after {
                    content: '';
                    height: 35px;
                    width: 1000%;
                    box-sizing: border-box;
                    margin-left: -200%;
                    border-bottom: solid 1px #00000030;
                    z-index: 0;
                }
                .label_container {
                    position: relative;
                    z-index: 1;
                }
                .label {
                    white-space: nowrap;
                    color: #8D8D8D;
                    font-size: 11px;
                    line-height: 15px;
                    position: relative;
                    user-select: none;
                    cursor: text;
                }
                .form {
                    display: none;
                    position: absolute;
                    left: 0;
                }
                .form_active {
                    display: inline-block;
                }
                .input {
                    font-family: auto;
                    font-size: 11px;
                    height: 15px;
                    width: 100%;
                    min-width: 80px;
                    background: #2c2c2c;
                    border: none;
                    border-radius: 3px;
                    color: #9e9e9e;
                    text-align: center;
                    outline: none;
                }
                .header {
                    z-index: 1;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15px;
                    border-top: solid 1px #323232;
                    position: relative;
                    box-shadow: 0px 0px 6px #000000b3;
                    background: #3A3A3A;
                    height: 36px;
                    box-sizing: border-box;
                }
                .footer_nav {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15px;
                    border-top: solid 1px #323232;
                    position: relative;
                    box-shadow: 0 0px 10px #00000073;
                    background: #3d3d3d;
                    height: 36px;
                    box-sizing: border-box;
                }
                .add_btn{
                    background-image: url(./icons/add.svg);
                    width: 13px;
                    height: 13px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-color: unset;
                    border: none;
                    padding: 0;
                    margin-right: 10px;
                    cursor: pointer;
                }
                .delete_btn{
                    background-image: url(./icons/delete.svg);
                    width: 13px;
                    height: 13px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-color: unset;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
                .save_btn{
                    background-image: url(./icons/save.svg);
                    width: 13px;
                    height: 13px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-color: unset;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
                .search_btn {
                    background-image: url(./icons/search.svg);
                    width: 9px;
                    height: 11px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-color: unset;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
                .add_menu {
                    z-index: 2;
                    margin: 0;
                    background: #3d3d3d;
                    visibility: hidden;
                    position: absolute;
                    bottom: +100%;
                    left: 0;
                    width: 152px;
                    height: 72px;
                    padding: 5px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border: solid 1px #444444;
                    border-radius: 2px;
                }
                .add_menu_active {
                    visibility: visible;
                }
                .add_menu_icon {
                    width: 13px;
                    height: 13px;
                    margin-right: 7px;
                }
                .add_menu_text {
                    color: #8D8D8D;
                }
                .add_menu_li{
                    cursor: pointer;
                }
                .add_menu_li:hover{
                    background: #424242;
                }
                .childrens_ul {
                    padding-left: 30px;
                }
                .childrens_ul:before {
                    content: "";
                    z-index: 1;
                    width: 17px;
                    height: 35px;
                    border-left: solid 1px #6A6A6A;
                    border-bottom: solid 1px #6A6A6A;
                    position: absolute;
                    margin-left: -22px;
                    margin-top: -17px;
                }
                .childrens_ul_active {
                    display: none;
                }
                .icon {
                    outline: solid 5px #3d3d3d;
                    margin-right: 10px;
                    z-index: 2;
                }
            </style>
          `
    }


    connectedCallback() {
        this.headerNav()
        this.footerNav()
        this.render(this.items, false, false)
        this.itemHideShow()
        this.addBtn()
        this.itemSelect()
        this.itemsDelete()
        this.itemsAdd()
        this.itemRename()
    }

    headerNav() {
        this.header.innerHTML += `
        <button class="search_btn"></button>
          `
    }

    iconSet(props) {
        if (props.icon == "file_icon") {
            this.props.icon = "./icons/file.svg"
        } else if (props.icon == "object_icon") {
            this.props.icon = "./icons/object.svg"
        } else {
            this.props.icon = "./icons/folder.svg"
        }
    }

    render(props, hasChildren, key) {
        this.props = props;
        this.props.map((element) => {
            this.props = element;

            this.props.id = Math.round(Math.random() * 1000 * props.length);

            key == false ? key = this.props.label : ''

            this.iconSet(this.props)
            this.li = document.createElement('li');
            this.li.classList.add('li_item')

            this.li.id = `${this.props.id}`

            const lastKey = this.props.id;

            this.li.innerHTML += `
            <div class="item">
                <img class="polygon" src="./icons/polygon.svg">
                <img class="icon" src="${this.props.icon}" alt="${this.props.type}">
                <div class="label_container">
                    <span class="label">${this.props.label}
                    </span>
                    <form class="form" type="submit">
                        <input class="input" type="text" value="${this.props.label}">
                    </form>
                </div>
            </div>
        `
            if (hasChildren == true) {
                this.newUl = document.createElement('ul');
                this.newUl.classList.add('childrens_ul')
                this.newUl.appendChild(this.li);
                this.findItem = this.shadowRoot.getElementById(`${key}`)
                this.findItem.appendChild(this.newUl);
                // this.ul.appendChild(this.newUl);

            } else {
                this.ul.appendChild(this.li);
                key = false;
            }
            if (this.props.children.length > 0) {
                this.props = this.props.children;
                this.render(this.props, true, lastKey);
            }
        })
    }

    itemHideShow() {
        this.item = this.shadowRoot.querySelectorAll(`.item`)
        this.item.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.stopPropagation()
                const polygon = el.querySelector(`.polygon`)
                const liItem = e.target.closest('.li_item')
                const childrenUl = liItem.querySelectorAll(`.childrens_ul`)
                if (e.target == polygon) {
                    polygon.classList.toggle('polygon_active')
                    if (childrenUl.length > 0) {
                        childrenUl.forEach((el) => {
                            el.classList.toggle('childrens_ul_active')
                        })
                    }
                }

            })
        })
    }

    footerNav() {
        this.div = document.createElement('div');
        this.div.classList.add('footer_nav')
        this.container.appendChild(this.div);
        this.div.innerHTML += `
            <ul class="add_menu">
                <li class="add_menu_li object" ><img class="add_menu_icon" src="./icons/object.svg" alt="object"><span class="add_menu_text">object</span></li>
                <li class="add_menu_li folder" ><img class="add_menu_icon" src="./icons/folder.svg" alt="folder"><span class="add_menu_text">folder</span></li>
                <li class="add_menu_li file" ><img class="add_menu_icon" src="./icons/file.svg" alt="file"><span class="add_menu_text">file</span></li>
            </ul>
            <div>
                <button class="add_btn"></button>
                <button class="delete_btn"></button>
            </div>
            <button class="save_btn"></button>
          `
    }

    addBtn() {
        const addBtn = this.shadowRoot.querySelector(".add_btn");
        const addMenu = this.shadowRoot.querySelector(".add_menu");
        addBtn.addEventListener('click', (e) => {
            e.preventDefault()
            addMenu.classList.toggle('add_menu_active')
        })
    }

    itemSelect() {
        const items = this.shadowRoot.querySelectorAll(`.item`)
        items.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.stopPropagation()
                const itemSelected = e.target.closest('.item');
                if (e.target == itemSelected) {
                    items.forEach((item) => {
                        item.classList.remove('item_selected')
                    })
                    const LiItems = this.shadowRoot.querySelectorAll(`.li_item`)
                    LiItems.forEach((item) => {
                        item.classList.remove('li_item_selected')
                    })
                    itemSelected.classList.add('item_selected')
                    itemSelected.parentNode.classList.add('li_item_selected')
                }
            })
        })

        document.addEventListener('keyup', (e) => {
            if (e.key === "Escape") {
                const LiItems = this.shadowRoot.querySelectorAll(`.li_item`)
                const items = this.shadowRoot.querySelectorAll(`.item`)
                LiItems.forEach((item) => {
                    item.classList.remove('li_item_selected')
                })
                items.forEach((item) => {
                    item.classList.remove('item_selected')
                })
            }
        })
    }

    itemsDelete() {
        const deleteBtn = this.shadowRoot.querySelector(".delete_btn");
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const deleteEl = this.shadowRoot.querySelector(".li_item_selected")
            if (deleteEl != null) {
                const deleteElParent = deleteEl.parentNode;
                const doNotDelete = this.shadowRoot.querySelector(".items_ul")
                deleteEl.remove();
                if (deleteElParent != doNotDelete) {
                    deleteElParent.remove()
                }
            }
        })
    }

    itemsAdd() {

        const addMenuLi = this.shadowRoot.querySelectorAll(".add_menu_li");
        const addMenuObj = this.shadowRoot.querySelector(".object");
        const addMenuFold = this.shadowRoot.querySelector(".folder");
        const addMenuFile = this.shadowRoot.querySelector(".file");
        const globalUl = this.shadowRoot.querySelector(".items_ul");

        const addNewItem = (props) => {
            this.li = document.createElement('li');
            this.li.classList.add('li_item')
            this.li.innerHTML += `
            <div class="item">
                <img class="polygon" src="./icons/polygon.svg">
                <img class="icon" src="${props.icon}" alt="${props.type}">
                <div class="label_container">
                    <span class="label">${props.label}</span>
                    <form class="form" type="submit">
                        <input class="input" type="text" value="${props.label}">
                    </form>
                </div>
            </div>

            `
            const whereAdd = this.shadowRoot.querySelector(".li_item_selected")

            if (whereAdd != null) {
                if (props.type == 'file') {
                    alert('Требование: сущность типа File может находиться только на самом верхнем уровне!')
                } else {
                    this.newUl = document.createElement('ul');
                    this.newUl.classList.add('childrens_ul')
                    this.newUl.appendChild(this.li);
                    whereAdd.appendChild(this.newUl);
                }
            }
            else {
                globalUl.appendChild(this.li);
            }
            this.itemSelect();
        }

        addMenuLi.forEach((el) => {
            el.addEventListener('click', (e) => {
                if (e.currentTarget == addMenuObj) {
                    this.props =
                    {
                        label: "новый обьект",
                        icon: "./icons/object.svg",
                        type: "object",
                        children: []
                    }
                    addNewItem(this.props);
                } else if (e.currentTarget == addMenuFold) {
                    this.props =
                    {
                        label: "новая папка",
                        icon: "./icons/folder.svg",
                        type: "folder",
                        children: []
                    }
                    addNewItem(this.props)
                } else if (e.currentTarget == addMenuFile) {
                    this.props =
                    {
                        label: "новый файл",
                        icon: "./icons/file.svg",
                        type: "file",
                        children: []
                    }
                    addNewItem(this.props)
                }
                const addMenu = this.shadowRoot.querySelector(".add_menu");
                addMenu.classList.toggle('add_menu_active')
            })
        })
    }

    itemRename() {
        const labels = this.shadowRoot.querySelectorAll(".label");

        labels.forEach(label => {
            const labelContainer = label.parentNode;
            const form = labelContainer.querySelector(".form");
            const input = form.querySelector(".input");
            label.addEventListener('dblclick', (e) => {
                e.preventDefault()
                form.classList.toggle('form_active')
                const items = this.shadowRoot.querySelectorAll('.item')
                items.forEach((item) => {
                    const input = item.querySelector('.input')
                    item.addEventListener("click", (e) => {
                        if (!input.contains(e.target)) {
                            form.classList.toggle('form_active')
                        }
                    })
                })
            })
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                form.classList.toggle('form_active')
                const newLabel = input.value;
                if (newLabel.length <= 0) {
                    alert('Имя файла не может быть пустым!')
                } else {
                    label.innerHTML = newLabel;
                }
            })
        })


        document.addEventListener('keyup', (e) => {
            if (e.key === "Escape") {
                const forms = this.shadowRoot.querySelectorAll(".form");
                forms.forEach((form) => {
                    form.classList.remove('form_active')
                })
            }
        })

    }

}

customElements.define("tree-view", TreeView);