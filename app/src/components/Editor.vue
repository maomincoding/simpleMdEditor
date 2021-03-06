<template>
  <div class="main">
    <div class="tools">
      <el-button type="primary" @click="getHtml" class="htmlbtn" size="mini"
        >复制HTML</el-button
      >
      <el-button type="primary" @click="getMd" class="mdbtn" size="mini">复制MarkDown</el-button>
    </div>
    <div id="editor"></div>
  </div>
</template>
<script>
import Editor from "@toast-ui/editor";
import Clipboard from "clipboard";
import hljs from "highlight.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import "highlight.js/styles/github.css"; //https://github.com/highlightjs/highlight.js/tree/master/src/styles
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

export default {
  components: {},
  data() {
    return {
      editor: null,
      htmlVnode: "",
    };
  },
  methods: {
    getHtml() {
      const clipboard = new Clipboard(".htmlbtn", {
        target: () => this.editor.preview.el,
      });
      clipboard.on("success", (e) => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message.error("复制失败");
        clipboard.destroy();
      });
    },
    getMd() {
      const clipboard = new Clipboard(".mdbtn", {
        text: () => this.editor.getMarkdown(),
      });
      clipboard.on("success", (e) => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message.error("复制失败");
        clipboard.destroy();
      });
    },
  },
  mounted() {
    this.editor = new Editor({
      el: document.getElementById("editor"),
      plugins: [[codeSyntaxHighlight, { hljs }]],
      previewStyle: "vertical",
      height: "100vh",
      initialEditType: "markdown",
      minHeight: "200px",
      initialValue: "",
      placeholder: "Please enter text.",
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
.tui-editor-contents p {
  color: #4a4a4a;
  font-size: 16px;
  line-height: 31px;
}
#editor {
  box-sizing: content-box;
}
.main {
  position: relative;
}
.tools {
  position: absolute;
  right: 25px;
  top: 0;
  height: 31px;
  z-index: 1000;
  display: flex;
  align-items: center;
}
</style>
