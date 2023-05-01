<template>
  <div class="row product_row">
    <div
      class="list-group-item"
      v-for="(product, index) in products"
      :key="product._id"
      :class="{ active: index === activeIndex }"
    >
      <div class="product_img">
        <img :src="product.img" alt="" />
      </div>
      <div class="product_name">
        {{ product.name }}
      </div>
      <div>
        <div class="product_price">
          {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} Đồng
        </div>
        <button class="btn_cart" @click="addProductToCart(index)">
          Thêm vào giỏ hàng
        </button>
      </div>

      <div class="product_text">
        {{ product.des }}
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderVue from "./AppHeader.vue";

export default {
  name: "ProductPage",
  components: {
    AppHeaderVue,
  },
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  methods: {
    async addProductToCart(index) {
      console.log(this.products);
      const saveLocalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      for (const item of saveLocalCart) {
        if (item._id === this.products[index]._id) {
          item.amount++;
          const saveobject = JSON.stringify(saveLocalCart);
          localStorage.setItem("cart", saveobject);
          alert("Giỏ hàng đã được cập nhật");
          return;
        }
      }
      const temp = {
        _id: this.products[index]._id,
        name: this.products[index].name,
        img: this.products[index].img,
        price: this.products[index].price,
        des: this.products[index].des,
        amount: 1,
      };
      console.log(temp);
      saveLocalCart.push(temp);
      const saveobject = JSON.stringify(saveLocalCart);
      localStorage.setItem("cart", saveobject);
      alert("Sản phẩm vừa được thêm vào giỏ hàng");
    },
  },
};
</script>

<style>
.product_row {
  width: 1200px;
}

.list-group-item {
  width: 280px;
  border: 1px solid #ccc;
  margin: 10px 3px;
}

.list-group-item + .list-group-item {
  border: 1px solid #ccc;
}

.product_name {
  text-align: center;
  color: teal;
  font-size: 20px;
  font-weight: bold;
}

.product_price {
  color: orangered;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.btn_cart {
  margin-left: 48px;
}

.btn_cart:hover {
  background: orange;
  color: #fff;
}

.product_img img {
  height: 180px;
  object-fit: cover;
  display: block;
  width: 100%;
}

.header {
  max-width: 1200px;
}
</style>
