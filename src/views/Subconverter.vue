<template>
  <div>
    <el-row style="margin-top: 10px">
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header">Subscription Converter</div>
          <el-container style="min-height: 800px">
            <el-form :model="form" label-width="150px" style="width: 100%">
              <el-form-item label="定制深度:">
                <el-radio v-model="advanced" label="1">基础模式</el-radio>
                <el-radio v-model="advanced" label="2">进阶模式</el-radio>
              </el-form-item>
              <el-form-item label="订阅链接:">
                <el-input v-model="form.sourceSubUrl"></el-input>
              </el-form-item>
              <el-form-item label="客户端:">
                <el-select v-model="form.clientType" style="width: 100%">
                  <el-option v-for="(v, k) in options.clientTypes" :key="k" :label="k" :value="v"></el-option>
                </el-select>
              </el-form-item>

              <div v-if="advanced === '2'">
                <el-form-item label="IncludeRemarks:">
                  <el-input v-model="form.includeRemarks" />
                </el-form-item>
                <el-form-item label="ExcludeRemarks:">
                  <el-input v-model="form.excludeRemarks" />
                </el-form-item>
                <!-- <el-form-item v-for="(v, k) in options.customBaseRules" :key="k" :label="v + ':'">
                  <el-input :v-model="'options.' + v" />
                </el-form-item>-->
              </div>

              <div style="margin-top: 50px"></div>

              <el-divider content-position="center">
                <i class="el-icon-magic-stick"></i>
              </el-divider>

              <el-form-item label="定制订阅:">
                <el-input class="copy-content" readonly v-model="customSubUrl">
                  <el-button
                    slot="append"
                    v-clipboard:copy="customSubUrl"
                    v-clipboard:success="onCopy"
                    ref="copy-btn"
                  >复制</el-button>
                </el-input>
              </el-form-item>

              <el-form-item label-width="0px" style="margin-top: 40px; text-align: center">
                <el-button type="danger" @click="makeUrl">生成订阅链接</el-button>
                <el-button type="primary" @click="clashInstall">一键导入Clash</el-button>
                <el-button type="primary" @click="surgeInstall">一键导入Surge</el-button>
                <el-button type="danger" @click="setBaseUrl" plain>自定义后端</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "https://api.wcc.best/sub?",
      advanced: "1",

      options: {
        clientTypes: {
          clash: "clash",
          clashr: "clashr",
          surge2: "surge&ver=2",
          surge3: "surge&ver=3",
          surge4: "surge&ver=4",
          quantumult: "quan",
          quantumultx: "quanx",
          surfboard: "surfboard",
          ss: "ss",
          ssr: "ssr",
          ssd: "ssd",
          v2ray: "v2ray"
        },
        customBaseRules: ["ClashBaseRule", "SurgeBaseRule", "SurfboardRuleBase"]
      },
      form: {
        sourceSubUrl: "",
        clientType: "",
        excludeRemarks: "",
        includeRemarks: "",
        ClashBaseRule: "",
        SurgeBaseRule: "",
        SurfboardRuleBase: "",
        rename_node: "",
        ruleset: "",
        clash_proxy_group: ""
      },

      customSubUrl: ""
    };
  },
  created() {
    document.title = "Subscription Converter";
  },
  mounted() {
    this.form.clientType = "clashr";
  },
  methods: {
    onCopy() {
      this.$message.success("Copied!");
    },
    setBaseUrl() {
      this.$notify({
        title: "成功",
        message: "咕咕咕~~~",
        type: "success"
      });
    },
    clashInstall() {
      const url = "clash://install-config?url=";
      window.open(url + encodeURIComponent(this.customSubUrl));
    },
    surgeInstall() {
      const url = "surge://install-config?url=";
      window.open(url + this.customSubUrl);
    },
    makeUrl() {
      if (this.form.sourceSubUrl === "" || this.form.clientType === "") {
        this.$message.error("订阅链接与客户端为必填项");
        return false;
      }

      this.customSubUrl =
        this.baseUrl +
        "target=" +
        this.form.clientType +
        "&url=" +
        encodeURIComponent(this.form.sourceSubUrl);

      if (this.form.excludeRemarks !== "") {
        this.customSubUrl +=
          "&exclude=" + encodeURIComponent(this.form.excludeRemarks);
      }
      if (this.form.includeRemarks !== "") {
        this.customSubUrl +=
          "&include=" + encodeURIComponent(this.form.includeRemarks);
      }

      this.$copyText(this.customSubUrl);
      this.$message.success("定制订阅已复制到剪切板");
    }
  }
};
</script>
