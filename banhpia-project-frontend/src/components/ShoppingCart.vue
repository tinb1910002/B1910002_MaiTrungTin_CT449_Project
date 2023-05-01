<template>
  <div>
    <AppHeaderVue />
  </div>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h4 class="text-right">
            Tổng số tiền:
            {{ `${totalMoney().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Đồng` }}
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <table class="table table-borderd table-striped">
            <thead>
              <th>STT</th>
              <th>Hình đại diện</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xoa</th>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in products"
                :key="product._id"
                :class="{ active: index === activeIndex }"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    :src="product.img"
                    alt=""
                    class="product-item-in-cart-img"
                  />
                </td>
                <td>{{ product.name }}</td>
                <td class="text-right">
                  {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} Đồng
                </td>
                <td class="text-right">{{ product.amount }}</td>
                <td class="text-right">
                  {{
                    `${product.price * product.amount}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )
                  }}
                  Đồng
                </td>
                <td>
                  <button
                    v-if="product._id"
                    type="button"
                    class="ml-2 btn btn-danger"
                    @click="deleteProduct(index)"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
            <!-- <tfoot>
                <tr>
                  <td colspan="5" class="text-right">Tổng tiền:</td>
                  <td class="text-right font-weight-bold">
                    {{ getTotalAmount }}
                  </td>
                </tr>
              </tfoot> -->
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeaderVue from "./AppHeader.vue";
export default {
  components: {
    AppHeaderVue,
  },
  name: "ShoppingCart",
  data() {
    return {
      products: [],
    };
  },

  methods: {
    deleteProduct(index) {
      const filteredProducts = this.products.filter(
        (product) => product._id !== this.products[index]._id
      );
      this.products = filteredProducts;
      const saveobject = JSON.stringify(filteredProducts);
      localStorage.setItem("cart", saveobject);
    },
    totalMoney() {
      let total = 0;
      for (let i = 0; i < this.products.length; i++) {
        total += this.products[i].price * this.products[i].amount;
      }
      console.log(total);
      return `${total}`;
    },
  },
  mounted() {
    const listLoalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    this.products = listLoalCart;
  },
};
</script>

<style scoped>
.product-item-in-cart-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>
