<template>
  <v-app-bar>
    <v-container>
      <v-img
        src="@/assets/logo.png"
        :width="40"
        class="cursor-pointer"
        @click="router.push('/')"
      />
    </v-container>
    <v-spacer />
    <v-menu
      min-width="200px"
      rounded
    >
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-avatar
            v-avatar-initials="user?.name"
            color="brown"
          />
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar
              v-avatar-initials="user?.name"
              color="brown"
            />
            <h3>{{ user?.name }}</h3>
            <p class="text-caption mt-1">
              {{ user?.email }}
            </p>
            <v-divider class="my-3" />
            <v-btn
              variant="text"
              rounded
            >
              Edit Account
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              variant="text"
              rounded
              @click="logout"
            >
              Disconnect
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { User } from '@/interfaces/AuthDef';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();

const user = ref<User | null>(null);

const authStore = useAuthStore();

user.value = authStore.user;

const logout = async () => {
  authStore.logout();
  router.push('/login');
};
</script>