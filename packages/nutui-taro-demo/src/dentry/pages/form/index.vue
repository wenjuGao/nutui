<template>
  <Demo class="full">
    <h2>基础用法</h2>
    <nut-form>
      <nut-form-item label="姓名">
        <nut-input v-model="basicData.name" class="nut-input-text" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="年龄">
        <nut-input v-model="basicData.age" class="nut-input-text" placeholder="请输入年龄" type="text" />
      </nut-form-item>
      <nut-form-item label="联系电话">
        <nut-input v-model="basicData.tel" class="nut-input-text" placeholder="请输入联系电话" type="text" />
      </nut-form-item>
      <nut-form-item label="地址">
        <nut-input v-model="basicData.address" class="nut-input-text" placeholder="请输入地址" type="text" />
      </nut-form-item>
      <nut-form-item label="备注">
        <nut-textarea placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
    <h2>动态表单</h2>
    <nut-form ref="dynamicRefForm" :model-value="dynamicForm.state">
      <nut-form-item label="姓名" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">
        <nut-input v-model="dynamicForm.state.name" class="nut-input-text" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item
        v-for="(item, index) in dynamicForm.state.tels"
        :key="item.key"
        :label="'联系方式' + index"
        :prop="'tels.' + index + '.value'"
        required
        :rules="[{ required: true, message: '请填写联系方式' + index }]"
      >
        <nut-input v-model="item.value" class="nut-input-text" :placeholder="'请输入联系方式' + index" type="text" />
      </nut-form-item>
      <nut-cell>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit"
          >提交
        </nut-button>
        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>
    <h2>表单校验</h2>
    <nut-form
      ref="ruleForm"
      :model-value="formData"
      :rules="{
        name: [
          { required: true, message: '请填写姓名' },
          {
            message: 'Name should be at least two characters',
            validator: nameLengthValidator
          }
        ]
      }"
    >
      <nut-form-item label="姓名" prop="name">
        <nut-input
          v-model="formData.name"
          class="nut-input-text"
          placeholder="请输入姓名，blur 事件校验"
          type="text"
          @blur="customBlurValidate('name')"
        />
      </nut-form-item>
      <nut-form-item
        label="年龄"
        prop="age"
        required
        :rules="[
          { required: true, message: '请填写年龄' },
          { validator: customValidator, message: '必须输入数字' },
          { validator: customRulePropValidator, message: '必须输入数字', reg: /^\d+$/ },
          { regex: /^(\d{1,2}|1\d{2}|200)$/, message: '必须输入0-200区间' }
        ]"
      >
        <nut-input
          v-model="formData.age"
          class="nut-input-text"
          placeholder="请输入年龄，必须数字且0-200区间"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="联系电话"
        prop="tel"
        required
        :rules="[
          { required: true, message: '请填写联系电话' },
          { validator: asyncValidator, message: '电话格式不正确' }
        ]"
      >
        <nut-input
          v-model="formData.tel"
          class="nut-input-text"
          placeholder="请输入联系电话，异步校验电话格式"
          type="text"
        />
      </nut-form-item>
      <nut-form-item label="地址" prop="address" required :rules="[{ required: true, message: '请填写地址' }]">
        <nut-input v-model="formData.address" class="nut-input-text" placeholder="请输入地址" type="text" />
      </nut-form-item>
      <nut-cell>
        <nut-button type="primary" size="small" style="margin-right: 10px" @click="submit">提交</nut-button>
        <nut-button size="small" @click="reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>
    <h2>表单类型</h2>
    <nut-form>
      <nut-form-item label="开关">
        <nut-switch v-model="formData2.switch"></nut-switch>
      </nut-form-item>
      <nut-form-item label="复选框">
        <nut-checkbox v-model="formData2.checkbox">复选框</nut-checkbox>
      </nut-form-item>
      <nut-form-item label="单选按钮">
        <nut-radio-group v-model="formData2.radio" direction="horizontal">
          <nut-radio label="1">选项1</nut-radio>
          <nut-radio disabled label="2">选项2</nut-radio>
          <nut-radio label="3">选项3</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="评分">
        <nut-rate v-model="formData2.rate" />
      </nut-form-item>
      <nut-form-item label="步进器">
        <nut-input-number v-model="formData2.number" />
      </nut-form-item>
      <nut-form-item label="滑块">
        <nut-range v-model="formData2.range" hidden-tag></nut-range>
      </nut-form-item>
      <nut-form-item label="文件上传">
        <nut-uploader
          v-model:file-list="formData2.defaultFileList"
          url="http://服务地址"
          accept="image/*"
          maximum="3"
          multiple
        >
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="地址">
        <nut-input
          v-model="formData2.address"
          class="nut-input-text"
          readonly
          placeholder="请选择地址"
          type="text"
          @click="addressModule.methods.show"
        />
        <!-- nut-address -->
        <nut-address
          v-model:visible="addressModule.state.show"
          :province="addressModule.state.province"
          :city="addressModule.state.city"
          :country="addressModule.state.country"
          :town="addressModule.state.town"
          custom-address-title="请选择所在地区"
          @change="addressModule.methods.onChange"
        ></nut-address>
      </nut-form-item>
    </nut-form>
    <h2>自定义labe位置</h2>
    <nut-form label-position="top" star-position="right">
      <nut-form-item label="姓名" required>
        <nut-input v-model="basicData.name" class="nut-input-text" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="年龄" required>
        <nut-input v-model="basicData.age" class="nut-input-text" placeholder="请输入年龄" type="text" />
      </nut-form-item>
      <nut-form-item label-position="left" label="备注">
        <nut-textarea placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
  </Demo>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormItemRuleWithoutValidator } from '@/packages/__VUE/formitem/types';

const formData = reactive({
  name: '',
  age: '',
  tel: '',
  address: ''
});
const basicData = reactive({
  name: '',
  age: '',
  tel: '',
  address: ''
});
const dynamicRefForm = ref<any>(null);
const dynamicForm = {
  state: reactive({
    name: '',
    tels: new Array({
      key: 1,
      value: ''
    })
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          console.log('error submit!!', errors);
        }
      });
    },
    reset() {
      dynamicRefForm.value.reset();
    },
    remove() {
      dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
    },
    add() {
      dynamicForm.state.tels.push({
        key: Date.now(),
        value: ''
      });
    }
  }
};

const formData2 = reactive({
  switch: false,
  checkbox: false,
  radio: 0,
  number: 0,
  rate: 3,
  range: 30,
  address: '',
  defaultFileList: [
    {
      name: '文件1.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'success',
      message: '上传成功',
      type: 'image'
    },
    {
      name: '文件2.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'uploading',
      message: '上传中...',
      type: 'image'
    }
  ]
});

const addressModule = reactive({
  state: {
    show: false,
    province: [
      { id: 1, name: '北京' },
      { id: 2, name: '广西' },
      { id: 3, name: '江西' },
      { id: 4, name: '四川' }
    ],
    city: [
      { id: 7, name: '朝阳区' },
      { id: 8, name: '崇文区' },
      { id: 9, name: '昌平区' },
      { id: 6, name: '石景山区' }
    ],
    country: [
      { id: 3, name: '八里庄街道' },
      { id: 9, name: '北苑' },
      { id: 4, name: '常营乡' }
    ],
    town: []
  },
  methods: {
    show() {
      addressModule.state.show = !addressModule.state.show;
      if (addressModule.state.show) {
        formData2.address = '';
      }
    },
    onChange({ next, value }: any) {
      formData2.address += value.name;
      const name = addressModule.state[next];
      if (name.length < 1) {
        addressModule.state.show = false;
      }
    }
  }
});

const ruleForm = ref<any>(null);

const submit = () => {
  ruleForm.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      console.log('success', formData);
    } else {
      console.log('error submit!!', errors);
    }
  });
};
const reset = () => {
  ruleForm.value.reset();
};
// 失去焦点校验
const customBlurValidate = (prop: string) => {
  ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
    if (valid) {
      console.log('success', formData);
    } else {
      console.log('error submit!!', errors);
    }
  });
};
// 函数校验
const customValidator = (val: string) => {
  if (/^\d+$/.test(val)) {
    return Promise.resolve();
  } else {
    return Promise.reject('必须输入数字');
  }
};
const customRulePropValidator = (val: string, rule: FormItemRuleWithoutValidator) => {
  if ((rule?.reg as RegExp).test(val)) {
    return Promise.resolve();
  } else {
    return Promise.reject('必须输入数字');
  }
};
const nameLengthValidator = (val: string) => {
  if (val.length > 2) {
    return Promise.resolve();
  } else {
    return Promise.reject('名称两个字以上');
  }
};
// Promise 异步校验
const asyncValidator = (val: string) => {
  const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/;
  return new Promise((resolve, reject) => {
    console.log('模拟异步验证中...');
    setTimeout(() => {
      console.log('验证完成');
      if (!val) {
        reject('请输入联系电话');
      } else if (!telReg.test(val)) {
        reject('联系电话格式不正确');
      } else {
        resolve('');
      }
    }, 1000);
  });
};
</script>
