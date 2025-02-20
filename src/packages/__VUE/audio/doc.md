# Audio 组件

### 介绍

用于音频播放

### 安装

```js
import { createApp } from 'vue';
import { Audio } from '@nutui/nutui';

const app = createApp();
app.use(Audio);
```

### 基础用法

:::demo

```vue
<template>
  <nut-audio url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav" :loop="true" type="icon"></nut-audio>
</template>
```

:::

### 语音播放

:::demo

```vue
<template>
  <nut-audio url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav" :loop="false" type="none" ref="audioDemo">
    <div class="nut-voice">
      <div><Voice></Voice></div>
      <div>{{ duration }}"</div>
    </div>
  </nut-audio>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Voice } from '@nutui/icons-vue';
const audioDemo = ref(null);
const duration = ref(0);
onMounted(() => {
  setTimeout(() => {
    duration.value = audioDemo.value.second.toFixed();
  }, 500);
});
</script>

<style>
.nut-voice {
  display: flex;
  justify-content: space-between;
  width: 100px;
  height: 20px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 18px;
}
</style>
```

:::

### 进度条展示

:::demo

```vue
<template>
  <nut-audio url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav" :loop="true" type="progress">
    <div class="nut-audio-operate-group">
      <nut-audio-operate type="back"></nut-audio-operate>
      <nut-audio-operate type="play"></nut-audio-operate>
      <nut-audio-operate type="forward"></nut-audio-operate>
      <nut-audio-operate type="mute"></nut-audio-operate>
    </div>
  </nut-audio>
</template>
```

:::

### 自定义操作按钮

:::demo

```vue
<template>
  <nut-audio
    url="//storage.360buyimg.com/jdcdkh/SMB/VCG231024564.wav"
    :loop="false"
    type="progress"
    @forward="forward"
    @fastBack="fastBack"
    @play="changeStatus"
    @ended="ended"
    @changeProgress="changeProgress"
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
</template>
<script setup>
import { ref } from 'vue';
import { PlayDoubleBack, PlayDoubleForward, PlayStart, PlayStop } from '@nutui/icons-vue';
const playing = ref(false);
const fastBack = () => {
  console.log('倒退');
};
const forward = (progress) => {
  console.log('快进', '当前时间' + progress);
};
const changeStatus = (status) => {
  console.log('当前播放状态', status);
  playing.value = status;
};
const ended = () => {
  console.log('播放结束');
};
const changeProgress = (val) => {
  console.log('改变进度条', val);
};
</script>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 语音播放的连接 | string | `''` |
| muted | 是否静音 | boolean | `false` |
| autoplay | 是否自动播放 | boolean | `false` |
| loop | 是否循环播放 | boolean | `false` |
| preload | 是否预加载语音 | string | `auto` |
| type | 展示形式，可选值：`controls` 控制面板 `progress` 进度条 `icon` 图标 `none` 自定义 | string | `progress` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| fast-back | 触发语音快退 | 返回当前播放时长（单位：毫秒） |
| forward | 触发语音快进 | 返回当前播放时长（单位：毫秒） |
| play | 触发播放/暂停语音 | 返回当前播放状态 |
| ended | 语音播放完成，当 `loop == false` 时生效 | —— |
| mute | 触发静音 | —— |
| change-progress | 当进度条改变时触发 | 返回当前播放时长（单位：毫秒） |
| can-play | 当可以播放媒体文件时触发 | `event: Event` |
