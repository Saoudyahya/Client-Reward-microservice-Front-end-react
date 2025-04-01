import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { createReward } from '../../components/BackendAPI/RewardAPI';
import SelectRewardType from '../../components/Forms/SelectGroup/SelectRewardType';
import SelectClientEmail from '../../components/Forms/SelectGroup/SelectClientEmail';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
const RewardtForm = () => {
  const [formData, setFormData] = useState({
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
        PointsEarned: '',
        client:{
          id: '',
           },
           rewardType: {
            id:'',
          },
          DateEarned:'',
      });
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
    <DefaultLayout>
      <Breadcrumb pageName="Reward" />
      <div className="flex flex-col gap-9">
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
                    type="text"
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

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">
                Upload Reward
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RewardtForm;
