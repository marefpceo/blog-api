import { useState, useEffect } from 'react';

function Users() {
  const token = localStorage.getItem('token');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUserList() {
      try {
        const response = await fetch('http://localhost:3000/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const responseData = await response.json();
        setUserList(responseData.users);
      } catch (error) {
        console.error(error);
      }
    }
    getUserList();
  }, []);

  console.log(userList);

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
                  className='cursor-pointer px-4 py-2 text-cust-beige hover:bg-cust-english-violet/20'
                  key={user._id}
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
            <h2>Last Name, First Name</h2>

            <div className='mt-4'>
              <div className='username flex gap-4'>
                <p>
                  <strong>Username:</strong>
                </p>{' '}
                <p>user1</p>
              </div>
              <div className='user-email flex gap-4'>
                <p>
                  <strong>Email:</strong>
                </p>{' '}
                <p>someEmail@abc.com</p>
              </div>
              <div className='role flex gap-4'>
                <p>
                  <strong>Role:</strong>
                </p>{' '}
                <p>user</p>
              </div>
              <div className='admin-status flex gap-4'>
                <p>
                  <strong>Admin?:</strong>
                </p>{' '}
                <p>No</p>
              </div>
              <div className='signup-date flex gap-4'>
                <p>
                  <strong>User Since:</strong>
                </p>{' '}
                <p>2/24/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
