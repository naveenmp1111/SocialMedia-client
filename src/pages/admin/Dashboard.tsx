import { useState, useEffect } from 'react'
import { Bar, Pie, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSocket } from '../../contexts/SocketContext';
import { getAllPostForAdmin, getAllUsers, getMonthlyData, getPostReports, getWeeklyData, getYearlyData } from '../../api/admin';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  ArcElement,

);

const Dashboard = () => {

  useEffect(() => {
    fetchWeeklyData()
    fetchAllUsers()
    fetchPostReports()
    fetchAllPosts()
  }, [])


  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });
  const [dataType,setDataType]=useState<string>('year')
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalReports, setTotalReports] = useState<number>(0)
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const { onlineUsers } = useSocket()
  const updateChartData = (data: any) => {
    setChartData({
      labels: data.labels,
      datasets: [
        {
          label: 'Users',
          data: data.users,
          backgroundColor: 'rgba(100, 217, 217, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Posts',
          data: data.posts,
          backgroundColor: 'rgba(255, 99, 132,5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  };


  const fetchWeeklyData = async () => {
    setDataType('week')
    const { weeklyData } = await getWeeklyData();
    updateChartData(weeklyData);
  };

  const fetchMonthlyData = async () => {
    setDataType('month')
    const { monthlyData } = await getMonthlyData();
    updateChartData(monthlyData);
  };

  const fetchYearlyData = async () => {
    setDataType('year')
    const { yearlyData } = await getYearlyData();
    updateChartData(yearlyData);
  };

  const fetchAllUsers = async () => {
    try {
      const { users } = await getAllUsers()
      setTotalUsers(users.length)

    } catch (error) {
      console.log('error in getting all usrs for admin')
    }
  }

  const fetchAllPosts = async () => {
    try {
      const { posts } = await getAllPostForAdmin()
      setTotalPosts(posts.length)
    } catch (error) {
      console.log('error in fetching the post for admin', error)
    }
  }

  const fetchPostReports = async () => {
    try {
      const { reports } = await getPostReports()
      setTotalReports(reports.length)
    } catch (error) {
      console.log('error in fetching post reports ', error)
    }
  }



  const data1 = {
    labels: ['Offline Users', 'Users Online'],
    datasets: [
      {
        label: 'No: of Users ',
        data: [totalUsers - (onlineUsers ? onlineUsers?.length : 0), onlineUsers?.length ? onlineUsers?.length-1 : 0],
        backgroundColor: [
          'blue', // Blue for Total Users
          '#39ff14'  // Green for Users Online
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',   // Blue for Total Users
          'rgba(75, 192, 192, 1)'    // Green for Users Online
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Online Status',
      },
    },
  };

  return (
    <>
      <div className="mt-15">
        <h1 className='font-bold text-gray-600 text-3xl m-5'>Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-5">
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 ">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-3xl font-semibold">{totalUsers}</div>
              </div>
              <div className="text-xl font-medium text-gray-400">Users</div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-3xl font-semibold">{totalPosts}</div>
              </div>
              <div className="text-xl font-medium text-gray-400">Posts</div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div>
              <div className="text-3xl font-semibold mb-1">{totalReports} </div>
              <div className="text-lg font-medium text-gray-400">Reports</div>
            </div>
          </div>
        </div>
        <div className='flex mt-16'>
          <div className='w-8/12 h-96 '>

            <Bar data={chartData} />
            <div className='w-full flex justify-center mt-5'>
              <div>
                <button  className={`m-3 ${dataType=='week' ? 'bg-gray-900 text-white shadow-lg shadow-gray-700' : 'bg-white'} p-1 rounded-lg px-2 `} onClick={fetchWeeklyData}>Weekly</button>
                <button  className={`m-3 ${dataType=='month' ? 'bg-gray-900 text-white shadow-lg shadow-gray-700' : 'bg-white'} p-1 rounded-lg px-2 `} onClick={fetchMonthlyData}>Monthly</button>
                <button  className={`m-3 ${dataType=='year' ? 'bg-gray-900 text-white shadow-lg shadow-gray-700' : 'bg-white'} p-1 rounded-lg px-2 `} onClick={fetchYearlyData}>Yearly</button>
              </div>
            </div>
          </div>
          <div className='w-4/12 h-96 '>
            <Doughnut data={data1} options={doughnutOptions} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard