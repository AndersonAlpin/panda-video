<template>
  <div class="video-preview">
    <iframe
      id="panda-player"
      :src="computedVideoPlayer"
      style="border: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  videoPlayer: {
    type: String,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  muted: {
    type: Boolean,
    default: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  mutedIndicator: {
    type: Boolean,
    default: true,
  },
  saveProgress: {
    type: Boolean,
    default: true,
  },
});

const computedVideoPlayer = computed(() => {
  const url = new URL(props.videoPlayer);
  
  url.searchParams.set('autoplay', props.autoplay ? 'true' : 'false');
  url.searchParams.set('muted', props.muted ? 'true' : 'false');
  url.searchParams.set('mutedIndicatorIcon', props.mutedIndicator ? 'true' : 'false');
  url.searchParams.set('saveProgress', props.saveProgress ? 'true' : 'false');

  if (!props.controls) {
    url.searchParams.set('controls', 'false');
  }

  return url.toString();
});
</script>

<style scoped>
.video-preview {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
