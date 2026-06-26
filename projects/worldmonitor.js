const offlinePanel = document.querySelector("#worldmonitorOffline");

async function checkWorldmonitorRuntime() {
  try {
    await fetch("http://127.0.0.1:3100/", {
      mode: "no-cors",
      cache: "no-store",
    });
    offlinePanel.hidden = true;
  } catch (error) {
    offlinePanel.hidden = false;
  }
}

checkWorldmonitorRuntime();
