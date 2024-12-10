window.fpCollect = (function () {
    const UNKNOWN = 'unknown';
    const ERROR = 'error';
  
    const DEFAULT_ATTRIBUTES = {
      /**
       * The key is the attribute.
       * The value determines whether the attribute is a function.
       */
  
      // new attributes
  
      byteLength: false,
      appVersion: false,
      onLine: false,
      doNotTrack: false,
      cpuClass: false,
      hardwareConcurrency: false,
      oscpu: false,
      
      timezone: false,
      timezone2: false,
      systemTime: false,
      getTimezoneOffset: false,
      toLocaleString: false,
  
      historyLength: false,
      indexedDB: false,
      openDatabase: false,
      product: false,
      fmget: false,
      domAutomation: false,
  
      cookieEnabled: false,
      doNotTrack: false,
      msDoNotTrack: false,
      sendBeaconAvailable: false,
      appName: false,
      vendor: false,
      appCodeName: false,
      userMediaAvailable: false,
      sayswho: false,
      javaEnabled: false,
      loadPurpose: false,
      batteryDetails: true,
  
      plugins: false,
      mimeTypes: false,
      userAgent: false,
      platform: false,
      language: false,
      languages: false,
      screen: false,
      touchScreen: false,
      videoCard: false,
      multimediaDevices: true,
      productSub: false,
      navigatorPrototype: false,
      navigatorProperties: false,
      etsl: false,
      screenDesc: false,
      phantomJS: false,
      nightmareJS: false,
      selenium: false,
      webDriver: false,
      webDriverValue: false,
      errorsGenerated: false,
      resOverflow: false,
      accelerometerUsed: true,
      screenMediaQuery: false,
      hasChrome: false,
      detailChrome: false,
      permissions: true,
      //allPermissions: false,
      //iframeChrome: false,
      debugTool: false,
      battery: false,
      deviceMemory: false,
      tpCanvas: true,
      sequentum: false,
      audioCodecs: false,
      videoCodecs: false,
      webSocketSupportTimeout: true,
    };
  
    // date & time info
    var currentTime = new Date();
  
    const defaultAttributeToFunction = {
      byteLength: function() {
        try {
          return new window.SharedArrayBuffer(1).byteLength;
        } catch (err) {
          return UNKNOWN;
        }
      },
  
      appVersion: function() {
        return navigator.appVersion
      },
  
      onLine: function() {
        return navigator.onLine
      },
  
      doNotTrack: function() {
        return !!(navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack)
      },
  
      cpuClass: function() {
        return navigator.cpuClass
      },
  
      hardwareConcurrency: function() {
        return navigator.hardwareConcurrency
      },
  
      oscpu: function() {
        return navigator.oscpu
      },
  
      systemTime: function() {
        return currentTime.toString();
      },
  
      timezone: function() {
        return (new Date).getTimezoneOffset();
      },
  
      timezone2: function() {
        if (window.Intl && window.Intl.DateTimeFormat) {
          return new window.Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
      },
  
      getTimezoneOffset : function() {
        var currentYear = currentTime.getFullYear();
        return Math.max(
          // `getTimezoneOffset` returns a number as a string in some unidentified cases
          parseFloat(new Date(currentYear, 0, 1).getTimezoneOffset()),
          parseFloat(new Date(currentYear, 6, 1).getTimezoneOffset()),
        );
      },
  
      toLocaleString: function() {
        return currentTime.toLocaleString();
      },
  
      historyLength: function() {
        if (window.history) {
          return window.history.length;
        }
      },
  
      indexedDB: function() {
        return !!window.indexedDB
      },
      openDatabase: function() {
          return !!window.openDatabase
      },
      product: function() {
        return navigator.product
      },
      fmget: function() {
        return !!window.fmget_targets
      },
      domAutomation: function() {
        return "domAutomation"in window || "domAutomationController" in window
      },
  
      cookieEnabled: () => {
        return navigator.cookieEnabled;
      },
      doNotTrack: () => {
        return navigator.doNotTrack;
      },
      msDoNotTrack: () => {
        return navigator.msDoNotTrack;
      },
      sendBeaconAvailable: () => {
        return typeof navigator.sendBeacon != 'undefined';
      },
      appName: () => {
        return navigator.appName;
      },
      vendor: () => {
        return navigator.vendor;
      },
      appCodeName: () => {
        return navigator.appCodeName;
      },
      userMediaAvailable: () => {
        return typeof navigator.getUserMedia != 'undefined';
      },
      sayswho: () => {
        return navigator.sayswho;
      },
      javaEnabled: () => {
        return navigator.javaEnabled();
      },
      language: () => {
        return navigator.language;
      },
      loadPurpose: () => {
        return navigator.loadPurpose;
      },
      batteryDetails: () => {
        return new Promise((resolve) => {
          navigator.getBattery().then((battery) => {
            resolve({
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime,
              level: battery.level,
            });
          });
        });
      },
  
      // original functionality
      userAgent: () => {
        return navigator.userAgent;
      },
      plugins: () => {
        const pluginsRes = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
          const plugin = navigator.plugins[i];
          const pluginStr = [plugin.name, plugin.description, plugin.filename, plugin.version].join("::");
          let mimeTypes = [];
          Object.keys(plugin).forEach((mt) => {
            mimeTypes.push([plugin[mt].type, plugin[mt].suffixes, plugin[mt].description].join("~"));
          });
          mimeTypes = mimeTypes.join(",");
          pluginsRes.push(pluginStr + "__" + mimeTypes);
        }
        return pluginsRes;
      },
      mimeTypes: () => {
        const mimeTypes = [];
        for (let i = 0; i < navigator.mimeTypes.length; i++) {
          let mt = navigator.mimeTypes[i];
          mimeTypes.push([mt.description, mt.type, mt.suffixes].join("~~"));
        }
        return mimeTypes;
      },
      platform: () => {
        if (navigator.platform) {
          return navigator.platform;
        }
        return UNKNOWN;
      },
      languages: () => {
        if (navigator.languages) {
          return navigator.languages;
        }
        return UNKNOWN;
      },
      screen: () => {
        return {
          wInnerHeight: window.innerHeight, // ok
          wOuterHeight: window.outerHeight, // ok
          wOuterWidth: window.outerWidth, // ok
          wInnerWidth: window.innerWidth, // ok
          wScreenX: window.screenX, // ok
          wPageXOffset: window.pageXOffset,
          wPageYOffset: window.pageYOffset,
          cWidth: document.body.clientWidth,
          cHeight: document.body.clientHeight,
          sWidth: screen.width, // ok
          sHeight: screen.height, // ok
          sAvailWidth: screen.availWidth, // ok
          sAvailHeight: screen.availHeight, // ok
          sColorDepth: screen.colorDepth, // ok
          sPixelDepth: screen.pixelDepth, // ok
          wDevicePixelRatio: window.devicePixelRatio // ok
        };
      },
      touchScreen: () => {
        let maxTouchPoints = 0;
        let touchEvent = false;
        if (typeof navigator.maxTouchPoints !== "undefined") {
          maxTouchPoints = navigator.maxTouchPoints;
        } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
          maxTouchPoints = navigator.msMaxTouchPoints;
        }
        try {
          document.createEvent("TouchEvent");
          touchEvent = true;
        } catch (_) {
        }
  
        const touchStart = "ontouchstart" in window;
        return [maxTouchPoints, touchEvent, touchStart];
      },
      videoCard: () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          let webGLVendor, webGLRenderer;
          if (ctx.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
            webGLVendor = ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL);
            webGLRenderer = ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
          } else {
            webGLVendor = "Not supported";
            webGLRenderer = "Not supported";
          }
          return [webGLVendor, webGLRenderer];
        } catch (e) {
          return "Not supported";
        }
      },
      multimediaDevices: () => {
        return new Promise((resolve) => {
          const deviceToCount = {
            "audiooutput": 0,
            "audioinput": 0,
            "videoinput": 0
          };
  
          if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
            && navigator.mediaDevices.enumerateDevices.name !== "bound reportBlock") {
            // bound reportBlock occurs with Brave
            navigator.mediaDevices.enumerateDevices().then((devices) => {
              if (typeof devices !== "undefined") {
                let name;
                for (let i = 0; i < devices.length; i++) {
                  name = [devices[i].kind];
                  deviceToCount[name] = deviceToCount[name] + 1;
                }
                resolve({
                  speakers: deviceToCount.audiooutput,
                  micros: deviceToCount.audioinput,
                  webcams: deviceToCount.videoinput
                });
              } else {
                resolve({
                  speakers: 0,
                  micros: 0,
                  webcams: 0
                });
              }
  
            });
          } else if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
            && navigator.mediaDevices.enumerateDevices.name === "bound reportBlock") {
            resolve({
              'devicesBlockedByBrave': true
            });
          } else {
            resolve({
              speakers: 0,
              micros: 0,
              webcams: 0
            });
          }
        });
      },
      productSub: () => {
        return navigator.productSub;
      },
      navigatorPrototype: () => {
        let obj = window.navigator;
        const protoNavigator = [];
        do Object.getOwnPropertyNames(obj).forEach((name) => {
          protoNavigator.push(name);
        });
        while (obj = Object.getPrototypeOf(obj));
  
        let res;
        const finalProto = [];
        protoNavigator.forEach((prop) => {
          const objDesc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(navigator), prop);
          if (objDesc !== undefined) {
            if (objDesc.value !== undefined) {
              res = objDesc.value.toString();
            } else if (objDesc.get !== undefined) {
              res = objDesc.get.toString();
            }
          } else {
            res = "";
          }
          finalProto.push(prop + "~~~" + res);
        });
        return finalProto;
      },
      navigatorProperties: () => {
        let obj = window.navigator;
        const protoNavigator = [];
        do Object.getOwnPropertyNames(obj).forEach((name) => {
          protoNavigator.push(name);
        });
        while (obj = Object.getPrototypeOf(obj));
  
        return protoNavigator;
      },
      etsl: () => {
        return eval.toString().length;
      },
      webSocketSupportTimeout: () => {
        timeout = 2000;
        return new Promise(function(resolve, reject) {
          // Create WebSocket connection.
          const socket = new WebSocket('wss://echo.websocket.org');
  
          const timer = setTimeout(function() {
            resolve(false);
            done();
            socket.close();
          }, timeout);
  
          function done() {
            // cleanup all state here
            clearTimeout(timer);
            socket.removeEventListener('error', error);
          }
  
          function error(e) {
            resolve(false);
            done();
          }
  
          socket.addEventListener('open', function() {
            resolve(true);
            done();
          });
          socket.addEventListener('error', error);
        });
      },
      screenDesc: () => {
        try {
          return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(screen), "width").get.toString();
        } catch (e) {
          return ERROR;
        }
      },
      nightmareJS: () => {
        return !!window.__nightmare;
      },
      phantomJS: () => {
        return [
          'callPhantom' in window,
          '_phantom' in window,
          'phantom' in window
        ];
      },
      selenium: () => {
        return [
          'webdriver' in window,
          '_Selenium_IDE_Recorder' in window,
          'callSelenium' in window,
          '_selenium' in window,
          '__webdriver_script_fn' in document,
          '__driver_evaluate' in document,
          '__webdriver_evaluate' in document,
          '__selenium_evaluate' in document,
          '__fxdriver_evaluate' in document,
          '__driver_unwrapped' in document,
          '__webdriver_unwrapped' in document,
          '__selenium_unwrapped' in document,
          '__fxdriver_unwrapped' in document,
          '__webdriver_script_func' in document,
          document.documentElement.getAttribute("selenium") !== null,
          document.documentElement.getAttribute("webdriver") !== null,
          document.documentElement.getAttribute("driver") !== null
        ];
      },
      webDriver: () => {
        return 'webdriver' in navigator;
      },
      webDriverValue: () => {
        return navigator.webdriver;
      },
      errorsGenerated: () => {
        const errors = [];
        try {
          azeaze + 3;
        } catch (e) {
          errors.push(e.message);
          errors.push(e.fileName);
          errors.push(e.lineNumber);
          errors.push(e.description);
          errors.push(e.number);
          errors.push(e.columnNumber);
          try {
            errors.push(e.toSource().toString());
          } catch (e) {
            errors.push(undefined);
          }
        }
  
        try {
          new WebSocket('itsgonnafail');
        } catch (e) {
          errors.push(e.message);
        }
        return errors;
      },
      resOverflow: () => {
        let depth = 0;
        let errorMessage = '';
        let errorName = '';
        let errorStacklength = 0;
  
        function iWillBetrayYouWithMyLongName() {
          try {
            depth++;
            iWillBetrayYouWithMyLongName();
          } catch (e) {
            errorMessage = e.message;
            errorName = e.name;
            errorStacklength = e.stack.toString().length;
          }
        }
  
        iWillBetrayYouWithMyLongName();
        return {
          depth: depth,
          errorMessage: errorMessage,
          errorName: errorName,
          errorStacklength: errorStacklength
        }
  
      },
      accelerometerUsed: () => {
        return new Promise((resolve) => {
          window.ondevicemotion = event => {
            if (event.accelerationIncludingGravity.x !== null) {
              return resolve(true);
            }
          };
  
          setTimeout(() => {
            return resolve(false);
          }, 300);
        });
      },
      screenMediaQuery: () => {
        return window.matchMedia('(min-width: ' + (window.innerWidth - 1) + 'px)').matches;
      },
      hasChrome: () => {
        return !!window.chrome;
      },
      geoLocation: () => {
        return self.navigator.geolocation.toString();
      },
      detailChrome: () => {
        if (!window.chrome) return UNKNOWN;
  
        const res = {};
  
        ["webstore", "runtime", "app", "csi", "loadTimes"].forEach((property) => {
          try {
            res[property] = window.chrome[property].constructor.toString();
          } catch (e) {
            res[property] = e.toString();
          }
        });
  
        try {
          window.chrome.runtime.connect('');
        } catch (e) {
          res.connect = e.message;
        }
        try {
          window.chrome.runtime.sendMessage();
        } catch (e) {
          res.sendMessage = e.message;
        }
  
        return res;
      },
      permissions: () => {
        return new Promise((resolve) => {
          navigator.permissions.query({name: 'notifications'}).then((val) => {
            resolve({
              state: val.state,
              permission: Notification.permission
            })
          });
        })
      },
      allPermissions: () => {
        return new Promise((resolve) => {
  
          var permissions = (name) => {
            return new Promise((resolveIn) => {
              navigator.permissions.query({name: name || 'notifications'}).then((val) => {
                resolveIn({
                  state: val.state,
                  permission: Notification.permission
                })
              }).catch((err) => {
                resolveIn({
                  error: err.toString()
                })
              });
            })
          }
  
          var all = [
            "accelerometer",
            "ambient-light-sensor",
            "background-fetch",
            "background-sync",
            "bluetooth",
            "camera",
            "clipboard-write",
            "device-info",
            "display-capture",
            "geolocation",
            "gyroscope",
            "magnetometer",
            "microphone",
            "midi",
            "nfc",
            "notifications",
            "persistent-storage",
            "push",
            "speaker-selection",
          ];
          var res = {};
          var promises = [];
  
          for (let perm of all) {
            promises.push(permissions(perm).then((val) => {
              // console.log(perm, val);
              res[perm] = val;
            }).catch((err) => {
              res[perm] = err.toString();
            }));
          }
  
          Promise.all(promises).then((results) => {
            resolve(res)
          });
        })
      },
      iframeChrome: () => {
        const iframe = document.createElement('iframe');
        iframe.srcdoc = 'blank page';
        document.body.appendChild(iframe);
  
        const result = typeof iframe.contentWindow.chrome;
        iframe.remove();
  
        return result;
      },
      debugTool: () => {
        let cpt = 0;
        const regexp = /./;
        regexp.toString = () => {
          cpt++;
          return 'spooky';
        };
        console.debug(regexp);
        return cpt > 1;
      },
      battery: () => {
        return 'getBattery' in window.navigator;
      },
      deviceMemory: () => {
        return navigator.deviceMemory || 0;
      },
      tpCanvas: () => {
        return new Promise((resolve) => {
          try {
            const img = new Image();
            const canvasCtx = document.createElement('canvas').getContext('2d');
            img.onload = () => {
              canvasCtx.drawImage(img, 0, 0);
              resolve(canvasCtx.getImageData(0, 0, 1, 1).data);
            };
  
            img.onerror = () => {
              resolve(ERROR);
            };
            img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
          } catch (e) {
            resolve(ERROR);
          }
        });
      },
      sequentum: () => {
        return window.external && window.external.toString && window.external.toString().indexOf('Sequentum') > -1;
      },
      audioCodecs: () => {
        const audioElt = document.createElement("audio");
  
        if (audioElt.canPlayType) {
          return {
            ogg: audioElt.canPlayType('audio/ogg; codecs="vorbis"'),
            mp3: audioElt.canPlayType('audio/mpeg;'),
            wav: audioElt.canPlayType('audio/wav; codecs="1"'),
            m4a: audioElt.canPlayType('audio/x-m4a;'),
            aac: audioElt.canPlayType('audio/aac;'),
          }
        }
        return {
          ogg: UNKNOWN,
          mp3: UNKNOWN,
          wav: UNKNOWN,
          m4a: UNKNOWN,
          aac: UNKNOWN
        };
      },
      videoCodecs: () => {
        const videoElt = document.createElement("video");
        
        if (videoElt.canPlayType) {
          return {
            ogg: videoElt.canPlayType('video/ogg; codecs="theora"'),
            h264: videoElt.canPlayType('video/mp4; codecs="avc1.42E01E"'),
            webm: videoElt.canPlayType('video/webm; codecs="vp8, vorbis"'),
            mpeg4v: videoElt.canPlayType('video/mp4; codecs="mp4v.20.8, mp4a.40.2"'),
            mpeg4a: videoElt.canPlayType('video/mp4; codecs="mp4v.20.240, mp4a.40.2"'),
            theora: videoElt.canPlayType('video/x-matroska; codecs="theora, vorbis"')
          }
        }
        return {
          ogg: UNKNOWN,
          h264: UNKNOWN,
          webm: UNKNOWN,
          mpeg4v: UNKNOWN,
          mpeg4a: UNKNOWN,
          theora: UNKNOWN
        }
      }
    };
  
    const addCustomFunction = function (name, isAsync, f) {
      DEFAULT_ATTRIBUTES[name] = isAsync;
      defaultAttributeToFunction[name] = f;
    };
  
    // what is this mess Antoine?
    const generateFingerprint = function () {
      return new Promise((resolve) => {
        const promises = [];
        const fingerprint = {};
        Object.keys(DEFAULT_ATTRIBUTES).forEach((attribute) => {
          fingerprint[attribute] = {};
          if (DEFAULT_ATTRIBUTES[attribute]) {
            promises.push(new Promise((resolve) => {
              defaultAttributeToFunction[attribute]().then((val) => {
                fingerprint[attribute] = val;
                return resolve();
              }).catch((e) => {
                fingerprint[attribute] = {
                  error: true,
                  message: e.toString()
                };
                return resolve();
              })
            }));
          } else {
            try {
              fingerprint[attribute] = defaultAttributeToFunction[attribute]();
            } catch (e) {
              fingerprint[attribute] = {
                error: true,
                message: e.toString()
              };
            }
          }
        });
        return Promise.all(promises).then(() => {
          return resolve(fingerprint);
        });
      });
    };
  
    return {
      addCustomFunction: addCustomFunction,
      generateFingerprint: generateFingerprint,
    };
  
  })();