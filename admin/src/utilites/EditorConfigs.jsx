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
  a11y_advanced_options: true,
  /* 
  image_uploadtab: true,
  images_upload_url: *** Server side image handler (multer) to handle upload and returns new location for 
      uploaded images ***
  */

  image_title: true,
  file_picker_types: 'image',
  image_uploadtab: true,
};

const inlineEditor = {
  menubar: false,
  toolbar: false,
};

export { classicEditor, inlineEditor };
