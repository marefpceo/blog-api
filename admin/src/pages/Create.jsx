import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function Create() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <h1 className='text-4xl text-cust-silver'>Create Article</h1>
      <form className='mt-12 flex h-3/4 justify-center'>
        <Editor
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          licenseKey='your-license-key'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue='<p>This is the initial content of the editor.</p>'
          init={{
            selector: 'textarea',
            skin_url: '/src/assets/skins/',
            height: 600,
            width: '80%',
            menubar: false,
            resize: true,
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
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </form>
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default Create;
