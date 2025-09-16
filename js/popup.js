function sendAction(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, { action }, (resp) => {
      if (chrome.runtime.lastError) {
        console.warn('[Zalo-F12-Tools] sendMessage error:', chrome.runtime.lastError.message);
      } else {
        console.log('[Zalo-F12-Tools] content response:', resp);
      }
    });
  });
}

function execInMain(tabId, isEnabled, pageFunc) {
  return chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [isEnabled],
    func: pageFunc
  });
}

function setToggle(id, checked) {
  const el = document.getElementById(id);
  if (el) el.checked = !!checked;
}

function persist(id, checked) {
  chrome.storage.local.set({ [id]: !!checked });
}

function restoreAll() {
  const keys = [
    'adminMode',
    'embedYoutube',
    'embedSoundcloud',
    'embedSettings',
    'embedZing',
    'photoViewerPopup',
    'guggy',
    'tfeEdit'
  ];
  chrome.storage.local.get(keys, (res) => {
    keys.forEach((k) => setToggle(k, res[k]));
    // Do NOT auto-trigger changes on open to avoid unwanted toasts/logs
  });
}
// Ensure restore runs even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', restoreAll);
} else {
  restoreAll();
}

document.getElementById("adminMode").addEventListener("change", (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    persist('adminMode', isEnabled);
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      console.warn('[Zalo-F12-Tools] Not on chat.zalo.me, falling back to message');
      sendAction(isEnabled ? "enable_admin" : "disable_admin");
      return;
    }
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: 'MAIN',
        args: [isEnabled],
        func: (isEnabledArg) => {
          try {
            const hasJsonp = typeof window.webpackJsonp !== 'undefined';
            window.console && window.console.log('[Zalo-F12-Tools] MAIN world exec. has webpackJsonp:', hasJsonp);
            var mod = hasJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            window.console && window.console.log('[Zalo-F12-Tools] push result:', typeof mod);
            if (mod && mod.default) {
              mod.default.adminMode = isEnabledArg ? 1 : 0;
              var msg = '[Zalo-F12-Tools] Admin Mode ' + (isEnabledArg ? 'ON' : 'OFF');
              window.console && window.console.log(msg);
              window.console && window.console.info(msg);
              try {
                var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
                if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                  var windowId = '1';
                  ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                    textKey: msg,
                    type: ToastNS.TOAST_TYPE.INFO,
                    duration: 2000
                  });
                } else {
                  // Fallback to alert if toast is unavailable
                  if (typeof alert !== 'undefined') alert(msg);
                }
              } catch (_) {}
            } else {
              window.console && window.console.warn('[Zalo-F12-Tools] NDmK module not found via push');
            }
          } catch (err) {
            window.console && window.console.error('[Zalo-F12-Tools] admin toggle error:', err);
          }
        }
      });
    } catch (err) {
      console.warn('[Zalo-F12-Tools] executeScript failed, falling back to message:', err);
      sendAction(isEnabled ? "enable_admin" : "disable_admin");
    }
  });
});

document.getElementById("embedYoutube").addEventListener("change", (e) => {
  persist('embedYoutube', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_youtube" : "disable_youtube");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default && mod.default.embed_pop) {
            mod.default.embed_pop.enable_youtube = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] Embed YouTube ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_youtube" : "disable_youtube");
    }
  });
});

document.getElementById("embedSoundcloud").addEventListener("change", (e) => {
  persist('embedSoundcloud', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_soundcloud" : "disable_soundcloud");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default && mod.default.embed_pop) {
            mod.default.embed_pop.enable_soundcloud = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] Embed SoundCloud ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_soundcloud" : "disable_soundcloud");
    }
  });
});

document.getElementById("embedSettings").addEventListener("change", (e) => {
  persist('embedSettings', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_embed_settings" : "disable_embed_settings");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default && mod.default.embed_pop) {
            mod.default.embed_pop.enable_settings = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] Embed Settings ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_embed_settings" : "disable_embed_settings");
    }
  });
});

document.getElementById("embedZing").addEventListener("change", (e) => {
  persist('embedZing', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_zing" : "disable_zing");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default && mod.default.embed_pop) {
            if (isEnabledArg) {
              mod.default.embed_pop.mp3_domain = 'https://zingmp3.vn/';
            } else {
              mod.default.embed_pop.mp3_domain = '';
            }
            var msg = '[Zalo-F12-Tools] Embed Zing MP3 ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_zing" : "disable_zing");
    }
  });
});

document.getElementById("photoViewerPopup").addEventListener("change", (e) => {
  persist('photoViewerPopup', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_photoviewer_popup" : "disable_photoviewer_popup");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default) {
            mod.default.enable_photoviewer_popup = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] PhotoViewer Popup ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_photoviewer_popup" : "disable_photoviewer_popup");
    }
  });
});

document.getElementById("guggy").addEventListener("change", (e) => {
  persist('guggy', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_guggy" : "disable_guggy");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default) {
            mod.default.enable_guggy = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] Guggy ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_guggy" : "disable_guggy");
    }
  });
});

document.getElementById("tfeEdit").addEventListener("change", (e) => {
  persist('tfeEdit', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab) return;
    const isEnabled = e.target.checked;
    if (!tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
      sendAction(isEnabled ? "enable_tfe_edit" : "disable_tfe_edit");
      return;
    }
    try {
      await execInMain(tab.id, isEnabled, (isEnabledArg) => {
        try {
          var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
          if (mod && mod.default && mod.default.tfe) {
            mod.default.tfe.enable_edit = isEnabledArg ? 1 : 0;
            var msg = '[Zalo-F12-Tools] Text File Editor ' + (isEnabledArg ? 'ON' : 'OFF');
            window.console && window.console.log(msg);
            try {
              var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
              if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
                var windowId = '1';
                ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
                  textKey: msg,
                  type: ToastNS.TOAST_TYPE.INFO,
                  duration: 2000
                });
              } else if (typeof alert !== 'undefined') { alert(msg); }
            } catch (_) {}
          }
        } catch (err) { window.console && window.console.error(err); }
      });
    } catch (err) {
      sendAction(isEnabled ? "enable_tfe_edit" : "disable_tfe_edit");
    }
  });
});
