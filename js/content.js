chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable_admin" || msg.action === "disable_admin") {
    (function(){
      try {
        const enable = msg.action === 'enable_admin' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default) {
              mod.default.adminMode = ${enable};
              var msg = '[Zalo-F12-Tools] Developer Mode ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              window.console && window.console.warn('[Zalo-F12-Tools] NDmK module not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] admin toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_youtube" || msg.action === "disable_youtube") {
    (function(){
      try {
        const enable = msg.action === 'enable_youtube' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default && mod.default.embed_pop) {
              mod.default.embed_pop.enable_youtube = ${enable};
              var msg = '[Zalo-F12-Tools] Embed YouTube ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module or embed_pop not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] youtube toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_soundcloud" || msg.action === "disable_soundcloud") {
    (function(){
      try {
        const enable = msg.action === 'enable_soundcloud' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default && mod.default.embed_pop) {
              mod.default.embed_pop.enable_soundcloud = ${enable};
              var msg = '[Zalo-F12-Tools] Embed SoundCloud ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module or embed_pop not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] soundcloud toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_embed_settings" || msg.action === "disable_embed_settings") {
    (function(){
      try {
        const enable = msg.action === 'enable_embed_settings' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default && mod.default.embed_pop) {
              mod.default.embed_pop.enable_settings = ${enable};
              var msg = '[Zalo-F12-Tools] Embed Settings ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module or embed_pop not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] embed settings toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_zing" || msg.action === "disable_zing") {
    (function(){
      try {
        const enable = msg.action === 'enable_zing';
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default && mod.default.embed_pop) {
              if (${enable}) {
                mod.default.embed_pop.mp3_domain = 'https://zingmp3.vn/';
              } else {
                mod.default.embed_pop.mp3_domain = '';
              }
              var msg = '[Zalo-F12-Tools] Embed Zing MP3 ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module or embed_pop not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] zing toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_photoviewer_popup" || msg.action === "disable_photoviewer_popup") {
    (function(){
      try {
        const enable = msg.action === 'enable_photoviewer_popup' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default) {
              mod.default.enable_photoviewer_popup = ${enable};
              var msg = '[Zalo-F12-Tools] PhotoViewer Popup ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] photoviewer toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_guggy" || msg.action === "disable_guggy") {
    (function(){
      try {
        const enable = msg.action === 'enable_guggy' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default) {
              mod.default.enable_guggy = ${enable};
              var msg = '[Zalo-F12-Tools] Guggy ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] guggy toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }

  if (msg.action === "enable_tfe_edit" || msg.action === "disable_tfe_edit") {
    (function(){
      try {
        const enable = msg.action === 'enable_tfe_edit' ? 1 : 0;
        const code = `
          try {
            var mod = window.webpackJsonp && window.webpackJsonp.push([[Math.random()],{},[["NDmK"]]]);
            if (mod && mod.default && mod.default.tfe) {
              mod.default.tfe.enable_edit = ${enable};
              var msg = '[Zalo-F12-Tools] Text File Editor ${enable ? 'ON' : 'OFF'}';
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
                }
              } catch (_) {}
            } else {
              console.log('[Zalo-F12-Tools] NDmK module or tfe not found');
            }
          } catch (e) { console.error('[Zalo-F12-Tools] tfe toggle error:', e); }
        `;
        const s = document.createElement('script');
        s.textContent = `(function(){${code}})();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (e) { console.error(e); }
    })();
  }
});
