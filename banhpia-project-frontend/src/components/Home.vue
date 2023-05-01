<template>
  <div>
    <AppHeaderVue />
  </div>
  <body>
    <div class="carousel">
      <div id="demo" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
        </ul>

        <!-- The slideshow -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/620banh-pia-bv.jpg" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/slide2.jpg" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/slide3.jpg" alt="" />
          </div>
        </div>

        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#demo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>

    <div class="page row">
      <div class="mt-3 col-md-6">
        <h4 class="mb-3">Sản Phẩm</h4>
        <ProductList
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sản phẩm nào.</p>
      </div>
    </div>
  </body>

  <footer class="footer">
    <div class="grid">
      <div class="grid__row">
        <div class="grid__column-2-4">
          <h3 class="footer__heading">Chăm sóc khách hàng</h3>
          <ul class="footer-list">
            <li class="footer-item">
              <a class="footer-item-link">Trung Tâm Trợ Giúp</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Pía Sóc Trăng Mall</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Hướng Dẫn Mua Hàng</a>
            </li>
          </ul>
        </div>
        <div class="grid__column-2-4">
          <h3 class="footer__heading">Giới thiệu</h3>
          <ul class="footer-list">
            <li class="footer-item">
              <a class="footer-item-link">Giới Thiệu</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Tuyển Dụng</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Điều Khoản</a>
            </li>
          </ul>
        </div>
        <div class="grid__column-2-4">
          <h3 class="footer__heading">Danh mục</h3>
          <ul class="footer-list">
            <li class="footer-item">
              <a class="footer-item-link">Bánh Pía</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Bánh In</a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">Lạp Xưởng</a>
            </li>
          </ul>
        </div>
        <div class="grid__column-2-4">
          <h3 class="footer__heading">Theo dõi</h3>
          <ul class="footer-list">
            <li class="footer-item">
              <a class="footer-item-link">
                <i class="footer-item__icon fa-brands fa-facebook"></i> Facebook
              </a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">
                <i class="footer-item__icon fa-brands fa-instagram"></i>
                Instagram
              </a>
            </li>
            <li class="footer-item">
              <a class="footer-item-link">
                <i class="footer-item__icon fa-brands fa-linkedin"></i> LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div class="grid__column-2-4">
          <h3 class="footer__heading">Vào cửa hàng trên ứng dụng</h3>
          <div class="footer__download">
            <img
              src="../assets/qr_code.png"
              alt="Download QR"
              class="footer__download-qr"
            />
            <div class="footer__download-apps">
              <a href="" class="footer__download-app-link">
                <img
                  src="../assets/google_play.png"
                  alt="Google Play"
                  class="footer__download-app-img"
                />
              </a>
              <a href="" class="footer__download-app-link">
                <img
                  src="../assets/app_store.png"
                  alt="App Store"
                  class="footer__download-app-img"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="grid">
        <div class="grid__row">
          <p class="footer__text">
            &copy; 2023 - Bản quyền thuộc về công ty MTT
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import AppHeaderVue from "./AppHeader.vue";
import ProductList from "../components/Product.vue";
import ProductService from "../services/product.service";

export default {
  name: "HomePage",
  components: {
    AppHeaderVue,
    ProductList,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
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
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
@import "@/assets/footer.css";

/* .carousel-inner img {
    width: 100%;
    
  } */

.carousel-item img {
  height: 500px;
  object-fit: cover;
  display: block;
  width: 1200px;
}

.page {
  float: center;
  max-width: 1200;
}
</style>
