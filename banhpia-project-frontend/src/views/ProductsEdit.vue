<template>
  <div>
    <AppHeaderVue />
  </div>
  <div v-if="product" class="page">
    <h4 v-if="product._id" class="text-center mt-3">Hiệu chỉnh Sản phẩm</h4>
    <h4 v-if="!product._id" class="text-center mt-3">Thêm Sản Phẩm</h4>
    <ProductForm
      :product="product"
      @submit:product="updateProduct"
      @delete:product="deleteProduct"
      @add:product="addProduct"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import AppHeaderVue from "../components/AppHeader.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";
export default {
  components: {
    ProductForm,
    AppHeaderVue,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      product: null,
      message: "",
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.product = await ProductService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateProduct(data) {
      try {
        await ProductService.update(this.product._id, data);
        this.message = "Sản phẩm được cập nhật thành công.";
        this.$router.push({ name: "productbook" });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct() {
      if (confirm("Bạn muốn xóa Sản phẩm này?")) {
        try {
          await ProductService.delete(this.product._id);
          this.$router.push({ name: "productbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async addProduct(data) {
      try {
        if (
          data.name === "" ||
          data.img === "" ||
          data.price === "" ||
          data.des === ""
        ) {
          alert("Bạn phải nhập hết tất cả các trường");
        }
        await ProductService.create(data);
        this.message = "Thêm mới sản phẩm thành công.";
        this.$router.push({ name: "productbook" });
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    if (this.id) {
      this.getProduct(this.id);
      this.message = "";
    } else if (!this.id) {
      this.product = {
        name: "",
        img: "",
        price: "",
        des: "",
      };
    }
  },
};
</script>
