/* eslint-disable no-unused-vars */
import { MenuItem } from "./base/menuitem.mjs";
import { MenuPopup } from "./base/menupopup.mjs";
import { MenuSeparator } from "./base/menuseparator.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { WebPanelController } from "../controllers/web_panel.mjs";
/* eslint-enable no-unused-vars */

export class WebPanelMenuPopup extends MenuPopup {
  constructor() {
    super({
      id: "sb2-web-panel-button-menupopup",
      classList: ["sb2-menupopup"],
    });

    this.unloadItem = new MenuItem().setLabel("Unload web panel");
    this.muteItem = new MenuItem();
    this.pinItem = new MenuItem();
    this.toggleModeItem = new MenuItem();
    this.editItem = new MenuItem().setLabel("Edit web panel");
    this.deleteItem = new MenuItem().setLabel("Delete web panel");
    this.customizeItem = new MenuItem().setLabel("Customize Toolbar...");
    this.#compose();

    this.addEventListener("popupshowing", () => {
      this.webPanelController = SidebarControllers.webPanelsController.get(
        this.element.triggerNode.id,
      );
      // unloading
      this.unloadItem.setDisabled(this.webPanelController.isUnloaded());
      // muting
      if (this.webPanelController.isUnloaded()) {
        this.muteItem.hide();
      } else {
        this.muteItem.show();
        this.muteItem.setLabel(
          `${this.webPanelController.isMuted() ? "Unmute" : "Mute"} web panel`,
        );
      }
      // pinning
      this.pinItem.setLabel(
        `${this.webPanelController.isPinned() ? "Unpin" : "Pin"} web panel`,
      );
      // toggle mode (split/floating)
      const currentType = this.webPanelController.getType();
      const isFloating = currentType === "floating";
      this.toggleModeItem.setLabel(
        `Switch to ${isFloating ? "split" : "floating"} mode`,
      );
    });
  }

  #compose() {
    this.appendChildren(
      this.unloadItem,
      this.muteItem,
      this.pinItem,
      this.toggleModeItem,
      new MenuSeparator(),
      this.editItem,
      this.deleteItem,
      new MenuSeparator(),
      this.customizeItem,
    );
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenUnloadItemClick(callback) {
    this.unloadItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenMuteItemClick(callback) {
    this.muteItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenPinItemClick(callback) {
    this.pinItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenToggleModeItemClick(callback) {
    this.toggleModeItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenEditItemClick(callback) {
    this.editItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenDeleteItemClick(callback) {
    this.deleteItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenCustomizeItemClick(callback) {
    this.customizeItem.addEventListener("command", (event) => {
      callback(event);
    });
  }
}
