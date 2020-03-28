if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('thank you for your purchase')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes){
        cartItems.removeChild(cartItems.firstChild)
        updateCartTotall()
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotall();
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotall()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    addItemToCart(title, imageSrc, price)
    updateCartTotall();
}
function addItemToCart(title, imageSrc, price) {
    var cartRow = document.createElement('div');
    cartRow.classList=('cart-row')
    cartRow.innerText = title;
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemsNames=document.getElementsByClassName('cart-item-title')
    for (var i=0 ;i<cartItemsNames.length ;i++){
        if (cartItemsNames[i].innerText==title){
             alert('you have already entered this product')
            return 
        }
    }
    var cartRowContents = `  <div class="cart-item cart-column">
<img class="cart-item-image" src="${imageSrc}" width="300" height="300">
<span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-danger" type="button">REMOVE</button>
</div>
`
cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotall() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var PriceElement = cartRow.getElementsByClassName('cart-price')[0];
        var QuantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(PriceElement.innerText.replace('$', ''));
        var quantity = QuantityElement.value;
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}