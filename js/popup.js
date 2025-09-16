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

async function applyToggleOnTab(tab, key, isEnabled, withToast) {
  if (!tab || !tab.url || !tab.url.startsWith('https://chat.zalo.me/')) {
    sendAction(isEnabled ? `enable_${key}` : `disable_${key}`);
    return;
  }
  const pageFunc = (toggleKey, isEnabledArg, showToast) => {
    try {
      const log = (m) => { try { window.console && window.console.log(m); } catch(_){} };
      const warn = (m) => { try { window.console && window.console.warn(m); } catch(_){} };
      const err = (m,e) => { try { window.console && window.console.error(m,e); } catch(_){} };
      const toast = (text) => {
        try {
          var ToastNS = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["Vp9m"]]]);
          if (ToastNS && ToastNS.ZToastManagerHolder && ToastNS.TOAST_TYPE) {
            var windowId = '1';
            ToastNS.ZToastManagerHolder.getZToastManagerByWindowId(windowId).show({
              textKey: text,
              type: ToastNS.TOAST_TYPE.INFO,
              duration: 2000
            });
          } else if (typeof alert !== 'undefined') {
            alert(text);
          }
        } catch(_) {}
      };

      const getNDmK = () => {
        const hasJsonp = typeof window.webpackJsonp !== 'undefined';
        log('[Zalo-F12-Tools] MAIN exec. has webpackJsonp: ' + hasJsonp);
        return hasJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
      };

      const mod = getNDmK();
      if (!mod || !mod.default) { warn('[Zalo-F12-Tools] NDmK module not found'); return; }

      const msgOf = (name, on) => `[Zalo-F12-Tools] ${name} ${on ? 'ON' : 'OFF'}`;

      switch (toggleKey) {
        case 'admin':
          mod.default.adminMode = isEnabledArg ? 1 : 0;
          log(msgOf('Admin Mode', isEnabledArg));
          if (showToast) toast(msgOf('Admin Mode', isEnabledArg));
          break;
        case 'youtube':
          if (mod.default.embed_pop) {
            mod.default.embed_pop.enable_youtube = isEnabledArg ? 1 : 0;
            log(msgOf('Embed YouTube', isEnabledArg));
            if (showToast) toast(msgOf('Embed YouTube', isEnabledArg));
          }
          break;
        case 'soundcloud':
          if (mod.default.embed_pop) {
            mod.default.embed_pop.enable_soundcloud = isEnabledArg ? 1 : 0;
            log(msgOf('Embed SoundCloud', isEnabledArg));
            if (showToast) toast(msgOf('Embed SoundCloud', isEnabledArg));
          }
          break;
        case 'embed_settings':
          if (mod.default.embed_pop) {
            mod.default.embed_pop.enable_settings = isEnabledArg ? 1 : 0;
            log(msgOf('Embed Settings', isEnabledArg));
            if (showToast) toast(msgOf('Embed Settings', isEnabledArg));
          }
          break;
        case 'zing':
          if (mod.default.embed_pop) {
            mod.default.embed_pop.mp3_domain = isEnabledArg ? 'https://zingmp3.vn/' : '';
            log(msgOf('Embed Zing MP3', isEnabledArg));
            if (showToast) toast(msgOf('Embed Zing MP3', isEnabledArg));
          }
          break;
        case 'photoviewer_popup':
          mod.default.enable_photoviewer_popup = isEnabledArg ? 1 : 0;
          log(msgOf('PhotoViewer Popup', isEnabledArg));
          if (showToast) toast(msgOf('PhotoViewer Popup', isEnabledArg));
          break;
        case 'guggy':
          mod.default.enable_guggy = isEnabledArg ? 1 : 0;
          log(msgOf('Guggy', isEnabledArg));
          if (showToast) toast(msgOf('Guggy', isEnabledArg));
          break;
        case 'tfe_edit':
          if (mod.default.tfe) {
            mod.default.tfe.enable_edit = isEnabledArg ? 1 : 0;
            log(msgOf('Text File Editor', isEnabledArg));
            if (showToast) toast(msgOf('Text File Editor', isEnabledArg));
          }
          break;
        default:
          warn('[Zalo-F12-Tools] Unknown toggle: ' + toggleKey);
      }
    } catch (e) {
      try { window.console && window.console.error('[Zalo-F12-Tools] applyToggle error:', e); } catch(_){}
    }
  };

  // map popup id to keys used by pageFunc
  const map = {
    adminMode: 'admin',
    embedYoutube: 'youtube',
    embedSoundcloud: 'soundcloud',
    embedSettings: 'embed_settings',
    embedZing: 'zing',
    photoViewerPopup: 'photoviewer_popup',
    guggy: 'guggy',
    tfeEdit: 'tfe_edit'
  };
  const keyOnPage = map[key];
  if (!keyOnPage) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      args: [keyOnPage, isEnabled, !!withToast],
      func: pageFunc
    });
  } catch (e) {
    sendAction(isEnabled ? `enable_${keyOnPage}` : `disable_${keyOnPage}`);
  }
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
    // Re-apply ONLY enabled toggles on open (show toast), don't send OFF
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.url || !tab.url.startsWith('https://chat.zalo.me/')) return;
      const enabledKeys = keys.filter((k) => !!res[k]);
      for (const k of enabledKeys) {
        await applyToggleOnTab(tab, k, true, true);
      }
    });
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
    await applyToggleOnTab(tab, 'adminMode', isEnabled, true);
  });
});

document.getElementById("embedYoutube").addEventListener("change", async (e) => {
  persist('embedYoutube', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'embedYoutube', e.target.checked, true);
  });
});

document.getElementById("embedSoundcloud").addEventListener("change", (e) => {
  persist('embedSoundcloud', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'embedSoundcloud', e.target.checked, true);
  });
});

document.getElementById("embedSettings").addEventListener("change", (e) => {
  persist('embedSettings', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'embedSettings', e.target.checked, true);
  });
});

document.getElementById("embedZing").addEventListener("change", (e) => {
  persist('embedZing', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'embedZing', e.target.checked, true);
  });
});

document.getElementById("photoViewerPopup").addEventListener("change", (e) => {
  persist('photoViewerPopup', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'photoViewerPopup', e.target.checked, true);
  });
});

document.getElementById("guggy").addEventListener("change", (e) => {
  persist('guggy', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'guggy', e.target.checked, true);
  });
});

document.getElementById("tfeEdit").addEventListener("change", (e) => {
  persist('tfeEdit', e.target.checked);
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await applyToggleOnTab(tabs && tabs[0], 'tfeEdit', e.target.checked, true);
  });
});
