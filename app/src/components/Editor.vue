<template>
  <div class="main">
    <div class="tools">
      <el-button
          size="mini"
          type="primary"
          @click="drawer = true"
      >实用工具</el-button>
      <el-dialog
          :title="'实用工具'"
          :visible.sync="drawer"
          :append-to-body="true"
      >
        <div class="tool-innter">
          <el-button type="primary" @click="getHtml" class="htmlbtn"
          >复制HTML
          </el-button
          >
          <el-button type="primary" @click="getMd" class="mdbtn"
          >复制MarkDown
          </el-button
          >
          <el-button type="primary" @click="downloadMd" class="downloadbtn"
          >下载MarkDown
          </el-button
          >
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
import '@toast-ui/editor/dist/i18n/zh-cn.js';
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
      drawer: false
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
  },
  mounted() {
    this.editor = new Editor({
      el: document.getElementById("editor"),
      plugins: [[codeSyntaxHighlight, {hljs}]],
      previewStyle: "vertical",
      height: "100vh",
      initialEditType: "markdown",
      minHeight: "200px",
      initialValue: "",
      placeholder: "你想写点什么...",
      language:'zh-CN',
      useCommandShortcut: true,
      useDefaultHTMLSanitizer: true,
      usageStatistics: false,
      hideModeSwitch: false,
      viewer: true,
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

::v-deep ul li::before, ::v-deep ol li::before {
  content: none;
}
::v-deep .tui-editor-contents h5{
  margin-top: 20px;
}
::v-deep .tui-editor-contents h4{
  margin: 30px 0 15px 0;
}
::v-deep .tui-editor-contents h3{
  margin-top: 35px;
}
::v-deep .tui-editor-contents img{
  margin: 10px 0;
}
::v-deep .tui-editor-contents h2{
  margin-top: 40px;
}
::v-deep .tui-editor-contents h1{
  margin-bottom: 30px;
}
::v-deep .tui-editor-contents p>code{
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

::v-deep .tui-editor-defaultUI .te-mode-switch-section {
  display: none !important;
}
</style>