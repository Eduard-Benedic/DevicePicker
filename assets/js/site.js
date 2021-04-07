
// I will assume the data is fetched from an API and looks like this
const DATA_STORE = window.DATA

const selectors = {
    selectBrand: '[el="selectBrand"]',
    productContainer: '[el="productContainer"]',
}

// Utility Functions
const select = (selector, isAll) => {
    if (typeof selector !== 'string') throw new Error('Selector must be a string')
    if (isAll) return document.querySelectorAll(selector)
    return document.querySelector(selector)
}

const clearNode = (node) => {
    while(node.firstChild) node.removeChild(node.firstChild)
}

// DevicePicker - contains the main logic for removing and adding the correct products
class DevicePicker {
    constructor({ selectStr, productContainer, data }) {
        this.selectEl = select(selectStr)
        this.productContainer = select(productContainer)
        this.data = data
    }

    init() {
        this.renderProductView('Apple')
        this._addBrands()
        this._attachEvent()
    }

    _addBrands() {
        this.data.forEach((brand) => {
            const option = document.createElement('option')
            option.text = brand.brand
            option.value = brand.brand
            this.selectEl.add(option)
        })
    }

    _attachEvent() {
        // Bind the handler to current instance
        this.selectEl.addEventListener('change', this._selectHandler.bind(this))
        this.productContainer.addEventListener('click', this._highlightProductHandler.bind(this))
    }

    _selectHandler(e) {
        const select = e.target
        const selectedOption = select.options[select.selectedIndex]
        this.renderProductView(selectedOption.value)
    }

    _highlightProductHandler(e) {
        const target = e.target
        // If you click on the parent simply return, otherwise all product-element would be highlighted
        if (Object.is(target, this.productContainer)) {
            return
        }
        const productNodes = e.currentTarget.childNodes
        productNodes.forEach(node => {
            const productContainer = node.firstElementChild
            productContainer.classList.remove('product-element__container--active')
        })
        target.parentNode.classList.add('product-element__container--active')
    }

    renderProductView(brandName) {
        const brand = this.data.filter((brand) => {
            return brandName == brand.brand
        })
        clearNode(this.productContainer)
        let productsHTML = ""
        brand[0].products.forEach((product) => {
            productsHTML += this.getProductTemplate(product)
        })
        this.productContainer.innerHTML = productsHTML
    }

    getProductTemplate(productData) {
        const {img,alt,  model} = productData
        return `<div class="product-element">
                    <div class="product-element__container">
                        <img class="product-element__img" src="${img}" alt="${alt}">
                        <h3 class="product-element__title">${model}</h3>
                    </div>
                </div>`
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const devicePicker = new DevicePicker({
        selectStr: selectors.selectBrand,
        productContainer: selectors.productContainer,
        data: DATA_STORE
    })

    devicePicker.init()
})