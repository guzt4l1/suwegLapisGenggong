const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

document.addEventListener("alpine:init", () => {
  Alpine.data("offlineProduct", () => ({
    items: [
      // ==== Best Chocolate ====
      { id: 1, name: "Chocolate Original", category: "Best Chocolate", priceBesar: 33000, priceKecil: 23000, img: "chocolate-chococrunch.jpg" },
      { id: 2, name: "Chocolate Cheese", category: "Best Chocolate", priceBesar: 35000, priceKecil: 25000, img: "chocolate-chococrunch.jpg" },
      { id: 3, name: "C. Chococrunch", category: "Best Chocolate", priceBesar: 35000, priceKecil: 25000, img: "chocolate-chococrunch.jpg" },
      { id: 4, name: "Chocolate Greentea", category: "Best Chocolate", priceBesar: 35000, priceKecil: 25000, img: "chocolate-chococrunch.jpg" },
      { id: 5, name: "Chocolate Tiramissu", category: "Best Chocolate", priceBesar: 35000, priceKecil: 25000, img: "chocolate-chococrunch.jpg" },
      { id: 6, name: "C. Milkcrunch", category: "Best Chocolate", priceBesar: 35000, priceKecil: 25000, img: "chocolate-chococrunch.jpg" },

      // ==== Best Pandan ====
      { id: 7, name: "C. Pandan Original", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },
      { id: 8, name: "C. Pandan Cheese", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },
      { id: 9, name: "C. Pandan Crunch", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },
      { id: 10, name: "C. Pandan Greentea", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },
      { id: 11, name: "C. Pandan Tiramissu", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },
      { id: 12, name: "C. Pandan Milk", category: "Best Pandan", priceBesar: 35000, priceKecil: 25000, img: "c-pandan.jpg" },

      // ==== Best Redvelvet ====
      { id: 13, name: "Redvelvet Cheese", category: "Best Redvelvet", priceBesar: 37000, priceKecil: 27000, img: "c-redvelvet.jpg" },
      { id: 14, name: "Redvelvet Tiramissu", category: "Best Redvelvet", priceBesar: 37000, priceKecil: 27000, img: "c-redvelvet.jpg" },
      { id: 15, name: "Redvelvet Crunch", category: "Best Redvelvet", priceBesar: 37000, priceKecil: 27000, img: "c-redvelvet.jpg" },
      { id: 16, name: "Redvelvet Green Tea", category: "Best Redvelvet", priceBesar: 37000, priceKecil: 27000, img: "c-redvelvet.jpg" },
    ],groupedItems: [],
  groupItems() {
    const map = {};
    this.items.forEach(item => {
      if (!map[item.category]) {
        map[item.category] = [];
      }
      map[item.category].push(item);
    });
    this.groupedItems = Object.keys(map).map(cat => ({
      name: cat,
      items: map[cat]
    }));
  }
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    qty: 0,
    add(newItem, size) {
      const price = size === "besar" ? newItem.priceBesar : newItem.priceKecil;
      const idWithSize = `${newItem.id}-${size}`;
      const cartItem = this.items.find((item) => item.id === idWithSize);

      if (!cartItem) {
        this.items.push({
          id: idWithSize,
          name: `${newItem.name} (${size})`,
          img: newItem.img,
          price: price,
          qty: 1,
          total: price
        });
        this.qty++;
        this.total += price;
      } else {
        cartItem.qty++;
        cartItem.total = cartItem.price * cartItem.qty;
        this.qty++;
        this.total += cartItem.price;
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.qty > 1) {
        cartItem.qty--;
        cartItem.total = cartItem.price * cartItem.qty;
        this.qty--;
        this.total -= cartItem.price;
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.qty--;
        this.total -= cartItem.price;
      }
    },
    chekout() {
      const pesanan = this.items.map(
        (item) => `- ${item.name} x${item.qty} @${rupiah(item.price)}`
      );
      const totalHarga = `Total: ${rupiah(this.total)}`;
      const url =
        "https://api.whatsapp.com/send?phone=6282336199884&text=Pesanan%20Anda%0A" +
        pesanan.join("\n") +
        "\n\n" +
        totalHarga +
        "%0AAtas%20Nama:%20[Nama%20Anda]";
      window.open(url);
    },
  });
});

function showItemDetail(item) {
  // Akses properti item (img, name, price, dll)
  console.log("Detail barang:", item.name, item.price);
  this.selectedItem = item; // Set selectedItem dengan objek item
  this.isModalOpen = true; // Tampilkan modal
  itemDetailModal.style.display = "flex";
}

document.addEventListener("click", (e) => {
  // Klik di luar modal
  if (e.target === document.getElementById("item-detail-modal")) {
    this.isModalOpen = false;
  }
});

function close() {
  this.isGatewayOpen = false; // Atur visibilitas gateway ke true
  gateway.style.display = "none";
}
