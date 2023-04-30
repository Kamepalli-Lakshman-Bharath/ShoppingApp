$(document).ready(function () {
  $(".carousel").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
  });
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", (data) => {
    let clothing = $("#clothing-wrapper");
    let accessory = $("#accessories-wrapper");
    for (let i = 0; i < data.length; i++) {
      if (data[i].isAccessory === false) {
        let card = `
        <div class="card" id="${i + 1}"><a href="product.html">
        <img src="${data[i].preview}" alt="${data[i].name}">
        <h4 class="name">${data[i].name}</h4>
        <p class="brand">${data[i].brand}</p>
        <h4 class="price">Rs ${data[i].price}</h4>
        </div></a> 
        `;
        clothing.append(card);
      } else {
        let card = `
        <div class="card" id="${i + 1}"> <a href="product.html"> 
         <img src="${data[i].preview}" alt="${data[i].name}">
         <h4 class="name">${data[i].name}</h4>
         <p class="brand">${data[i].brand}</p>
         <h4 class="price">Rs ${data[i].price}</h4>
        </div></a> 
        `;
        accessory.append(card);
      }
    }

    for (let i = 0; i < $(".card").length; i++) {
      let clickedId = $($(".card")[i]).attr("id");
      $("#" + clickedId).on("click ", () => {
        localStorage.setItem("endpoint", clickedId);
      });
    }
    var endpoint = localStorage.getItem("endpoint");
    $.get(
      `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${endpoint}`,
      (data) => {
        console.log(data);
        let main = $("#product-main");
        let context = `
      <div id="product-container">
       <div class="image-of-product">
         <img id="preview-image" src="${data.photos[0]}" class="pre-img"alt="">
       </div>
       <div class="product-details">
         <h1 class="name"style="font-size:2.8em; font-weight:500;">${data.name}</h1>
         <h2 class="brand">${data.brand}</h2>
         <p class="big-para">Price: Rs <span class="price">${data.price}</span></p>
         <p class="big-para">Description </p>
         <p class="description">${data.description}</p>
         <p class="big-para">Product Preview</p>
         <div class="image-slide"></div>
       </div>
      </div>
      `;

        main.html(context);
        let imgSd = $(".image-slide");
        for (let i = 0; i < data.photos.length; i++) {
          let div = `
         <img src="${data.photos[i]}" alt="photo${i + 1}" id="photo${i + 1}" >
         `;
          imgSd.append(div);

          $(`#photo${i + 1}`).click(() => {
            $(".image-slide img").removeClass("active");
            $(`#photo${i + 1}`).addClass("active");
            $("#preview-image").attr("src", `${data.photos[i]}`);
          });
        }
        $(".product-details").append(
          `<button class="add-to-cart">Add to Cart</button>`
        );
        $("#photo1").addClass("active");
        var cartCount = 0;
        if (localStorage.getItem("cartCount")) {
          cartCount = parseInt(localStorage.getItem("cartCount"));
        }
        let itemcnt = 0;
        $(".add-to-cart").on("click", function () {
          cartCount++;
          itemcnt += 1;
          localStorage.setItem("itemcnt", itemcnt);
          localStorage.setItem("cartCount", cartCount.toString());
          $(".cart-count").text(cartCount);

          localStorage.setItem("totalAmount", itemcnt * parseInt(data.price));
          let totalAmount = localStorage.getItem("totalAmount");
          $(".amount").text(totalAmount);
        });
        let item = localStorage.getItem("itemcnt");
        $(".cart-count").text(cartCount);

        let itemcard = $(".item-container");
        let content = `
        <div class="cart-card">
         <img class="preview-image-cart" src="${data.photos[0]}" alt="">
         <div class="right"> 
           <b style= "font-size:1.2em;">${data.name}</b>
           <p>X${item}</p>
           <p>Amount Rs ${data.price}</p>
         </div>
        </div>
       
        `;
        localStorage.setItem("itemdetails", content);
        let itemDetails = localStorage.getItem("itemdetails");
        itemcard.html(itemcard.html() + itemDetails);

        let totalAmount = localStorage.getItem("totalAmount");
        $(".amount").text(totalAmount);
      }
    );
  });
});
