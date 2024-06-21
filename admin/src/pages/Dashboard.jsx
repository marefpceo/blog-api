import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusCardSmall from '../components/StatusCardSmall';
import StatusCardLarge from '../components/StatusCardLarge';

function Dashboard() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [articleInfo, setArticleInfo] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    nonpublishedArticles: 0,
    edit_required: 0,
  });
  const [userInfo, setUserInfo] = useState({});
  const [siteCount, setSiteCount] = useState({});

  useEffect(() => {
    async function getDashboardInfo() {
      try {
        const response = await fetch('http://localhost:3000/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const responseData = await response.json();
        setArticleInfo(responseData.articleInfo);
        setUserInfo(responseData.userInfo);
        setSiteCount(responseData.siteCount);
      } catch (error) {
        console.error(error);
      }
    }
    getDashboardInfo();
  }, []);

  return (
    <section>
      <h1 className='text-4xl text-cust-silver'>Dashboard</h1>

      <div className='card-div mt-16 flex justify-evenly'>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall title={'Site Visits'} count={siteCount.siteVisits} />
          <StatusCardLarge
            title={'Weekly Site Details'}
            statusText1={'Visits This Week'}
            statusValue1={siteCount.weeklyVisits}
            statusText2={'New Users'}
            statusValue2={siteCount.weeklyUsers}
            statusText3={'Last Week Visits'}
            statusValue3={siteCount.lastWeekVisits}
            statusText4={'Likes'}
            statusValue4={siteCount.weeklyLikes}
          />
        </div>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall
            title={'Total Articles'}
            count={articleInfo.totalArticles}
          />
          <StatusCardLarge
            title={'Articles Details'}
            statusText1={'Total'}
            statusValue1={articleInfo.totalArticles}
            statusText2={'Drafts / Edits'}
            statusValue2={articleInfo.edit_required}
            statusText3={'Published'}
            statusValue3={articleInfo.publishedArticles}
            statusText4={'Nonpublished'}
            statusValue4={articleInfo.nonpublishedArticles}
          />
        </div>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall title={'Total Users'} count={userInfo.totalUsers} />
          <StatusCardLarge
            title={'Users Details'}
            statusText1={'Total'}
            statusValue1={userInfo.regularUsers}
            statusText2={'Weekly Signups'}
            statusValue2={0}
            statusText3={'Administrators'}
            statusValue3={userInfo.totalAdmins}
            statusText4={'Editors'}
            statusValue4={userInfo.totalEditors}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
