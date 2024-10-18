import imgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinkUnderline from '../utilites/LinkUnderline';
import { classicEditor } from '../utilites/EditorConfigs';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import convertEscape from '../utilites/helpers';

function Edit() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [file, setFile] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [article, setArticle] = useState({
    article_title: '',
    article_summary: '',
    article_text: '',
    author: '',
    main_image: '',
    id: '',
    edited_by: username,
  });

  const editorRef = useRef(null);
  const linkId = useLocation().state.id;

  useEffect(() => {
    async function getArticle() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/articles/${linkId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const responseData = await response.json();
        if (response.ok) {
          setArticle({
            ...article,
            article_title: responseData.selectedArticle.article_title,
            article_summary: responseData.selectedArticle.article_summary,
            article_text: convertEscape(
              responseData.selectedArticle.article_text,
            ),
            author: responseData.selectedArticle.author,
            main_image: responseData.selectedArticle.main_image,
            id: responseData.selectedArticle.id,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getArticle();
  }, []);

  async function editArticle(formData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/articles/${linkId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
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
      console.error(error);
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
    formData.append('id', article.id);
    formData.append('edited_by', article.edited_by);
    formData.append('article_title', article.article_title);
    formData.append('article_summary', article.article_summary);
    formData.append('article_text', editorRef.current.getContent());
    formData.append('main_image', article.main_image);

    editArticle(formData);
  }

  return (
    <>
      <div className='mt-0 pt-4 w-full flex items-center justify-between sticky top-0 bg-cust-slate-gray z-20'>
        <h1 className='title text-4xl text-cust-silver'>Edit Article</h1>
        <div className='flex gap-12 mr-8'>
          <Link to={-1} className='group relative'>
            Back
            <LinkUnderline
              color={'bg-cust-pumpkin'} />
          </Link>
        </div>
      </div>
      <form
        className='mx-auto mt-12 flex max-h-fit w-4/6 flex-col justify-start space-y-8 bg-slate-100 
          p-8 text-black'
        method='put'
        encType='multipart/form-data'
        onSubmit={handleSubmit}
      >
        <div className='main_image relative mb-16 h-56 w-full'>
          <img
            src={
              file === undefined
                ? `${article.main_image}`
                : file
            }
            alt='Main image'
            className='mx-auto h-full'
          />
          <div className='max-w-max border'>
            <input
              type='file'
              name='main_image'
              id='main_image'
              onChange={handleImageUpload}
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
              value={article.article_title}
              onChange={handleInputChange}
            />
          </h2>
          <div className='mb-2 flex justify-between gap-4 rounded-md bg-white p-1 pr-8'>
            <div className='flex gap-4'>
              <p>
                <strong>Edited by:</strong>
              </p>
              <p>{username}</p>
            </div>
            <div className='flex gap-4'>
              <p>
                <strong>Orginal Author:</strong>{' '}
              </p>
              <p>{article.author}</p>
            </div>
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
              value={article.article_summary}
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
            initialValue={article.article_text}
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

export default Edit;
