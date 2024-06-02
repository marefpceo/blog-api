import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from '../sections/SideBar';
import Header from '../sections/Header';

function App() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch('http://localhost:3000/admin/articles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const error = new Error();
          if (response.status === 500) {
            error.message = 'Internal Server Error';
            error.status = 500;
            throw error;
          }
          if (response.status === 404) {
            error.message = 'Page Not Found';
            error.status = 404;
            throw error;
          }
          error.message = 'API Connection Error';
          error.status = 500;
          throw error;
        } else {
          let responseData = await response.json();
          setAllArticles(responseData.articlesList);
        }
      } catch (error) {
        console.error(error.message);
        setAllArticles(null);
        if (error instanceof TypeError) {
          return navigate('*', {
            state: { status: 503, statusMessage: 'Service Unavailable' },
          });
        } else {
          return navigate('*', {
            state: { status: error.status, statusMessage: error.message },
          });
        }
      } finally {
        setTimeout(setLoading(false), 3000);
      }
    }
    getArticles();
  }, []);

  return (
    <div className='m-0 grid h-screen w-screen grid-cols-layout grid-rows-layout p-0'>
      <Header />
      <SideBar />
      <div
        className='col-start-2 row-start-2 overflow-y-auto bg-cust-slate-gray p-4 
        text-cust-beige shadow-inner shadow-cust-english-violet'
      >
        {loading ? (
          'Loading. . . '
        ) : (
          <Outlet
            context={{
              allArticles,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
