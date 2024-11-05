export const blobToBase64 = (blob: Blob, callback: Function) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64data = (reader?.result as string).split(",")[1];
    callback(base64data);
  };
  reader.readAsDataURL(blob);
};
