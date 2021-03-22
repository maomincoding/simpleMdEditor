<template>
  <div class="main">
    <div class="tools">
      <el-button size="mini" type="primary" @click="drawer = true"
        >工具</el-button
      >
      <el-button size="mini" type="primary" @click="aboutView = true"
        >关于</el-button
      >
      <el-dialog :title="'工具'" :visible.sync="drawer" :append-to-body="true">
        <div class="tool-innter">
          <el-button type="primary" @click="resetInnter" class="htmlbtn"
            >清空内容
          </el-button>
          <el-button type="primary" @click="getHtml" class="htmlbtn"
            >复制HTML
          </el-button>
          <el-button type="primary" @click="getMd" class="mdbtn"
            >复制MarkDown
          </el-button>
          <el-button type="primary" @click="downloadMd" class="downloadbtn"
            >下载MarkDown
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="'关于'"
        :visible.sync="aboutView"
        :append-to-body="true"
      >
        <h3>Simple·MarkDown编辑器</h3>
        <ul class="functionList">
          <li v-for="(item, index) in functionList" :key="index">
            {{ item }}
          </li>
        </ul>
        <h3>作者</h3>
        <ul class="functionList">
          <li v-for="(item, index) in authorList" :key="index">{{ item }}</li>
        </ul>
        <div class="wxcode">
          <img src="../assets/wxcode.jpeg" alt="" />
        </div>
      </el-dialog>
    </div>
    <div id="editor"></div>
  </div>
</template>
<script>
import Editor from "@toast-ui/editor";
import Clipboard from "clipboard";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import downloadBlobAsFile from "../utils/download";

import "highlight.js/styles/github.css"; //https://github.com/highlightjs/highlight.js/tree/master/src/styles
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "@/styles/index.css";
export default {
  components: {},
  data() {
    return {
      editor: null,
      drawer: false,
      aboutView: false,
      initTxt: "",
      functionList: [
        "页面简约",
        "功能实用",
        "本地实时保存",
        "一键清空内容",
        "支持稀土掘金、CSDN、微信公众号、知乎",
        "可复制HTML、MarkDown",
        "可下载MarkDown文件",
      ],
      authorList: [
        "作者：Vam的金豆之路",
        "关注公众号，可获取源码",
        "欢迎关注我的公众号：前端历劫之路",
        "我创建了一个技术交流、文章分享群，群里有很多大厂的前端大佬，关注公众号后，点击下方菜单了解更多即可加我微信，期待你的加入",
      ],
    };
  },
  methods: {
    getHtml() {
      const clipboard = new Clipboard(".htmlbtn", {
        target: () => this.editor.preview.el,
      });
      clipboard.on("success", () => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$message.error("复制失败");
        clipboard.destroy();
      });
    },
    getMd() {
      const clipboard = new Clipboard(".mdbtn", {
        text: () => this.editor.getMarkdown(),
      });
      clipboard.on("success", () => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$message.error("复制失败");
        clipboard.destroy();
      });
    },
    downloadMd() {
      if (this.editor.getMarkdown().trim()) {
        downloadBlobAsFile(this.editor.getMarkdown(), "unnamed.md");
      } else {
        this.$message.error("下载失败");
      }
    },
    useChange() {
      if (window.localStorage) {
        localStorage.setItem("md", this.editor.getMarkdown());
      }
    },
    resetInnter() {
      this.editor.reset();
      this.$message({
        message: "清空成功",
        type: "success",
      });
    },
  },
  created() {
    if (window.localStorage && localStorage.getItem("md")) {
      this.initTxt = localStorage.getItem("md");
    }
  },
  mounted() {
    this.editor = new Editor({
      el: document.getElementById("editor"),
      plugins: [[codeSyntaxHighlight, { hljs }]],
      previewStyle: "vertical",
      height: "100vh",
      initialEditType: "markdown",
      minHeight: "200px",
      initialValue: this.initTxt,
      placeholder: "你想写点什么...",
      language: "zh-CN",
      useCommandShortcut: true,
      useDefaultHTMLSanitizer: true,
      usageStatistics: false,
      hideModeSwitch: true,
      previewHighlight:false,
      viewer: true,
      events: {
        change: this.useChange,
      },
      toolbarItems: [
        "heading",
        "bold",
        "italic",
        "strike",
        "divider",
        "hr",
        "quote",
        "divider",
        "ul",
        "ol",
        "task",
        "indent",
        "outdent",
        "divider",
        "table",
        "image",
        "link",
        "divider",
        "code",
        "codeblock",
      ],
    });
    this.editor.getUI().getToolbar().removeItem("21");
  },
};
</script>
<style scoped>
::v-deep ul li {
  list-style-type: disc !important;
}

::v-deep ol li {
  list-style-type: decimal !important;
}

::v-deep ul li::before,
::v-deep ol li::before {
  content: none;
}
::v-deep .tui-editor-contents h5 {
  margin-top: 20px;
}
::v-deep .tui-editor-contents h4 {
  margin: 30px 0 15px 0;
}
::v-deep .tui-editor-contents h3 {
  margin-top: 35px;
}
::v-deep .tui-editor-contents img {
  margin: 10px 0;
}
::v-deep .tui-editor-contents h2 {
  margin-top: 40px;
}
::v-deep .tui-editor-contents h1 {
  margin-bottom: 30px;
}
::v-deep .tui-editor-contents p > code {
  background-color: #fff5f5;
  color: #ff502c;
}
::v-deep .tui-editor-contents pre {
  width: 100%;
  overflow: auto;
}

::v-deep .tui-editor-contents pre code {
  white-space: inherit;
}

::v-deep .tui-editor-defaultUI {
  border: 0;
}

::v-deep te-toolbar-section {
  position: fixed;
  top: 0;
}

::v-deep .tui-editor-contents .task-list-item::before{
  top:7px;
}
</style>