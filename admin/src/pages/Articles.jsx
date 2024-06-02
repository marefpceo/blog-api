import { Outlet, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Articles() {
  const { allArticles } = useOutletContext([]);

  return (
    <section>
      <Outlet
        context={{
          allArticles,
        }}
      />
    </section>
  );
}

export default Articles;
