<template>
  <div>
    <k-form-build :value="jsonData" ref="KFB" @submit="handleSubmit" />
    <button @click="getData">提交</button>
  </div>
</template>
<script>
export default {
  name: "Demo",
  data() {
    return {
      jsonData: {
        list: [
          {
            type: "treeSelect",
            label: "树选择器",
            options: {
              disabled: false,
              multiple: false,
              hidden: false,
              clearable: false,
              showSearch: false,
              treeCheckable: false,
              placeholder: "请选择",
              dynamicKey: "",
              dynamic: true,
              options: [
                {
                  value: "1",
                  label: "选项1",
                  children: [{ value: "11", label: "选项11" }],
                },
                {
                  value: "2",
                  label: "选项2",
                  children: [{ value: "22", label: "选项22" }],
                },
              ],
            },
            model: "treeSelect_1627378567777",
            key: "treeSelect_1627378567777",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
          {
            type: "rate",
            label: "评分",
            options: {
              defaultValue: 0,
              max: 5,
              disabled: false,
              hidden: false,
              allowHalf: false,
            },
            model: "rate_1627378569722",
            key: "rate_1627378569722",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
          {
            type: "slider",
            label: "滑动输入条",
            options: {
              width: "100%",
              defaultValue: 0,
              disabled: false,
              hidden: false,
              min: 0,
              max: 100,
              step: 1,
              showInput: false,
            },
            model: "slider_1627378572822",
            key: "slider_1627378572822",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
          {
            type: "radio",
            label: "单选框",
            options: {
              disabled: false,
              hidden: false,
              defaultValue: "",
              dynamicKey: "",
              dynamic: false,
              options: [
                { value: "1", label: "选项1" },
                { value: "2", label: "选项2" },
                { value: "3", label: "选项3" },
              ],
            },
            model: "radio_1627378578905",
            key: "radio_1627378578905",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
          {
            type: "checkbox",
            label: "多选框",
            icon: "icon-duoxuan1",
            options: {
              disabled: false,
              hidden: false,
              defaultValue: [],
              dynamicKey: "",
              dynamic: false,
              options: [
                { value: "1", label: "选项1" },
                { value: "2", label: "选项2" },
                { value: "3", label: "选项3" },
              ],
            },
            model: "checkbox_1627379465101",
            key: "checkbox_1627379465101",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
          {
            type: "grid",
            label: "栅格布局",
            columns: [
              {
                span: 6,
                list: [
                  {
                    type: "number",
                    label: "数字输入框",
                    icon: "icon-number",
                    options: {
                      width: "100%",
                      defaultValue: 0,
                      min: null,
                      max: null,
                      precision: null,
                      step: 1,
                      hidden: false,
                      disabled: false,
                      placeholder: "请输入",
                    },
                    model: "number_1627379469378",
                    key: "number_1627379469378",
                    help: "",
                    rules: [{ required: false, message: "必填项" }],
                  },
                ],
              },
              {
                span: 6,
                list: [
                  {
                    type: "number",
                    label: "数字输入框",
                    icon: "icon-number",
                    options: {
                      width: "100%",
                      defaultValue: 0,
                      min: null,
                      max: null,
                      precision: null,
                      step: 1,
                      hidden: false,
                      disabled: false,
                      placeholder: "请输入",
                    },
                    model: "number_1627379518568",
                    key: "number_1627379518568",
                    help: "",
                    rules: [{ required: false, message: "必填项" }],
                  },
                ],
              },
            ],
            options: { gutter: 20 },
            key: "grid_1627379511550",
          },
          {
            type: "divider",
            label: "分割线",
            options: { orientation: "left" },
            key: "divider_1627370013314",
          },
          {
            type: "table",
            label: "表格布局",
            trs: [
              {
                tds: [
                  {
                    colspan: 1,
                    rowspan: 1,
                    list: [
                      {
                        type: "select",
                        label: "下拉选择器",
                        options: {
                          width: "100%",
                          multiple: false,
                          disabled: false,
                          clearable: false,
                          hidden: false,
                          placeholder: "请选择",
                          dynamicKey: "",
                          dynamic: false,
                          options: [
                            { value: "1", label: "下拉框1" },
                            { value: "2", label: "下拉框2" },
                          ],
                          showSearch: false,
                        },
                        model: "select_1627369992716",
                        key: "select_1627369992716",
                        help: "",
                        rules: [{ required: false, message: "必填项" }],
                      },
                    ],
                  },
                  {
                    colspan: 1,
                    rowspan: 1,
                    list: [
                      {
                        type: "radio",
                        label: "单选框",
                        options: {
                          disabled: false,
                          hidden: false,
                          defaultValue: "",
                          dynamicKey: "",
                          dynamic: false,
                          options: [
                            { value: "1", label: "选项1" },
                            { value: "2", label: "选项2" },
                            { value: "3", label: "选项3" },
                          ],
                        },
                        model: "radio_1627369994549",
                        key: "radio_1627369994549",
                        help: "",
                        rules: [{ required: false, message: "必填项" }],
                      },
                    ],
                  },
                ],
              },
              {
                tds: [
                  {
                    colspan: 1,
                    rowspan: 1,
                    list: [
                      {
                        type: "date",
                        label: "日期选择框",
                        options: {
                          width: "100%",
                          defaultValue: "",
                          rangeDefaultValue: [],
                          range: false,
                          showTime: false,
                          disabled: false,
                          hidden: false,
                          clearable: false,
                          placeholder: "请选择",
                          rangePlaceholder: ["开始时间", "结束时间"],
                          format: "YYYY-MM-DD",
                        },
                        model: "date_1627370009814",
                        key: "date_1627370009814",
                        help: "",
                        rules: [{ required: false, message: "必填项" }],
                      },
                    ],
                  },
                  {
                    colspan: 1,
                    rowspan: 1,
                    list: [
                      {
                        type: "editor",
                        label: "富文本",
                        list: [],
                        options: {
                          height: 300,
                          placeholder: "请输入",
                          defaultValue: "",
                          chinesization: true,
                          hidden: false,
                          disabled: false,
                          showLabel: false,
                          width: "100%",
                        },
                        model: "editor_1627370095336",
                        key: "editor_1627370095336",
                        help: "",
                        rules: [{ required: false, message: "必填项" }],
                      },
                    ],
                  },
                ],
              },
            ],
            options: {
              width: "100%",
              bordered: true,
              bright: false,
              small: true,
              customStyle: "",
            },
            key: "table_1627377135579",
          },
          {
            type: "date",
            label: "日期选择框",
            options: {
              width: "100%",
              defaultValue: "",
              rangeDefaultValue: [],
              range: false,
              showTime: false,
              disabled: false,
              hidden: false,
              clearable: false,
              placeholder: "请选择",
              rangePlaceholder: ["开始时间", "结束时间"],
              format: "YYYY-MM-DD",
            },
            model: "date_1627378566006",
            key: "date_1627378566006",
            help: "",
            rules: [{ required: false, message: "必填项" }],
          },
        ],
        config: {
          layout: "horizontal",
          labelCol: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
          labelWidth: 100,
          labelLayout: "flex",
          wrapperCol: { xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 },
          hideRequiredMark: false,
          customStyle: "",
        },
      },
    };
  },
  methods: {
    handleSubmit(p) {
      // 通过表单提交按钮触发，获取promise对象
      p()
        .then((res) => {
          // 获取数据成功
          alert(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err, "校验失败");
        });
    },
    getData() {
      // 通过函数获取数据
      this.$refs.KFB.getData()
        .then((res) => {
          // 获取数据成功
          alert(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err, "校验失败");
        });
    },
  },
};
</script>