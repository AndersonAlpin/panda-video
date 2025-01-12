<template>
  <v-card
    class="mx-auto cursor-pointer"
    outlined
    elevation="2"
    :style="{ width: '100%' }"
  >
    <div
      class="image-container"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    >
      <Player
        v-if="showPreview"
        :video-player="videoPlayer"
        :controls="false"
      />

      <v-img
        v-if="!showPreview"
        :src="thumbnail"
        height="150"
        :alt="title"
        cover
        class="bg-grey-lighten-2"
      />
    </div>

    <v-card-title class="pa-2 text-left d-flex flex-column">
      <span
        v-if="length"
        class="text-caption"
        style="color: #757575;"
      >
        {{ timeValue }}
      </span>
      <span
        v-tooltip="title"
        class="text-subtitle-2 text-truncate"
        style="font-size: 1.25rem;"
      >
        {{ formattedTitle }}
      </span>
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import Player from '@/components/Player.vue';

const props = defineProps<{
  thumbnail: string;
  title: string;
  length: number;
  videoPlayer: string;
}>();

const showPreview = ref(false);

const removeExtension = (filename: string): string => {
  return filename.replace(/\.[^/.]+$/, '');
};

const formattedTitle = computed(() => {
  return removeExtension(props.title);
});

const timeValue = computed(() => {
  const hours = Math.floor(props.length / 3600);
  const minutes = Math.floor((props.length % 3600) / 60);
  const seconds = Math.floor(props.length % 60);

  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

let hoverTimeout: ReturnType<typeof setTimeout>;

const handleMouseOver = () => {
  hoverTimeout = setTimeout(() => {
    showPreview.value = true;
  }, 1000);
};

const handleMouseLeave = () => {
  clearTimeout(hoverTimeout);
  showPreview.value = false;
};
</script>

<style scoped>
.image-container {
  position: relative;
  height: 150px;
}

.v-card-title {
  padding: 16px;
}
</style>
