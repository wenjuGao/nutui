<template>
  <div class="demo">
    <h2>{{ translate('basic') }}</h2>
    <nut-audio
      style="margin-left: 20px"
      url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav"
      :muted="muted"
      :autoplay="autoplay"
      :loop="true"
      type="icon"
    ></nut-audio>

    <h2>{{ translate('voicePlay') }}</h2>
    <nut-audio
      ref="audioDemo"
      style="margin-left: 20px"
      url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav"
      :muted="muted"
      :autoplay="autoplay"
      :loop="false"
      type="none"
      @can-play="onCanplay"
    >
      <div class="nut-voice">
        <Voice></Voice>
        <div>{{ duration }}"</div>
      </div>
    </nut-audio>

    <h2>{{ translate('progress') }}</h2>
    <nut-audio
      style="margin-left: 20px"
      url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav"
      :muted="muted"
      :autoplay="autoplay"
      :loop="true"
      type="progress"
    >
      <div class="nut-audio-operate-group">
        <nut-audio-operate type="back"></nut-audio-operate>
        <nut-audio-operate type="play"></nut-audio-operate>
        <nut-audio-operate type="forward"></nut-audio-operate>
        <nut-audio-operate type="mute"></nut-audio-operate>
      </div>
    </nut-audio>

    <h2>{{ translate('customControl') }}</h2>
    <nut-audio
      style="margin-left: 20px"
      url="http://storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav"
      :muted="muted"
      :autoplay="autoplay"
      :loop="false"
      type="progress"
      @forward="forward"
      @fast-back="fastBack"
      @play="changeStatus"
      @ended="ended"
      @change-progress="changeProgress"
    >
      <div class="nut-audio-operate-group">
        <nut-audio-operate type="back">
          <PlayDoubleBack width="35px" height="35px"></PlayDoubleBack>
        </nut-audio-operate>
        <nut-audio-operate type="play">
          <PlayStart v-if="!playing" width="35px" height="35px"></PlayStart>
          <PlayStop v-else width="35px" height="35px"></PlayStop>
        </nut-audio-operate>
        <nut-audio-operate type="forward">
          <PlayDoubleForward width="35px" height="35px"></PlayDoubleForward>
        </nut-audio-operate>
      </div>
    </nut-audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTranslate } from '@/sites/assets/util/useTranslate';
import { PlayDoubleBack, PlayDoubleForward, PlayStart, PlayStop, Voice } from '@nutui/icons-vue';
const translate = useTranslate({
  'zh-CN': {
    basic: '基础用法',
    voicePlay: '语音播放',
    progress: '进度条展示',
    customControl: '自定义操作按钮'
  },
  'en-US': {
    basic: 'Basic Usage',
    voicePlay: 'Voice Playing',
    progress: 'Progress',
    customControl: 'Custom Control'
  }
});

const audioDemo = ref({
  second: 0
});
const playing = ref(false);
const duration = ref<string>('');
const muted = ref(false);
const autoplay = ref(false);

const fastBack = () => {
  console.log('倒退');
};

const forward = (progress: number) => {
  console.log('快进', '当前时间' + progress);
};

const changeStatus = (status: boolean) => {
  console.log('当前播放状态', status);
  playing.value = status;
};

const ended = () => {
  console.log('播放结束');
};

const changeProgress = (val: number) => {
  console.log('改变进度条', val);
};

const onCanplay = (e: Event) => {
  duration.value = audioDemo.value.second.toFixed();
  console.log(e, duration.value);
};

onMounted(() => {
  console.log(audioDemo.value);
});
</script>
<style lang="scss" scoped>
.nut-theme-dark {
  .demo {
    .nut-voice {
      background: $dark-color;
      border: 1px solid $dark-color;
      border-radius: 18px;
    }

    .nut-audio-operate {
      color: $dark-color;
    }
  }
}

.demo {
  .nut-voice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    height: 20px;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 18px;
  }

  :deep(svg.nut-icon-am-rotate) {
    --animate-duration: 1s !important;
    --animate-delay: 0s;
  }
}
</style>
