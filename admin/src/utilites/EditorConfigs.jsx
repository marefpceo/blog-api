const custom_image_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', `${import.meta.env.VITE_BASE_URL}/admin/articles/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status);
        return;
      }

      const json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        reject('Invalid JSON: ' + xhr.responseText);
        return;
      }
      resolve(json.location);
    };

    xhr.onerror = () => {
      reject(
        'Image upload failed due to a XHR Transport error. Code: ' + xhr.status,
      );
    };

    const formData = new FormData();
    formData.append('articleTextImageUpload', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  });

const classicEditor = {
  menubar: false,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'preview',
    'help',
    'wordcount',
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic | ' +
    'bullist numlist outdent indent | ' +
    'image table | fullscreen preview | removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  images_upload_handler: custom_image_upload_handler,
  image_prepend_url: `${import.meta.env.VITE_BASE_URL}/uploads/`,
};

const inlineEditor = {
  menubar: false,
  toolbar: false,
};

export { classicEditor, inlineEditor };
