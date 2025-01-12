<template>
  <v-row class="video-grid">
    <v-col
      v-for="(video, index) in videos"
      :key="index"
      cols="auto"
    >
      <VideoThumbnail
        :thumbnail="video.thumbnail"
        :title="video.title"
        :length="video.length"
        :video-player="video.video_player"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Video } from '@/interfaces/VideoDef';
import { useVideoStore } from '@/stores/useVideoStore';

const videoStore = useVideoStore();
const videos = ref<Video[]>([]);

const isLoading = ref(false);
const currentPage = ref(1);
const pageSize = 5;
const hasMoreContent = ref(true);

const loadVideos = async (page: number, limit: number) => {
  if (!hasMoreContent.value) return;

  isLoading.value = true;
  await videoStore.fetchAllVideos({ page, limit });
  videos.value = [...videos.value, ...videoStore.getVideos];

  if (videoStore.getVideos.length === 0) {
    hasMoreContent.value = false;
  }
  
  isLoading.value = false;
  checkForMoreContent();
};

const checkForMoreContent = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight - 100 && !isLoading.value && hasMoreContent.value) {
    currentPage.value++;
    loadVideos(currentPage.value, pageSize);
  }
};

onMounted(async () => {
  await loadVideos(currentPage.value, pageSize);
  window.addEventListener('scroll', checkForMoreContent);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkForMoreContent);
});
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  grid-auto-rows: 1fr;
  padding: 30px;
}

.v-card {
  width: 100%;
}
</style>
