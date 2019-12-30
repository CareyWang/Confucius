<template>
  <div id="app">
    <el-row style="margin-top: 10px">
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header">Subscription Converter</div>
          <el-container style="min-height: 880px">
            <el-form :model="form" label-width="100px" style="width: 100%">
              <el-form-item label="订阅链接">
                <el-input v-model="form.sourceSubUrl"></el-input>
              </el-form-item>
              <el-form-item label="客户端">
                <el-select v-model="form.clientType" style="width: 100%">
                  <el-option v-for="(v, k) in options.clientTypes" :key="k" :label="k" :value="v"></el-option>
                </el-select>
              </el-form-item>

              <el-divider content-position="center">
                <i class="el-icon-magic-stick"></i>
              </el-divider>

              <el-form-item label="定制订阅">
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
                <el-button type="primary" @click="clashInstall">一键导入Clash</el-button>
                <el-button type="primary" @click="surgeInstall">一键导入Surge</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const baseUrl = "https://api.wcc.best/sub?";

export default {
  data() {
    return {
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
        }
      },
      form: {
        sourceSubUrl: "",
        clientType: "clashr"
      }
    };
  },
  created() {
    document.title = "Subscription Converter";
  },
  methods: {
    onCopy() {
      this.$message.success("Copied!");
    },
    clashInstall() {
      const url = "clash://install-config?url=";
      window.open(url + encodeURIComponent(this.customSubUrl));
    },
    surgeInstall() {
      const url = "surge://install-config?url=";
      window.open(url + this.customSubUrl);
    }
  },
  computed: {
    customSubUrl() {
      return this.form.sourceSubUrl === ""
        ? ""
        : baseUrl +
            "target=" +
            this.form.clientType +
            "&url=" +
            encodeURIComponent(this.form.sourceSubUrl);
    }
  }
};
</script>
