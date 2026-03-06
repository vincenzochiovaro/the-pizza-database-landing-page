async function warmUpBackend() {
  try {
    await fetch("toaddurl/api/KeepItWarm", {
      method: "GET",
      headers: {
        "x-api-key": "toaddheader"
      }
    });
  } catch {
  }
}

warmUpBackend();