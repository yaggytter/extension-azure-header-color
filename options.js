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
  }
};

function savecolors() {
  var inputjson = document.getElementById("inputjsoncolors").value;

  var colors;
  try {
    colors = JSON.parse(inputjson);
  } catch (e) {
    document.getElementById("mescolors").innerHTML = "invalid json.";
    return;
  }

  chrome.storage.local.set({ ce_az_header_colors: colors }, function () {});
  document.getElementById("mescolors").innerHTML = "saved.";
}

function load() {
  chrome.storage.local.get("ce_az_header_colors", function (items) {
    var value;
    if (!items.ce_az_header_colors) {
      value = JSON.stringify(defaultcolorjson, null, "\t");
    } else {
      value = JSON.stringify(items.ce_az_header_colors, null, "\t");
    }
    document.getElementById("inputjsoncolors").value = value;
  });
}

document.addEventListener("DOMContentLoaded", load);

document
  .getElementById("savebuttoncolors")
  .addEventListener("click", savecolors);
