import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { classicEditor, inlineEditor } from '../utilites/EditorConfigs';

function Create() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>Create Article</h1>
      <form className='mx-auto mt-12 flex h-5/6 w-4/6 flex-col justify-start bg-slate-100 text-black'>
        <div className='main-image mb-16 h-56 w-full'>
          <img
            src={imgPlaceholder}
            alt='Main image placeholder'
            className='mx-auto h-full '
          />
        </div>
        <div>
          <h2 id='title'>
            <Editor
              tinymceScriptSrc='/tinymce/tinymce.min.js'
              inline={true}
              licenseKey='gpl'
              initialValue='Article Title'
              init={inlineEditor}
            />
          </h2>
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
