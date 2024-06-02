// base64Utils.js

export function base64ToImageUrl(base64Data) {
    // Create a Blob from the base64 data
    const blob = b64toBlob(base64Data);
  
    // Create an object URL for the Blob
    const imageUrl = URL.createObjectURL(blob);
  
    return imageUrl;
  }
  
  function b64toBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  