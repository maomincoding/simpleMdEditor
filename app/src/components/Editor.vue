<template>
  <div class="main">
    <button @click="getHtml">html</button>
    <div id="editor"></div>
    <div v-html="htmlVnode"></div>
  </div>
</template>
<script>
import Editor from "@toast-ui/editor";
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
      editorOptions: {
        previewStyle: "vertical",
        height: "100vh",
        initialEditType: "markdown",
        minHeight: "200px",
        initialValue: "",
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
      },
    };
  },
  methods: {
    getHtml() {
      console.log(this.editor.preview.el);
      this.htmlVnode = this.editor.preview.el.innerHTML;
    },
  },
  mounted() {
    this.editor = new Editor({
      el: document.getElementById("editor"),
      plugins: [[codeSyntaxHighlight, { hljs }]],
      ...this.editorOptions,
    });
  },
};
</script>

<style scoped>
#editor {
  box-sizing: content-box;
}
::v-deep .tui-editor-defaultUI {
  border: 0;
}
::v-deep te-toolbar-section {
  position: fixed;
  top: 0;
}
.tui-editor-contents p {
  color: #4a4a4a;
  font-size: 16px;
  line-height: 31px;
}
.container {
  width: 800px;
  margin: 0 auto;
}
::v-deep .tui-editor-defaultUI .te-mode-switch-section {
  display: none !important;
}
</style>
