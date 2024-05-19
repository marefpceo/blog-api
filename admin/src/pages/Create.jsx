import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
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
      <h1 id='title' className='title text-4xl text-cust-silver'>
        Create Article
      </h1>
      <article className='mx-auto mt-12 flex h-3/4 w-4/6 flex-col justify-start bg-slate-100 text-black'>
        <div className='main-image mb-16 h-56 w-full'>
          <img
            src={imgPlaceholder}
            alt='Main image placeholder'
            className='mx-auto h-full w-2/3'
          />
        </div>
        <div>
          <h2 id='title'>Article Title</h2>
        </div>

        <Editor
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          licenseKey='your-license-key'
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue='<p>This is the initial content of the editor.</p>'
          init={{
            height: 500,
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
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <button onClick={log}>Log editor content</button>
      </article>
    </>
  );
}

export default Create;
