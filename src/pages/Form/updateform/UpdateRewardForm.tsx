import { useState,useEffect } from 'react';

import { createReward } from '../../../components/BackendAPI/RewardAPI';
import SelectRewardType from '../../../components/Forms/SelectGroup/SelectRewardType';
import SelectClientEmail from '../../../components/Forms/SelectGroup/SelectClientEmail';
import DatePickerOne from '../../../components/Forms/DatePicker/DatePickerOne';
const UpdateRewardtForm = ({Reward,onClose,onRefetch}) => {
  const [formData, setFormData] = useState({
    id:'',
    PointsEarned: '',
    client:{
   id: '',
    },
    rewardType: {
      id:'',
    },
    DateEarned:'',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => {
    setFormData(Reward)
    console.log(Reward);
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReward(formData);
      console.log(formData);
      
      setFormData({
        id:'',
        PointsEarned: '',
        client:{
          id: '',
           },
           rewardType: {
            id:'',
          },
          DateEarned:'',
      });
      onClose()
      onRefetch()
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error creating RewardtForm:', error);
    }
    
  };
  const handleClientChange = (selectedClient: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      client: {
        ...prevFormData.client,
        id: selectedClient,
      },
    }));
  };
  const handleDateChange = (selectedDate:any) => {
    setFormData(prevFormData => ({ ...prevFormData, DateEarned: selectedDate }));
  };
  const handleRewardTypeChange = (selectedType:any) => {
    console.log(selectedType);
    
    setFormData(prevFormData => ({ ...prevFormData,   rewardType: {
      ...prevFormData.rewardType,
      id: selectedType,
    }, }));
  };
  return (
  <>
      <div className="flex flex-col gap-9 mt-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
            Reward Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              
               

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                  point
                  </label>
                  <input
                    type="number"
                    name="PointsEarned"
                    value={formData.PointsEarned}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                <DatePickerOne onDateChange={handleDateChange} />
                </div>
              </div>
              
              <SelectClientEmail onClientChange={handleClientChange} formSubmitted={formSubmitted} />


              <div className="mb-6">
                 <SelectRewardType  onRewardTypeChange={handleRewardTypeChange}></SelectRewardType>
              </div>

              <div className="flex justify-between mt-4">
  <button className="flex-1 mr-2 rounded bg-green-500 p-3 font-medium text-white hover:bg-green-600" onClick={handleSubmit}>
    Update Reward
  </button>
  <button className="flex-1 rounded bg-red-500 p-3 font-medium text-white hover:bg-red-600" onClick={onClose}>
    Cancel
  </button>
</div>
            </div>
          </form>
        </div>
      </div>
      </>
  );
};

export default UpdateRewardtForm;
