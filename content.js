browser.runtime.onMessage.addListener((message) => {
  if (message.command === "openRenameModal") {
    const modal = document.createElement("div");
    modal.className = "tab-rename-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <input type="text" id="tabTitleInput" value="${message.title}">
      </div>
    `;

    const input = modal.querySelector("#tabTitleInput");

    input.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        modal.remove();
        document.title = input.value;
        await browser.storage.local.set({
          [`tab-${message.tabId}`]: input.value,
        });
      }
    });

    document.body.appendChild(modal);
    input.focus();
    input.select();

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  } else if (message.command === "setTitle") {
    document.title = message.title;
  }
});
