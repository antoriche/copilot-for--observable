import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Popup from "./popup";

const element = document.getElementById("popup");
const root = createRoot(element ? element : document.body);

chrome.storage.session.setAccessLevel({ accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" });

chrome.tabs.query({ active: true, currentWindow: true }, () => {
  root.render(
    <StrictMode>
      <Popup />
    </StrictMode>
  );
});
