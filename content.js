var defaultcolorjson = {
  "ad-name": {
    default: "darkblue",
    "xxx@yyy.onmicrosoft.com": "green",
    "yyy@yyy.onmicrosoft.com": "black",
  },
  "ad-name2": {
    default: "pink",
    "xxx@zzz.onmicrosoft.com": "cyan",
    "yyy@zzz.onmicrosoft.com": "white",
  },
};

window.addEventListener("load", function () {
  const { hostname, pathname } = window.location;
  if (hostname.endsWith("portal.azure.com")) {
    // Azure Portal
    changeConsoleHeader();
  }
});

// Helper function for waiting until an element selection has been rendered.
function onElementReady(selectorFn, fn) {
  let timedOut = false;
  setTimeout(function () {
    timedOut = true;
  }, 10000);
  const waitForElement = function () {
    if (timedOut) {
      fn(new Error("Element selection timed out."));
    }
    const selection = selectorFn();
    const firstEl = Array.isArray(selection) ? selection[0] : selection;
    if (firstEl) {
      if (selection.textContent) {
        fn(undefined, selection);
      } else {
        window.requestAnimationFrame(waitForElement);
      }
    } else {
      window.requestAnimationFrame(waitForElement);
    }
  };
  waitForElement();
}

function changeConsoleHeader() {
  const headerSelector = () => document.querySelector(".fxs-topbar");
  onElementReady(headerSelector, function (err, header) {
    if (err) {
      console.warn(err);
      return;
    }

    chrome.storage.local.get("ce_az_header_colors", function (items) {
      var colors = defaultcolorjson;
      if (items.ce_az_header_colors) {
        colors = items.ce_az_header_colors;
      }

      const tenantHeaderSelector = () =>
        document.querySelector(".fxs-avatarmenu-tenant");
      onElementReady(tenantHeaderSelector, function (err, tenantHeader) {
        if (err) {
          console.warn(err);
          return;
        }
        tenantName = tenantHeader.textContent;
        //console.log(tenantName);

        const upnHeaderSelector = () =>
          document.querySelector(".fxs-avatarmenu-username");
        onElementReady(upnHeaderSelector, function (err, upnHeader) {
          if (err) {
            console.warn(err);
            return;
          }
          upn = upnHeader.textContent;
          //console.log(upn);

          var colorName = "";

          tenantNameUpperCase = (tenantName + "").toUpperCase();

          for (var colorTenantName in colors) {
            colorTenantNameUpperCase = (colorTenantName + "").toUpperCase();
            //console.log("colorTenantName");
            //console.log(colorTenantName);
            if (
              colorTenantNameUpperCase == tenantNameUpperCase ||
              tenantNameUpperCase.startsWith(colorTenantNameUpperCase + " ")
            ) {
              for (var colorUpn in colors[colorTenantName]) {
                //console.log(JSON.stringify(colorUpn));
                if (colorUpn == "default") {
                  colorName = colors[colorTenantName][colorUpn];
                } else if (colorUpn == upn) {
                  colorName = colors[colorTenantName][colorUpn];
                  break;
                }
              }
              break;
            }
          }

          if (colorName) {
            header.style.backgroundColor = colorName;
          }
        });
      });
    });
  });
}
