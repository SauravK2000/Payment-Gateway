const cursor = document.querySelector(".cursor");
// document.addEventListener("mousemove", (e) => {
//   cursor.setAttribute(
//     "style",
//     "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
//   );
// });
// document.addEventListener("click", () => {
//   cursor.classList.add("expand");
//   setTimeout(() => {
//     cursor.classList.remove("expand");
//   }, 500);
// });
var orderName = ["Order 1", "Order 2","Order 3", "Order 4","Order 5"];
var orderElement = document.querySelectorAll('.product > article > label');
var orderList = document.querySelectorAll('.total-price li > span:first-child');
for (i = 0; i < orderElement.length; i++) {
  orderElement[i].innerHTML = orderName[i];
  orderList[i].innerHTML = orderName[i];
}
var price = [250, 200, 240, 250, 150];
var counter = 0;
var newCounter = 0;
var priceElement = document.querySelectorAll(".price");
var priceList = document.querySelectorAll(".total-price li > span + span");
var totalPrice = document.querySelector(
  ".total-price li:last-child > span + span > b"
);
for (i = 0; i < priceElement.length; i++) {
  priceElement[i].innerHTML = "₹" + price[i];
  priceList[i].innerHTML = "₹" + price[i];
  counter += price[i];
}
totalPrice.innerHTML = "₹" + counter;
totalPrice.className="totalPrice";
function deleteProduct() {
  var a = document.querySelectorAll('input[type="checkbox"]');
  var b = document.querySelectorAll(
    'input[type="checkbox"]:checked + .product '
  );
  var c = document.querySelector(".delete");
  c.classList.add("not-select");
  var d = document.querySelectorAll(".total-price ul li");
  var e = document.querySelectorAll(
    'input[type="checkbox"]:checked ~ section.buy > .total-price ul > li'
  );
  setTimeout(() => {
    c.classList.remove("not-select");
  }, 500);
  for (var i = 0; i < a.length; i++) {
    if (a[i].checked == true) {
      for (var x = 0; x < b.length; x++) {
        b[x].style.height = "200px";
        b[x].style.animation = "remove 1.5s forwards";
        e[i].style.display = "none";
        for (u = 0; u < priceElement.length; u++) {
          price[i] = 0;
          priceElement[u].innerHTML = "₹" + price[u];
          priceList[u].innerHTML = "₹" + price[u];
          newCounter += price[u];
        }
        totalPrice.innerHTML = "₹" + newCounter;
        newCounter = 0;
        delay();
        c.classList.remove("not-select");
      }
    }
  }
  function delay() {
    setTimeout(() => {
      for (var i = 0; i < b.length; i++) b[i].style.display = "none";
    }, 500);
  }
}