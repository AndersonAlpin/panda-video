<template>
  <v-app>
    <v-container
      class="d-flex justify-center align-center"
      height="100vh"
    >
      <v-card
        width="400"
        class="pa-5"
      >
        <v-img
          src="@/assets/logo.png"
          :width="50"
          class="mx-auto mt-5 mb-5"
        />
        <v-card-text>
          <v-form
            ref="formRef"
            v-model="isValid"
            class="mb-5"
          >
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              :rules="emailRules"
              validate-on="blur"
              class="mb-5"
              @focus="errorMessage = ''"
            />
            <v-text-field
              v-model="password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              validate-on-blur
              @focus="errorMessage = ''"
              @click:append-inner="togglePasswordVisibility"
            />

            <span
              class="text-center text-sm red--text mt-1 d-block mb-5 text-error"
              style="height: 16px;"
            >
              <span v-if="errorMessage">* {{ errorMessage }}</span>
            </span>

            <v-btn 
              block
              color="primary"
              height="50"
              :loading="isLoading"
              :disabled="isLoading"
              @click="handleLogin"
            >
              <template #default>
                Entrar
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  color="white"
                  size="24"
                  class="ml-2"
                />
              </template>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import ApiService from '@/services/ApiService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

definePage({
  meta: {
    layout: "emptyLayout",
  },
});

const router = useRouter();
const authStore = useAuthStore();

const email = ref("admin@gmail.com");
const password = ref("1234");
const showPassword = ref(false);
const isValid = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const emailRules = [
  (v: string) => !!v || "E-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
];

const passwordRules = [
  (v: string) => !!v || "Senha é obrigatória",
]

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}

const handleLogin = async () => {
  if (isValid.value) {
    isLoading.value = true;
    try {
      await authStore.login(email.value, password.value);
      router.push('/');
    } catch (error) {
      const errorData = ApiService.getError(error);
      
      if (errorData.statusCode === 401) {
        errorMessage.value = 'E-mail ou senha inválidos';
      } else {
        errorMessage.value = 'Algo deu errado. Tente novamente mais tarde.';
      }
    }
  }

  isLoading.value = false;
}
</script>

<style lang="scss" scoped></style>
