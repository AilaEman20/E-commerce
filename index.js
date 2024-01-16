let about = document.getElementById("about");
let blogs = document.getElementById("blogs");
let contacts  = document.getElementById("contacts");

about.addEventListener("click", function(){
  about.style.color="gray";
  blogs.style.color="black";
  contacts.style.color="black";
})

blogs.addEventListener("click", function(){
  blogs.style.color="gray";
  about.style.color="black";
  contacts.style.color="black";
})

contacts.addEventListener("click", function(){
 contacts.style.color="gray";
  about.style.color="black";
  blogs.style.color="black";
})


document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  const navLinks = document.querySelectorAll("nav ul li a");
  const searchResultsContainer = document.getElementById("search-results");

  searchButton.addEventListener("click", function (event) {
      event.preventDefault();
      const searchText = searchInput.value.toLowerCase();
      filterAndDisplay(searchText);
  });

  function filterAndDisplay(query) {
      const matchingLinks = [];
      for (const link of navLinks) {
          const linkText = link.textContent.toLowerCase();
          if (linkText.includes(query)) {
              matchingLinks.push(link);
              link.style.fontWeight = "bold"; // Highlight matching links
          } else {
              link.style.fontWeight = "normal"; // Reset non-matching links
          }
      }
      
      displaySearchResults(matchingLinks);
  }

  function displaySearchResults(results) {
      searchResultsContainer.innerHTML = ""; // Clear previous results

      if (results.length === 0) {
          searchResultsContainer.textContent = "No results found.";
          return;
      }

      const resultList = document.createElement("ul");
      results.forEach(result => {
          const listItem = document.createElement("li");
          listItem.textContent = result.textContent;
          resultList.appendChild(listItem);
      });

      searchResultsContainer.appendChild(resultList);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const orderButton = document.getElementById("orderBtn");

  orderButton.addEventListener('click', function (event) {
      event.preventDefault();
      const name = document.getElementById("nameInput").value;
      const number = document.getElementById("numberInput").value;
      const order = document.getElementById("orderInput").value;
      const address = document.getElementById("addressInput").value;

      // You can perform further actions here, such as sending the order to a server or displaying a confirmation message
      const orderDetails = {
          name: name,
          number: number,
          order: order,
          address: address
      };

  
      console.log(orderDetails)
  });
});

//----------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.gallary-btn');
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    let totalAmount = 0;
    let cartItems=[];
        

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productBox = event.target.closest('.pro');
        const productName = productBox.querySelector('.des span').textContent;
        const productPrice = parseFloat(productBox.querySelector('.des h4').textContent.replace('RS.', ''));
    

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-box');
        cartItem.innerHTML = `
            <img src="${productBox.querySelector('img').src}" class="cart-img" height="280px">
            <div class="detail-box">
                <div class="cart-product-title">${productName}</div>
                <div class="cart-price">RS.${productPrice.toFixed(2)}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-xmark cart-remove"></i>
        `;
        cartContent.appendChild(cartItem);
        totalAmount += productPrice;
        updateTotalPrice();

        const removeButton = cartItem.querySelector('.cart-remove');
        removeButton.addEventListener('click', removeFromCart);

        const quantityInput = cartItem.querySelector('.cart-quantity');
        quantityInput.addEventListener('input', updateCartItemTotal);


    }

    function removeFromCart(event) {
        const cartItem = event.target.closest('.cart-box');
        const cartPrice = parseFloat(cartItem.querySelector('.cart-price').textContent.replace('RS.', ''));
        totalAmount -= cartPrice;
        updateTotalPrice();
        cartItem.remove();
        const productName = cartItem.querySelector('.cart-product-title').textContent;
        const itemIndex = cartItems.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
        }
    }

    function updateCartItemTotal(event) {
            const quantity = parseInt(event.target.value);
            const cartItem = event.target.closest('.cart-box');
            const cartPrice = parseFloat(cartItem.querySelector('.cart-price').textContent.replace('RS.', ''));
    
            const newCartPrice = quantity * cartPrice;
            totalAmount += newCartPrice - cartPrice;
            cartItem.querySelector('.cart-price').textContent = `RS.${newCartPrice.toFixed(3)}`;
            updateTotalPrice();
    }

    function updateTotalPrice() {
        totalPriceElement.textContent = `RS.${totalAmount.toFixed(2)}`;
    }

    const cartIcon = document.querySelector('#cart-icon');
    const closeCartIcon = document.querySelector('#close-cart');
    const buyNowButton = document.querySelector('.btn-buy');
    const cart= document.querySelector('.cart')

    cartIcon.addEventListener('click', openCart);
    closeCartIcon.addEventListener('click', closeCart);
    buyNowButton.addEventListener('click', buyNow);

    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
    });

function openCart() {
    cart.style.display = 'block';
}

function closeCart() {
    cart.style.display = 'none';
}

function buyNow() {
    if (totalAmount === 0) {
        alert('Your Cart is Empty!');
    } 
    else {
        alert('Your order has been successful! Thank you for shopping with us.');
        closeCart();
    }
}
})