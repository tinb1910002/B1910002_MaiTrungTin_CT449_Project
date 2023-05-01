<template>
  <div class="header">
    <AppHeader />
  </div>

  <div class="page row">
    <div class="col-md-10 mt-3">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-10 justify-content-around align-items-center">
      <!-- <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> -->

      <button class="btn btn-sm btn-success button_add" @click="goToAddProduct">
        <i class="fas fa-plus"></i> Thêm sản phẩm
      </button>

      <button class="btn btn-sm btn-danger" @click="removeAllProducts">
        <i class="fas fa-trash"></i> Xóa tất cả sản phẩm
      </button>
    </div>
    <div class="mt-3 col-md-4">
      <h4>Danh Sách Sản Phẩm</h4>
      <ProductList
        v-if="filteredProductsCount > 0"
        :products="filteredProducts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sản phẩm nào.</p>
    </div>
    <div class="mt-3 col-md-8">
      <div v-if="activeProduct">
        <h4>Chi tiết Sản Phẩm</h4>
        <ProductCard :product="activeProduct" />
        <router-link
          :to="{
            name: 'product.edit',
            params: { id: activeProduct._id },
          }"
        >
          <button class="mt-2 badge-info p-1 product_edit">
            Chỉnh sửa sản phẩm
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ProductCard,
    InputSearch,
    ProductList,
    AppHeader,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
    productStrings() {
      return this.products.map((product) => {
        const { name, des } = product;
        return [name, des].join("");
      });
    },
    // Trả về các product có chứa thông tin cần tìm kiếm.
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },

    async removeAllProducts() {
      if (confirm("Bạn có muốn xóa tất cả Sản Phẩm?")) {
        try {
          await ProductService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddProduct() {
      this.$router.push({ name: "product.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  float: left;
  max-width: 1200px;
}

.product_edit {
  border-radius: 3px;
  border: 1px solid #ccc;
}

.button_add {
  margin-right: 30px;
}

.header {
  max-width: 100%;
}
</style>
