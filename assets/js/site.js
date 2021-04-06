
// I will assume the data is fetched from an API and looks like this
const DATA_STORE = [
    {
        brand: 'Apple',
        products: [
            {
                model: 'iPhone 12 Pro Max',
                img: 'assets/images/iphone.jpg'
            },
            {
                model: 'iPhone 12 Pro',
                img: 'assets/images/iphone.jpg'
            },
            {
                model: 'iPhone 12',
                img: 'assets/images/iphone.jpg'
            },
            {
                model: 'iPhone 11 Pro Max',
                img: 'assets/images/iphone.jpg'
            },
            {
                model: 'iPhone 11 Pro',
                img: 'assets/images/iphone.jpg'
            }
        ],

    },
    {
        brand: 'Samsung',
        products: [
            {
                model: 'Galaxy S21 Ultra',
                img: 'assets/images/galaxy.jpg'
            },
            {
                model: 'Galaxy S21 Plus',
                img: 'assets/images/galaxy.jpg'
            },
            {
                model: 'Galaxy S21',
                img: 'assets/images/galaxy.jpg'
            },
            {
                model: 'Galaxy S10',
                img: 'assets/images/galaxy.jpg'
            },
            {
                model: 'Galaxy S8',
                img: 'assets/images/galaxy.jpg'
            }
        ]
    },
    {
        brand: 'Google',
        products: [
            {
                model: 'Google S21 Ultra',
                img: 'assets/images/pixel.jpg'
            },
            {
                model: 'Google S21 Plus',
                img: 'assets/images/pixel.jpg'
            },
            {
                model: 'Google S21',
                img: 'assets/images/pixel.jpg'
            },
            {
                model: 'Google S10',
                img: 'assets/images/pixel.jpg'
            },
            {
                model: 'Google S8',
                img: 'assets/images/pixel.jpg'
            }
        ]
    }
]

const selectors = {
    selectBrand: '[el="selectBrand"]',
    productContainer: '[el="productContainer"]'
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

class BrandSelect {
    constructor({ selectStr, productContainer, data }) {
        this.selectTag = select(selectStr)
        this.data = data
        this.productContainer = select(productContainer)
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
            this.selectTag.add(option)
        })
    }

    addOption() {

    }

    _attachEvent() {
        this.selectTag.addEventListener('change', (e) => {
            const selectedOption = this.selectTag.options[this.selectTag.selectedIndex]
            this.renderProductView(selectedOption.value)
        })
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
        const {img, model} = productData
        return `<div class="product-element">
                    <div class="product-element__container">
                        <img class="product-element__img" src="${img}" alt="${model}">
                        <h3 class="product-element__title">${model}</h3>
                    </div>
                </div>`
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const brandSelect = new BrandSelect({
        selectStr: selectors.selectBrand,
        productContainer: selectors.productContainer,
        data: DATA_STORE
    })
    brandSelect.init()
})