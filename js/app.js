class Store {
    constructor() {

        // tracks how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menu = {
            item1: {
                id: 1,
                dish: 'chicken panang',
                img: 'media/banner1.jpg',
                alt: 'chicken panang',
                desc: 'Sliced chicken breast and vegetables cooked in a peanut curry sauce served over jasmine rice',
                price: 12.99,
                qty: 0
    
            },

            item2: {
                id: 2,
                dish: 'shrimp pad thai',
                img: 'media/banner2.jpeg',
                alt: 'shrimp pad thai',
                desc: 'Rice noodles cooked in curry sauce with crushed peanuts, veggies, and shrimp',
                price: 9.99,
                qty: 0
            },

            item3: {
                id: 3,
                dish: 'spicy shrimp and noodles',
                img: 'media/banner3.jpg',
                alt: 'spicy shrimp and noodles',
                desc: 'Shrimp and noodles cooked in a spicy curry',
                price: 11.99,
                qty: 0
            },

            item4: {
                id: 4,
                dish: 'veggie dish',
                img: 'media/banner4.jpg',
                alt: 'veggie dish',
                desc: 'Veggies and noodles',
                price: 9.99,
                qty: 0
            },

            item5: {
                id: 5, 
                dish: 'shrimp curry',
                img: 'media/banner5.jpg',
                alt: 'shrimp curry',
                desc: 'Yellow curry and shrimp served over jasmine rice',
                price: 14.99,
                qty: 0
            },

            item6: {
                id: 6,
                dish: 'chicken pad thai',
                img: 'media/banner6.jpg',
                alt: 'chicken pad thai',
                desc: 'A favorite. Rice noodles cooked in peanut curry sauce with veggies and chicken',
                price: 10.99,
                qty: 0
            },

            item7: {
                id: 7,
                dish: 'chicken and veggies',
                img: 'media/heroBg.jpg',
                alt: 'chicken and veggies',
                desc: 'Marinated diced chicken breast with green beans',
                price: 8.99,
                qty: 0
            },

            item8: {
                id: 8,
                dish: 'spring rolls',
                img: 'media/img6.jpg',
                alt: 'spring rolls',
                desc: 'Choose between beef, shrimp, pork, or veggie filling',
                price: 7.99,
                qty: 0
            }
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        // this.displayCheckoutItems();
        this.checkout();
        this.homeSwitch();
        this.confirmOrder();
    }

    loadItems() {
        let itemDiv = document.getElementById('itemDiv');
        // console.log(itemDiv);

        for (const key in this.menu) {
            const item = this.menu[key];
            const product = document.createElement('div');
            product.className = 'col-md-3';
            product.innerHTML = `
                <figure class="item-figure">
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img" />
                    <figcaption class="item-caption" id="itemCaption">${item.dish} <span class="item-price" id="itemPrice">${item.price}</span></figcaption>
                    <p class="item-desc" id="itemDesc">${item.desc}</p>
                    <button class="btn menu-btn" id="menuBtn" data-id="${item.id}">add to cart</button>
                </figure>`;
            // console.log(product)
            itemDiv.append(product);
        }
    }

    addToCart() {
        // variable & access html nodes
        let buttons = document.querySelectorAll('.menu-btn');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;

        // checkout variables
        // let table = document.getElementById('tbody');
        // let checkout = document.getElementById('checkout')
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let tax = 0;
        let deliveryValue = document.getElementById('deliveryValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let deliveryFee = 6; 
        let total = 0;
        let totalValue = document.getElementById('totalValue');

        // loop through this.menu 
        for (const key in this.menu) {
            const item = this.menu[key];
            buttons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        // console.log(item.id);
                        itemCount++;
                        price+= item.price;
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;

                        item.qty++;
                        // console.log(item);
                        // console.log(this.itemsInCart);

                        subTimesQty = (item.price * item.qty).toFixed(2);
                        // console.log(subTimesQty);
                        tax = this.itemsInCart.subtotal * .07;

                        total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2);

                    }
                    
                    // send back to DOM
                    cartItems.innerText = itemCount;
                    cartSubtotal.innerText = price.toFixed(2);
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                    deliveryValue.innerText = deliveryFee.toFixed(2);
                    
                    taxValue.innerText = tax.toFixed(2)

                    totalValue.innerText = total;
                    
                    if (this.itemsInCart.itemCount == 1) {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    } else {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    }
                })
            })            
        }

    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn');
        const checkoutPage = document.getElementById('checkoutPage');
        const menuSection = document.getElementById('menuSection');
        const table = document.getElementById('tbody');

        let subTimesQty = 0;

        cartBtn.addEventListener('click', ()=> {
            // console.log('clicked')

            if (menuSection.classList.contains('d-none')) return 
            checkoutPage.classList.remove('d-none'); 
            menuSection.classList.add('d-none');        

            for (const key in this.menu) {
                const item = this.menu[key];

                if(item.qty > 0) {
                    // console.log(item.dish)
                    subTimesQty = (item.qty * item.price).toFixed(2);
                    // console.log(item.dish, subTimesQty);
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'item-checkout';

                    tableRow.innerHTML += `
                        <td id="itemImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img">
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                    `;

                    table.append(tableRow);
                }
            }
        })


    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch');
        const checkoutPage = document.getElementById('checkoutPage');
        const menuSection = document.getElementById('menuSection');

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked');

            menuSection.classList.remove('d-none');
            checkoutPage.classList.add('d-none');

            let table = document.getElementById('tbody');
            table.innerHTML = '';
        })

    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmButton');
        const table = document.getElementById('tbody');
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');

        confirmButton.addEventListener('click', ()=> {
            // console.log('clicked');
            this.itemsInCart.itemCount = 0;
            this.itemsInCart.subtotal = 0;

            table.innerHTML = `<h1>Your order is confirmed</h1>`

            cartItems.innerText = this.itemsInCart.itemCount;
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2);

            for (const key in this.menu) {
                const item = this.menu[key];

                item.qty = 0;
            }

        })  
    }


}

let restaurant = new Store();

restaurant.init();