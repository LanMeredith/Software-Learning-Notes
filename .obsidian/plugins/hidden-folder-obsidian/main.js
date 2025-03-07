/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/plugin.ts
var import_obsidian2 = require("obsidian");

// src/lang/en.ts
var en_default = {};

// src/lang/zh.ts
var zh_default = {
  "Not Found Files List": "\u627E\u4E0D\u5230\u6587\u4EF6\u5217\u8868",
  "Hidden Folder": "\u6587\u4EF6\u9690\u85CF",
  "Restore display": "\u6062\u590D\u663E\u793A",
  "folders": "\u6587\u4EF6\u5939",
  "Folders": "\u6587\u4EF6\u5939",
  "folder": "\u6587\u4EF6\u5939",
  "Hidden display": "\u9690\u85CF\u663E\u793A",
  "Show Folders": "\u663E\u793A\u6587\u4EF6\u5939",
  "Hidden Folders": "\u9690\u85CF\u6587\u4EF6\u5939",
  "Rules": "\u89C4\u5219",
  "Regular expression": "\u6B63\u5219\u8868\u8FBE\u5F0F",
  "Example": "\u4F8B\u5B50",
  "Enable": "\u5F00\u542F",
  "Enable to hidden folder": "\u662F\u5426\u5F00\u542F\u9690\u85CF",
  "Saving": "\u4FDD\u5B58\u4E2D",
  "Settings is saved": "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
  "Save": "\u4FDD\u5B58"
};

// src/lang/index.ts
var lang = {
  en: en_default,
  zh: zh_default,
  get
};
function get(text, args) {
  var _a;
  const language = ((_a = window.i18next) == null ? void 0 : _a.language) || "en";
  const map = lang[language] || en_default;
  let result = map[text] || en_default[text] || text;
  if (args) {
    for (let i in args) {
      result = result.replace(new RegExp(`\\{\\{${i}\\}\\}`, "g"), args[i]);
    }
  }
  return result;
}
lang.get = get;
var lang_default = lang;

// src/setting.ts
var import_obsidian = require("obsidian");
var HiddenFolderSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: lang_default.get("Hidden Folder") });
    const settings = {
      folders: this.plugin.settings.folders,
      enable: this.plugin.settings.enable
    };
    new import_obsidian.Setting(containerEl).setName(lang_default.get("Rules")).setDesc(lang_default.get("Regular expression")).addTextArea((text) => {
      text.inputEl.style.minWidth = "350px";
      text.inputEl.style.minHeight = "150px";
      text.setPlaceholder(lang_default.get("Example") + ":\n.*\\/?attachments\n^abc$\nuse multi lines for multi folders").setValue(this.plugin.settings.folders).onChange(async (value) => {
        settings.folders = value;
      });
      return text;
    });
    new import_obsidian.Setting(containerEl).setName(lang_default.get("Enable")).setDesc(lang_default.get("Enable to hidden folder")).addToggle((toggle) => toggle.setValue(this.plugin.settings.enable).onChange((enable) => {
      settings.enable = enable;
    }));
    new import_obsidian.Setting(containerEl).addButton((button) => button.setButtonText(lang_default.get("Save")).onClick(async () => {
      new import_obsidian.Notice(lang_default.get("Hidden Folder") + " - " + lang_default.get("Saving"));
      this.plugin.settings.folders = settings.folders;
      this.plugin.settings.enable = settings.enable;
      await this.plugin.saveSettings();
      this.plugin.restoreFolder();
      if (this.plugin.settings.enable) {
        this.plugin.hiddenFolder();
      }
      new import_obsidian.Notice(lang_default.get("Hidden Folder") + " - " + lang_default.get("Settings is saved"));
    }));
  }
};

// src/plugin.ts
var DEFAULT_SETTINGS = {
  folders: "",
  enable: false
};
var HiddenFolder = class extends import_obsidian2.Plugin {
  getFilters() {
    if (!this.settings.folders)
      return null;
    const result = [];
    const folders = this.settings.folders.split("\n");
    if (folders.length) {
      for (let i of folders) {
        result.push(new RegExp(i));
      }
    }
    return result;
  }
  getFolderElements() {
    const folders = document.querySelectorAll(".nav-folder");
    const result = [];
    for (let i = 0; i < folders.length; i++) {
      const el = folders[i];
      if (el.classList.contains("mod-root"))
        continue;
      result.push(el);
    }
    return result;
  }
  restoreFolder() {
    const folders = document.querySelectorAll(".hidden-folder-flag-hidden");
    if (folders == null ? void 0 : folders.length) {
      new import_obsidian2.Notice(lang_default.get("Restore display") + "\r\n" + folders.length + " " + lang_default.get(folders.length > 1 ? "folders" : "folder"));
      for (let i = 0; i < folders.length; i++) {
        const el = folders[i];
        el.classList.remove("hidden-folder-flag-hidden");
      }
    }
  }
  hiddenFolder() {
    if (!this.settings.enable)
      return;
    const filters = this.getFilters();
    if (!(filters == null ? void 0 : filters.length))
      return;
    const elements = this.getFolderElements();
    let count = 0;
    for (let el of elements) {
      const title = el.querySelector(".nav-folder-title");
      const path = title == null ? void 0 : title.getAttribute("data-path");
      if (!path)
        continue;
      if (el.classList.contains("hidden-folder-flag-hidden"))
        continue;
      for (let filter of filters) {
        if (filter.test(path)) {
          el.classList.add("hidden-folder-flag-hidden");
          count++;
        }
      }
    }
    if (count) {
      new import_obsidian2.Notice(lang_default.get("Hidden display") + "\r\n" + count + " " + lang_default.get(count > 1 ? "folders" : "folder"));
    }
  }
  async onload() {
    await this.loadSettings();
    this.start(0);
  }
  observe() {
    if (!this.container)
      return;
    this.observer = new MutationObserver(() => {
      this.hiddenFolder();
    });
    this.observer.observe(this.container, { attributes: true, childList: true, subtree: true });
  }
  start(loop) {
    if (loop > 20) {
      new import_obsidian2.Notice(lang_default.get("Not Found Files List"));
      return;
    }
    this.container = document.querySelector(".nav-files-container");
    if (!this.container) {
      setTimeout(() => {
        this.start(loop + 1);
      }, 100);
      return;
    }
    this.observe();
    this.app.workspace.on("layout-change", () => {
      const container = document.querySelector(".nav-files-container");
      if (container !== this.container) {
        this.container = container;
        this.observe();
      }
    });
    this.addSettingTab(new HiddenFolderSettingTab(this.app, this));
    this.hiddenFolder();
    setTimeout(() => {
      const el = this.addRibbonIcon("ghost", lang_default.get(this.settings.enable ? "Show Folders" : "Hidden Folders"), (evt) => {
        this.settings.enable = !this.settings.enable;
        this.saveSettings();
        el.setAttribute("aria-label", lang_default.get(this.settings.enable ? "Show Folders" : "Hidden Folders"));
        if (this.settings.enable) {
          this.hiddenFolder();
        } else {
          this.restoreFolder();
        }
      });
    }, 10);
  }
  onunload() {
    if (!this.observer)
      return;
    this.restoreFolder();
    this.observer.disconnect();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};

// main.ts
var main_default = HiddenFolder;

/* nosourcemap */