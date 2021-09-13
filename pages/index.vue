<template>
  <v-row no-gutters>
    <v-col>
      <v-img
        src="https://c.wallhere.com/photos/f9/c2/house_lake_meadows_autumn_trees_fog-783793.jpg!d"
        gradient="to top left, rgba(0,0,0,.33), rgba(57, 57, 57, 0.3)"
        height="100vh"
      >
        <v-container fill-height>
          <v-col cols="12">
            <v-row no-gutters justify="end">
              <v-card flat width="450" height="550" class="login-card">
                <v-card-text>
                  <div class="login-title">
                    <v-img max-width="200" class="mx-auto" contain src="/images/logo.png"></v-img>
                    <h3>Inicia sesión para continuar</h3>
                  </div>
                  <v-form ref="form" v-model="valid" class="my-8">
                    <v-text-field
                      label="Correo electrónico"
                      v-model="email"
                      :rules="emailRules"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Contraseña"
                      :type="visibility ? 'text' : 'password'"
                      v-model="password"
                      :rules="passwordRules"
                      :append-icon="visibility ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="visibility = !visibility"
                      required
                      outlined
                    ></v-text-field>
                    <p class="body-2 forgot">
                      ¿Olvidaste tu contraseña?
                    </p>
                  </v-form>
                  <v-flex class="text-center">
                  <v-btn
                    height="50"
                    width="200"
                    rounded
                    color="primary"
                    @click="login"
                    >Iniciar Sesión</v-btn
                  >
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-container>
      </v-img>
    </v-col>
  </v-row>
</template>
<script>
// import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "El correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
      ],
      password: "",
      visibility: false,
      passwordRules: [(v) => !!v || "La contraseña es obligatoria"],
    };
  },
  // computed: {
  //   ...mapState({
  //     loading: (state) => state.auth.loading,
  //   }),
  // },
  methods: {
    login() {
      this.$refs.form.validate();
      const payload = { email: this.email, password: this.password };
      this.$router.push('/welcome')
      // if (this.valid) {
      //   this.loginState({ payload });
      // }
    },
    // ...mapActions({
    //   loginState: "auth/login",
    // }),
  },
};
</script>
<style scoped lang="scss">
.login-card {
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.login-title {
  margin-bottom: 40px;
  text-align: center;
  h2 {
    font-size: 35px;
    color: #1ecd96 !important;
    margin-bottom: 15px;
  }
  h3 {
    letter-spacing: 1.04px;
  }
}
.forgot {
  cursor: pointer;
  text-align: right;
}
</style>
