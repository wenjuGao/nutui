<template>
  <view ref="nutCollapseRef" class="nut-collapse">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { PropType, provide, ref, watch } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { COLLAPSE_KEY } from './types';
const { create } = createComponent('collapse');
export default create({
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: ''
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const nutCollapseRef = ref(null);
    const innerValue = ref(props.modelValue || (props.accordion ? '' : []));

    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val;
      }
    );

    const changeVal = (val: string | number | Array<string | number>, name: string | number, status = true) => {
      innerValue.value = val;
      emit('update:modelValue', val);
      emit('change', val, name, status);
    };

    const updateVal = (name: string | number) => {
      if (props.accordion) {
        if (innerValue.value === name) {
          changeVal('', name, false);
        } else {
          changeVal(name, name, true);
        }
      } else {
        if (Array.isArray(innerValue.value)) {
          if (innerValue.value.includes(name)) {
            const newValue = innerValue.value.filter((v: string | number) => v !== name);
            changeVal(newValue, name, false);
          } else {
            const newValue = innerValue.value.concat([name]);
            changeVal(newValue, name, true);
          }
        } else {
          console.warn('[NutUI] <Collapse> 未开启手风琴模式时 v-model 应为数组');
        }
      }
    };

    const isExpanded = (name: string | number) => {
      if (props.accordion) {
        return innerValue.value === name;
      } else if (Array.isArray(innerValue.value)) {
        return innerValue.value.includes(name);
      }
      return false;
    };

    provide(COLLAPSE_KEY, {
      updateVal,
      isExpanded
    });

    return { nutCollapseRef };
  }
});
</script>
