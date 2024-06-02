import StatusCardSmall from '../components/StatusCardSmall';
import StatusCardLarge from '../components/StatusCardLarge';

function Dashboard() {
  return (
    <section>
      <h1 className='text-4xl text-cust-silver'>Dashboard</h1>

      <div className='card-div mt-16 flex justify-evenly'>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall title={'Site Visits'} count={12} />
          <StatusCardLarge
            title={'Site Details'}
            statusText1={'Visits'}
            statusValue1={6}
            statusText2={'New Users'}
            statusValue2={0}
            statusText3={'New Comments'}
            statusValue3={3}
            statusText4={'Likes'}
            statusValue4={3}
          />
        </div>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall title={'Total Articles'} count={4} />
          <StatusCardLarge
            title={'Articles Details'}
            statusText1={'Total'}
            statusValue1={6}
            statusText2={'Drafts / Edits'}
            statusValue2={0}
            statusText3={'Published'}
            statusValue3={3}
            statusText4={'Nonpublished'}
            statusValue4={3}
          />
        </div>
        <div className='flex flex-col items-center gap-20'>
          <StatusCardSmall title={'Total Users'} count={9} />
          <StatusCardLarge
            title={'Users Details'}
            statusText1={'Total'}
            statusValue1={6}
            statusText2={'Drafts / Edits'}
            statusValue2={0}
            statusText3={'Published'}
            statusValue3={3}
            statusText4={'Nonpublished'}
            statusValue4={3}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
