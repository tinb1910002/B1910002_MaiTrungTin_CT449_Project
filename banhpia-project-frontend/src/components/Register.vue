<template>
  <div class="container">
    <div class="image">
      <img class="logo_login" src="../assets/logobanhpia-trang.jpg" alt="" />
    </div>
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header text-center">
          <h3>Đăng Ký</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="login()">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text justify-content-center">
                  <i class="fa-solid fa-envelope"></i>
                </span>
              </div>
              <input
                type="email"
                class="form-control"
                placeholder="Vui lòng nhập Email"
                @blur="validate()"
                v-model="user.email"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text justify-content-center">
                  <i class="fa-solid fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Vui lòng nhập Mật khẩu"
                @blur="validate()"
                v-model="user.password"
                :class="{ 'is-invalid': errors.password }"
              />
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text justify-content-center">
                  <i class="fa-solid fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Nhập lại mật khẩu"
                @blur="validate()"
                v-model="user.repassword"
                :class="{ 'is-invalid': errors.repassword }"
              />
              <div class="invalid-feedback" v-if="errors.repassword">
                {{ errors.repassword }}
              </div>
            </div>
            <div class="form-group">
              <input type="submit" value="Đăng ký" class="btn login_btn" />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center links">
            <p>
              Bạn đã có tài khoản!
              <router-link to="/">Đăng nhập</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  data() {
    return {
      errors: {
        email: "",
        password: "",
        repassword: "",
      },
      user: {
        email: "",
        password: "",
        repassword: "",
      },
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        email: "",
        password: "",
        repassword: "",
      };
      if (!this.user.email) {
        this.errors.email = "Email là bắt buộc";
        isValid = false;
      }
      if (!this.user.password) {
        this.errors.password = "Mật khẩu là bắt buộc";
        isValid = false;
      }
      if (!this.user.repassword) {
        this.errors.repassword = "Mật khẩu chưa đúng";
        isValid = false;
      }
      return isValid;
    },
    async login() {
      if (this.validate()) {
        try {
          await UserService.create(this.user);
          this.$router.push({ name: "LoginPage" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.image img {
  width: 300px;
  display: block;
  margin: 20px auto;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  width: 350px;
  background-color: rgba(18, 17, 17, 0.2) !important;
}
.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #e8cb76;
}
.social_icon span:hover {
  color: white;
  cursor: pointer;
}
.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}
.input-group-prepend span {
  width: 50px;
  background-color: #e8ecef;
  color: #4c5059;
  border: 0 !important;
}
input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}
.login_btn {
  font-size: 20px;
  font-weight: 600;
  color: black;
  background-color: #ffc312;
  width: 100%;
}
.login_btn:hover {
  color: black;
  background-color: #ffc312;
  opacity: 0.8;
}
.links a {
  margin-left: 4px;
}
</style>
