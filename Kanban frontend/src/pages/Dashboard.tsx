import BoardPage from '@/components/Dashboard/BoardPage';
import Sidebar from '@/components/Dashboard/Sidebar';


const Dashboard = () => {

  return (
    <div className="flex h-screen">
        <Sidebar/>
        <BoardPage/>
    </div>
  );
};

export default Dashboard;