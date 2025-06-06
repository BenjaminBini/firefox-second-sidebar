import { SidebarEvents, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";

export class SidebarSplittersController {
  constructor() {
    this.sidebarSplitterFloating = SidebarElements.sidebarSplitterFloating;
    this.sidebarSplitterSplit = SidebarElements.sidebarSplitterSplit;

    this.#setupListeners();
  }

  #setupListeners() {
    /**@param {number} width */
    const changeWidth = (width) => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      sendEvents(SidebarEvents.EDIT_SIDEBAR_WIDTH, {
        uuid: webPanelController.getUUID(),
        width,
      });
      SidebarControllers.webPanelsController.saveSettings();
    };
    this.sidebarSplitterFloating.listenWidthChange(() =>
      changeWidth(SidebarControllers.sidebarController.getSidebarWidth()),
    );
    this.sidebarSplitterSplit.listenWidthChange(() =>
      changeWidth(SidebarControllers.sidebarController.getSidebarBoxWidth()),
    );
  }
}
