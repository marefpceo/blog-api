import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { classicEditor, inlineEditor } from '../utilites/EditorConfigs';

function Create() {
  const [file, setFile] = useState();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function handleImageUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>Create Article</h1>
      <form className='mx-auto mt-12 flex max-h-fit w-4/6 flex-col justify-start bg-slate-100 p-8 text-black'>
        <div className='main-image relative mb-16 h-56 w-full'>
          <img
            src={file === undefined ? imgPlaceholder : file}
            alt='Main image placeholder'
            className='mx-auto h-full '
          />
          <div className='absolute left-0 top-1/2'>
            <input
              type='file'
              name='image-upload'
              id='image-upload'
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div>
          <h2 className='mb-2' id='title'>
            <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              inline={true}
              licenseKey='gpl'
              initialValue='&lt; Article Title &gt;'
              init={inlineEditor}
            />
          </h2>
          <div className='mb-8 flex gap-4'>
            <p>Written by:</p>
            <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              inline={true}
              licenseKey='gpl'
              initialValue='&lt; Author &gt;'
              init={inlineEditor}
            />
          </div>
        </div>

        <div>
          <Editor
            tinymceScriptSrc='/tinymce/tinymce.min.js'
            licenseKey='gpl'
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue='<p>This is the initial content of the editor.</p>'
            init={classicEditor}
          />
        </div>
        <button onClick={log}>Log editor content</button>
      </form>
    </>
  );
}

export default Create;
