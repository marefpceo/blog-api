import imgPlaceholder from '../assets/images/blog-img-placeholder.png';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

function onError(error) {
  console.error(error);
}

function Create() {
  const initialConfig = {
    namespace: 'New Article',
    onError,
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

        <div className='bg-slate-500'>
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={<div>Click to start creating</div>}
            />
            <HistoryPlugin />
          </LexicalComposer>
        </div>
      </article>
    </>
  );
}

export default Create;
