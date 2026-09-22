(function () {
  "use strict";

  let root, backdrop, titleEl, messageEl, inputEl, okBtn, cancelBtn;
  let activeResolve = null;
  let activeType = null;

  function ensureElements() {
    if (root) return;

    root = document.createElement("div");
    root.id = "ui-modal-root";
    root.className = "ui-modal-root";
    root.setAttribute("aria-hidden", "true");

    root.innerHTML = `
      <div class="ui-modal-backdrop"></div>
      <div class="ui-modal" role="dialog" aria-modal="true">
        <h3 class="ui-modal-title"></h3>
        <p class="ui-modal-message"></p>
        <input class="ui-modal-input" type="text">
        <div class="ui-modal-actions">
          <button type="button" class="ui-btn ui-btn-cancel"></button>
          <button type="button" class="ui-btn ui-btn-confirm"></button>
        </div>
      </div>
    `;

    document.body.appendChild(root);

    backdrop = root.querySelector(".ui-modal-backdrop");
    titleEl = root.querySelector(".ui-modal-title");
    messageEl = root.querySelector(".ui-modal-message");
    inputEl = root.querySelector(".ui-modal-input");
    okBtn = root.querySelector(".ui-btn-confirm");
    cancelBtn = root.querySelector(".ui-btn-cancel");

    okBtn.addEventListener("click", function () {
      if (activeType === "prompt") {
        close(inputEl.value);
      } else {
        close(true);
      }
    });

    cancelBtn.addEventListener("click", function () {
      close(activeType === "prompt" ? null : false);
    });

    backdrop.addEventListener("click", function () {
      if (activeType === "alert") close(undefined);
      else close(activeType === "prompt" ? null : false);
    });

    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("open")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (activeType === "alert") close(undefined);
        else close(activeType === "prompt" ? null : false);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (activeType === "prompt") close(inputEl.value);
        else close(true);
      }
    });
  }

  function open(options) {
    ensureElements();

    const {
      type,
      title = "تنبيه",
      message = "",
      defaultValue = "",
      okText = "موافق",
      cancelText = "إلغاء",
      showCancel = true,
    } = options;

    activeType = type;

    titleEl.textContent = title;
    messageEl.textContent = message;
    inputEl.value = defaultValue;
    inputEl.style.display = type === "prompt" ? "block" : "none";

    okBtn.textContent = okText;
    cancelBtn.textContent = cancelText;
    cancelBtn.style.display = showCancel ? "inline-flex" : "none";

    root.classList.add("open");
    root.setAttribute("aria-hidden", "false");

    setTimeout(function () {
      if (type === "prompt") {
        inputEl.focus();
        inputEl.select();
      } else {
        okBtn.focus();
      }
    }, 0);

    return new Promise(function (resolve) {
      activeResolve = resolve;
    });
  }

  function close(value) {
    if (!activeResolve) return;

    const resolve = activeResolve;
    activeResolve = null;
    activeType = null;

    root.classList.remove("open");
    root.setAttribute("aria-hidden", "true");

    resolve(value);
  }

  window.UI = {
    alert: function (message, options = {}) {
      return open({
        type: "alert",
        title: options.title || "تنبيه",
        message,
        okText: options.okText || "حسناً",
        showCancel: false,
      });
    },

    confirm: function (message, options = {}) {
      return open({
        type: "confirm",
        title: options.title || "تأكيد",
        message,
        okText: options.okText || "نعم",
        cancelText: options.cancelText || "إلغاء",
        showCancel: true,
      });
    },

    prompt: function (message, defaultValue = "", options = {}) {
      return open({
        type: "prompt",
        title: options.title || "إدخال",
        message,
        defaultValue,
        okText: options.okText || "حفظ",
        cancelText: options.cancelText || "إلغاء",
        showCancel: true,
      });
    },
  };
})();