<template>
  <Demo class="calendar_demo">
    <h2>基础用法</h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="state.date ? `${state.date} ${state.dateWeek}` : '请选择'"
        @click="openSwitch('isVisible')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible"
        :default-value="state.date"
        :start-date="`2022-01-11`"
        :end-date="`2022-11-30`"
        @close="closeSwitch('isVisible')"
        @choose="setChooseValue"
      >
      </nut-calendar>
    </div>

    <div>
      <nut-cell
        :show-icon="true"
        title="选择日期区间"
        :desc="state.date1 ? `${state.date1[0]}至${state.date1[1]}` : '请选择'"
        @click="openSwitch('isVisible1')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible1"
        :default-value="state.date1"
        type="range"
        :start-date="`2019-12-22`"
        :end-date="`2021-01-08`"
        @close="closeSwitch('isVisible1')"
        @choose="setChooseValue1"
        @select="select"
      >
      </nut-calendar>
    </div>

    <div>
      <nut-cell
        :show-icon="true"
        title="选择多个日期"
        :desc="state.date7 && state.date7.length ? `已选择${state.date7.length}个日期` : '请选择'"
        @click="openSwitch('isVisible7')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible7"
        :default-value="state.date7"
        type="multiple"
        :start-date="`2022-01-01`"
        :end-date="`2022-09-10`"
        @close="closeSwitch('isVisible7')"
        @choose="setChooseValue7"
      >
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="周选择"
        :desc="state.date9 ? `${state.date9[0]}${'至'}${state.date9[1]}` : '请选择'"
        @click="openSwitch('isVisible9')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible9"
        :default-value="state.date9"
        type="week"
        :start-date="`2019-12-22`"
        :end-date="`2021-01-08`"
        :first-day-of-week="1"
        @close="closeSwitch('isVisible9')"
        @choose="setChooseValue9"
        @select="select"
      >
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义禁用日期"
        :desc="date ? `${date}` : '请选择'"
        @click="openSwitch('isVisible')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="isVisible"
        :default-value="date"
        :start-date="`2022-01-01`"
        :end-date="`2022-11-30`"
        :disabled-date="disabledDate"
        @close="closeSwitch('isVisible')"
        @choose="setChooseValue"
      >
      </nut-calendar>
    </div>

    <h2>快捷选择</h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="state.date3 ? state.date3 : '请选择'"
        @click="openSwitch('isVisible3')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible3"
        :default-value="state.date3"
        :is-auto-back-fill="true"
        @close="closeSwitch('isVisible3')"
        @choose="setChooseValue3"
      >
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择日期范围"
        :desc="state.date4 ? `${state.date4[0]}至${state.date4[1]}` : '请选择'"
        @click="openSwitch('isVisible4')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible4"
        :default-value="state.date4"
        type="range"
        :start-date="`2022-01-01`"
        :end-date="`2022-12-31`"
        :is-auto-back-fill="true"
        @close="closeSwitch('isVisible4')"
        @choose="setChooseValue4"
      >
      </nut-calendar>
    </div>
    <h2>自定义日历</h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义按钮"
        :desc="state.date5 && state.date5[0] ? `${state.date5[0]}至${state.date5[1]}` : '请选择'"
        @click="openSwitch('isVisible5')"
      >
      </nut-cell>
      <nut-calendar
        ref="calendarRef"
        v-model:visible="state.isVisible5"
        :default-value="state.date5"
        type="range"
        @close="closeSwitch('isVisible5')"
        @choose="setChooseValue5"
      >
        <template #btn>
          <view class="wrapper">
            <view class="d_div"> <span class="d_btn" @click="goDate">去某个时间</span></view>
            <view class="d_div"> <span class="d_btn" @click="clickBtn">最近七天</span></view>
            <view class="d_div"> <span class="d_btn" @click="clickBtn1">当月</span></view>
          </view>
        </template>
        <template #day="d">
          <span>{{ d.date.day }}</span>
        </template>
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义时间文案"
        :desc="state.date6 && state.date6[0] ? `${state.date6[0]}至${state.date6[1]}` : '请选择'"
        @click="openSwitch('isVisible6')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible6"
        :default-value="state.date6"
        type="range"
        :start-date="`2022-01-01`"
        :end-date="`2022-12-31`"
        confirm-text="submit"
        start-text="入店"
        end-text="离店"
        title="日期选择"
        @close="closeSwitch('isVisible6')"
        @choose="setChooseValue6"
      >
        <template #day="d">
          <view>{{ d.date.day <= 9 ? '0' + d.date.day : d.date.day }}</view>
        </template>
        <template #bottom-info="d">
          <view class="info">{{ d.date ? (d.date.day == 10 ? '十' : '') : '' }}</view>
        </template>
      </nut-calendar>
    </div>
    <h2>自定义周起始日</h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义周起始日"
        :desc="state.date8 ? `${state.date8}` : '请选择'"
        @click="openSwitch('isVisible8')"
      >
      </nut-cell>
      <nut-calendar
        v-model:visible="state.isVisible8"
        :default-value="state.date8"
        :first-day-of-week="2"
        @close="closeSwitch('isVisible8')"
        @choose="setChooseValue8"
      >
      </nut-calendar>
    </div>
    <h2>平铺展示</h2>
    <div class="test-calendar-wrapper">
      <nut-calendar
        :poppable="false"
        :default-value="state.date2"
        :is-auto-back-fill="true"
        :start-date="`2020-02-01`"
        :end-date="`2020-12-30`"
        @choose="setChooseValue2"
      >
      </nut-calendar>
    </div>
  </Demo>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Utils from '@/packages/utils/date';
import { toRefs } from 'vue';

const calendarRef = ref<any>(null);
const state = reactive({
  isVisible: false,
  date: '2022-02-01',
  dateWeek: '',
  date1: ['2020-01-23', '2020-01-26'],
  date2: '2020-07-08',
  date3: '',
  date4: ['2022-02-23', '2022-04-26'],
  date5: [] as string[],
  date6: [] as string[],
  date7: [] as string[],
  date8: '',
  date9: ['2020-01-23', '2020-01-26'],
  isVisible1: false,
  isVisible2: false,
  isVisible3: false,
  isVisible4: false,
  isVisible5: false,
  isVisible6: false,
  isVisible7: false,
  isVisible8: false,
  isVisible9: false
});
const { isVisible, date } = toRefs(state);
const openSwitch = (param: string) => {
  state[`${param}`] = true;
};

const closeSwitch = (param: string) => {
  state[`${param}`] = false;
};

const setChooseValue = (param: string) => {
  state.date = param[3];
  state.dateWeek = param[4];
};

const select = (param: string) => {
  console.log(param);
};
const setChooseValue1 = (param: string) => {
  state.date1 = [...[param[0][3], param[1][3]]];
};

const setChooseValue2 = (param: string) => {
  state.date2 = param[3];
};

const setChooseValue3 = (param: string) => {
  state.date3 = param[3];
};
const setChooseValue4 = (param: string) => {
  state.date4 = [...[param[0][3], param[1][3]]];
};

const setChooseValue5 = (param: string) => {
  state.date5 = [...[param[0][3], param[1][3]]];
};
const setChooseValue6 = (param: string) => {
  state.date6 = [...[param[0][3], param[1][3]]];
};
const setChooseValue7 = (chooseData: any) => {
  let dateArr = chooseData.map((item: any) => {
    return item[3];
  });
  console.log('changevalue 7 ', chooseData, dateArr);
  state.date7 = [...dateArr];
};
const setChooseValue8 = (param: string) => {
  state.date8 = param[3];
};
const setChooseValue9 = (param: any) => {
  let { weekDate } = param;
  state.date9 = [weekDate[0].date[3], weekDate[1].date[3]];
};
const clickBtn = () => {
  let date = [Utils.date2Str(new Date()), Utils.getDay(6)];
  state.date5 = date;
};
const clickBtn1 = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month + '';
  let yearMonth = `${year}-${month}`;
  let currMonthDays = Utils.getMonthDays(year + '', month + '');
  state.date5 = [`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`];
};
const goDate = () => {
  if (calendarRef.value) {
    var date1 = new Date();
    date1.setDate(date1.getDate() + 30);
    calendarRef.value.scrollToDate(Utils.date2Str(date1));
  }
};
const disabledDate = (date) => {
  const disabledDate = {
    '2022-01-05': true,
    '2022-01-06': true,
    '2022-01-10': true,
    '2022-01-11': true,
    '2022-01-12': true,
    '2022-01-13': true,
    '2022-01-14': true
  };
  return disabledDate[date];
};
</script>

<style lang="scss">
.calendar_demo {
  .nut-cell__value {
    flex: initial;
  }
}

.test-calendar-wrapper {
  display: flex;
  width: 100%;
  height: 560px;
  overflow: hidden;
}

.wrapper {
  display: flex;
  padding: 0 40px;
  justify-content: center;
}

.d_div {
  margin: 0px 5px;

  .d_btn {
    background: #fa3f19;
    color: #fff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    height: 16px;
  }
}

.info {
  font-size: 12px;
  line-height: 14px;
}
</style>
