import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

function Users() {
  const token = localStorage.getItem('token');
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function getUserList() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const responseData = await response.json();
        setUserList(responseData.users);
        setCurrentUser(responseData.users[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getUserList();
  }, []);

  function handleUserClick(userId) {
    const user = userList.find((user) => {
      return user.id === userId;
    });
    setCurrentUser(user);
  }

  return (
    <>
      <h1 className='text-4xl text-cust-silver'>Users</h1>

      <div className='mt-12 flex h-3/4 flex-1'>
        <div className='flex w-1/4 flex-col justify-center'>
          <div
            className='user-list mx-auto my-4 flex h-full w-4/5 rounded-sm bg-cust-silver/15 
            shadow-inner shadow-cust-english-violet/80'
          >
            <ul className='w-full'>
              {userList.map((user) => (
                <li
                  className={`${currentUser.id === user.id ? 'bg-cust-english-violet/20' : ''} 
                    cursor-pointer px-4 py-2 text-cust-beige hover:bg-cust-english-violet/20`}
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                >
                  {user.last_name}, {user.first_name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex w-3/4 flex-col justify-center px-4'>
          <div
            className='user-info my-4 flex h-full w-5/6 flex-col rounded-sm bg-cust-silver px-4 
            py-2 text-cust-english-violet shadow-md shadow-cust-english-violet/50'
          >
            <h2>
              {currentUser.first_name}, {currentUser.last_name}
            </h2>

            <div className='mt-4'>
              <div className='username flex gap-4'>
                <p>
                  <strong>Username:</strong>
                </p>
                <p>{currentUser.username}</p>
              </div>
              <div className='user-email flex gap-4'>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{currentUser.email}</p>
              </div>
              <div className='role flex gap-4'>
                <p>
                  <strong>Role:</strong>
                </p>
                <p>{currentUser.role}</p>
              </div>
              <div className='admin-status flex gap-4'>
                <p>
                  <strong>Admin?:</strong>
                </p>
                <p>{currentUser.isAdmin === true ? 'Yes' : 'No'}</p>
              </div>
              <div className='signup-date flex gap-4'>
                <p>
                  <strong>User Since:</strong>
                </p>
                <p>{DateTime.fromISO(currentUser.createdAt).toLocaleString(DateTime.DATE_FULL)}</p>
              </div>
              <div className='signup-date flex gap-4'>
                <p>
                  <strong>Last Updated:</strong>
                </p>
                <p>{DateTime.fromISO(currentUser.updatedAt).toLocaleString(DateTime.DATE_FULL)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
