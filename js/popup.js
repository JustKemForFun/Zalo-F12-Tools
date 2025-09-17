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
  chrome.storage.local.set({ [id]: !!checked }, () => {
    if (chrome.runtime.lastError) {
      console.error('[Zalo-F12-Tools] Storage error:', chrome.runtime.lastError);
    } else {
      console.log(`[Zalo-F12-Tools] Saved ${id}: ${!!checked}`);
    }
  });
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
    if (chrome.runtime.lastError) {
      console.error('[Zalo-F12-Tools] Storage get error:', chrome.runtime.lastError);
      return;
    }
    
    console.log('[Zalo-F12-Tools] Restored settings:', res);
    keys.forEach((k) => setToggle(k, res[k]));
    updateActiveFeaturesCount(); // Update counter after restore
    // Re-apply ONLY enabled toggles on open (show toast), don't send OFF
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.url || !tab.url.startsWith('https://chat.zalo.me/')) return;
      const enabledKeys = keys.filter((k) => !!res[k]);
      for (const k of enabledKeys) {
        await applyToggleOnTab(tab, k, true, false);
      }
    });
  });
}
// Auto-load version from manifest
function loadVersionFromManifest() {
  const manifest = chrome.runtime.getManifest();
  const version = `v${manifest.version}`;
  
  // Update header version badge
  const versionElement = document.getElementById('versionBadge');
  if (versionElement) {
    versionElement.textContent = version;
  }
}

// Count active features
function updateActiveFeaturesCount() {
  const toggleIds = [
    'adminMode',
    'embedYoutube', 
    'embedSoundcloud',
    'embedSettings',
    'embedZing',
    'photoViewerPopup',
    'guggy',
    'tfeEdit'
  ];
  
  let activeCount = 0;
  toggleIds.forEach(id => {
    const element = document.getElementById(id);
    if (element && element.checked) {
      activeCount++;
    }
  });
  
  const activeFeaturesElement = document.getElementById('activeFeatures');
  if (activeFeaturesElement) {
    activeFeaturesElement.textContent = activeCount;
  }
}

// Initialize all features
function initializeUI() {
  loadVersionFromManifest();
  restoreAll();
  updateActiveFeaturesCount();
}

// Ensure restore runs even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUI);
} else {
  initializeUI();
}

// Add event listeners for all toggles
const toggleIds = [
  'adminMode',
  'embedYoutube', 
  'embedSoundcloud',
  'embedSettings',
  'embedZing',
  'photoViewerPopup',
  'guggy',
  'tfeEdit'
];

toggleIds.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("change", async (e) => {
      const isEnabled = e.target.checked;
      persist(id, isEnabled);
      updateActiveFeaturesCount(); // Update counter when toggle changes
      
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const tab = tabs && tabs[0];
        if (!tab) return;
        await applyToggleOnTab(tab, id, isEnabled, true);
      });
    });
  }
});

// Feedback links are now handled directly in HTML

