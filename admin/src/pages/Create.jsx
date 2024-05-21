import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { classicEditor, inlineEditor } from '../utilites/EditorConfigs';

function Create() {
  const token = localStorage.getItem('token');
  const [file, setFile] = useState();
  const [article, setArticle] = useState({
    article_title: 'test',
    author: 'test',
    article_text: 'test',
    main_image: File,
  });

  const editorRef = useRef(null);

  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  async function createArticle() {
    try {
      const response = await fetch('http://localhost:3000/admin/articles', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
        body: article,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setArticle({ ...article, main_image: e.target.files[0] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createArticle();
    console.log(editorRef.current);
    console.log(file);
  }

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>Create Article</h1>
      <form
        className='mx-auto mt-12 flex max-h-fit w-4/6 flex-col justify-start bg-slate-100 p-8 text-black'
        method='post'
        encType='multipart/form-data'
      >
        <div className='main_image relative mb-16 h-56 w-full'>
          <img
            src={file === undefined ? imgPlaceholder : file}
            alt='Main image'
            className='mx-auto h-full '
          />
          <div className='absolute left-0 top-1/2'>
            <input
              type='file'
              name='main_image'
              id='main_image'
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
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}

export default Create;
