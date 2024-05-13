import StatusCard from '../components/StatusCard';
import ArticleStatusCard from '../components/ArticleStatusCard';

function Dashboard({ className }) {
  return (
    <section className={className}>
      <h1 className='text-4xl text-cust-silver'>Dashboard</h1>

      <div className='card-div my-14 flex justify-evenly'>
        <StatusCard title={'Site Visits'} count={12} />
        <StatusCard title={'New Users'} count={4} />
        <StatusCard title={'Comments'} count={9} />
        <StatusCard title={'Total Likes'} count={20} />
      </div>
      <div className='med-card-div flex justify-evenly'>
        <ArticleStatusCard
          title={'Articles Status'}
          total={23}
          draft={3}
          published={13}
          notPublished={10}
        />
      </div>
    </section>
  );
}

export default Dashboard;
