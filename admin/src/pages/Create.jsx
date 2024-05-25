import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect } from 'react';
import { classicEditor, inlineEditor } from '../utilites/EditorConfigs';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [file, setFile] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [article, setArticle] = useState({
    article_title: '',
    author: username,
    article_summary: '',
    article_text: '',
    main_image: '',
  });

  const editorRef = useRef(null);

  useEffect(() => {}, [article.article_title]);

  async function createArticle(formData) {
    try {
      const response = await fetch('http://localhost:3000/admin/articles', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.errors) {
          setErrorResponse(responseData.errors);
          return;
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setArticle({
      ...article,
      [e.target.name]: value,
    });
  }

  function handleImageUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setArticle({ ...article, main_image: e.target.files[0] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('article_title', article.article_title);
    formData.append('author', article.author);
    formData.append('article_text', editorRef.current.getContent());
    formData.append('article_summary', article.article_summary);
    formData.append('main_image', article.main_image);

    createArticle(formData);
  }

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>Create Article</h1>
      <form
        className='mx-auto mt-12 flex max-h-fit w-4/6 flex-col justify-start space-y-8 bg-slate-100 
          p-8 text-black'
        method='post'
        encType='multipart/form-data'
        onSubmit={handleSubmit}
      >
        <div className='main_image relative mb-16 h-56 w-full'>
          <img
            src={file === undefined ? imgPlaceholder : file}
            alt='Main image'
            className='mx-auto h-full '
          />
          <div className='max-w-max border'>
            <input
              type='file'
              name='main_image'
              id='main_image'
              onChange={handleImageUpload}
              required
            />
          </div>
        </div>
        <fieldset
          className='rounded-md border border-cust-slate-gray p-4 
          text-cust-english-violet'
        >
          <legend className='px-2'>Article Info</legend>
          <h2 className='mb-2 flex gap-4 rounded-md bg-white p-1' id='title'>
            <FormInput
              htmlFor={'article_title'}
              fieldName={'Title:'}
              type={'text'}
              name={'article_title'}
              id={'article_title'}
              className={'w-full rounded-md'}
              autoFocus={true}
              onChange={handleInputChange}
            />
          </h2>
          <div className='mb-2 flex gap-4 rounded-md bg-white p-1'>
            <p>Author: </p>
            <p>{username}</p>
          </div>
        </fieldset>

        <fieldset
          className='rounded-md border border-cust-slate-gray p-2 
          text-cust-english-violet'
        >
          <legend className='px-2'>Article Summary</legend>
          <div className='mb-2 flex gap-4 rounded-md bg-white p-1'>
            <FormInput
              htmlFor={'article_summary'}
              fieldName={''}
              type={'text'}
              name={'article_summary'}
              id={'article_summary'}
              className={'w-full rounded-md'}
              autoFocus={true}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset
          className='rounded-md border border-cust-slate-gray p-4 
          text-cust-english-violet'
        >
          <legend className='px-2'>Article Body</legend>
          <Editor
            tinymceScriptSrc='/tinymce/tinymce.min.js'
            licenseKey='gpl'
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={classicEditor}
            textareaName='article_text'
            onSubmit={() =>
              setArticle({
                ...article,
                article_text: editorRef.current.getContent(),
              })
            }
          />
        </fieldset>
        <Button
          text={'Submit'}
          className={
            'mx-auto w-1/4 rounded-md border border-cust-slate-gray bg-cust-pumpkin px-4 py-1 text-cust-beige'
          }
        />
      </form>
    </>
  );
}

export default Create;
