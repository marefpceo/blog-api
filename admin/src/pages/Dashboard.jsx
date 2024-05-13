import StatusCard from '../components/StatusCard';

function Dashboard({ className }) {
  return (
    <section className={className}>
      <h1 className='text-4xl text-cust-beige'>Dashboard</h1>

      <div className='card-div mt-10 flex justify-evenly'>
        <StatusCard title={'Site Visits'} count={12} />
        <StatusCard title={'New Users'} count={4} />
        <StatusCard title={'Comments'} count={9} />
        <StatusCard title={'Total Likes'} count={20} />
      </div>
    </section>
  );
}

export default Dashboard;
