import { useState, useEffect, useRef } from 'react';
import { getAllRewards, deleteReward } from '../BackendAPI/RewardAPI';
import UpdateRewardtForm from '../../pages/Form/updateform/UpdateRewardForm';
const Reward = () => {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const rewardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rewardsData = await getAllRewards();
        setRewards(rewardsData);
        console.log(rewardsData);
      } catch (error) {
        console.error('Error fetching rewards data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    rewardRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowUpdateForm(false); 
  };

  const handleClosePopUp = () => {
    setSelectedReward(null);
  };
  
  const handleUpdateReward = () => {
    setShowUpdateForm(true);
  };

  const handleDeleteReward = async () => {
    try {
      await deleteReward(selectedReward.id);
      setRewards(rewards.filter(reward => reward.id !== selectedReward.id));
      setSelectedReward(null);
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };
  const handleDataRefetch = async () => {
    try {
      const updatedRewardData = await getAllRewards();
      setRewards(updatedRewardData);
      if (selectedReward) {
        const updatedSelectedReward = rewards.find(Reward => Reward.id === updatedRewardData.id);
        setSelectedReward(updatedSelectedReward);
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  const filteredRewards = rewards.filter(reward =>
    reward.client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={rewardRef} />
      {selectedReward && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Reward Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Client Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">ID:</span> {selectedReward.client.id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> {selectedReward.client.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Email:</span> {selectedReward.client.email}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Country:</span> {selectedReward.client.country}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">State:</span> {selectedReward.client.state}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
            <h2 className="text-lg font-semibold mb-2">Reward Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Reward Type:</span> {selectedReward.rewardType.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Points Earned:</span> {selectedReward.pointsEarned}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Date Earned:</span> {selectedReward.dateEarned ? new Date(selectedReward.dateEarned).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
              Close
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateReward}>
            Update
          </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteReward}>
              Delete
            </button>
          </div>
          {showUpdateForm && <UpdateRewardtForm Reward={selectedReward}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredRewards.map((reward, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Reward Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Client Name:</span> {reward.client.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Reward Type:</span> {reward.rewardType.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Points Earned:</span> {reward.pointsEarned}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleRewardClick(reward)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reward;
