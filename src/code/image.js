export async function webPathToDataUrl(webUrl) {
  const resp = await fetch(webUrl);
  const blob = await resp.blob();
  return blobToDataUrl(blob);
}

export function blobToDataUrl(blob) {
  const reader = new FileReader();
  return new Promise(resolve => {
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(blob);
  });
}
