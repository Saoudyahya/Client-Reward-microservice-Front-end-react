import { useState, useEffect } from 'react';
import { updateClient } from '../../../components/BackendAPI/ClientAPi';
import SelectCountryRegion from '../../../components/Forms/SelectGroup/SelectContryRegion';

const UpdateClientForm = ({Client,onClose,onRefetch}) => {
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    country: '',
    state: '',
    phone: '',
    address: ''
  });
  useEffect(() => {
    setFormData(Client)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCountryChange = (country:any) => {
    setFormData({
      ...formData,
      country: country
    });
  };
  const handleRegionChange = (region:any) => {
    setFormData({
      ...formData,
      state: region
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r=await updateClient(formData.id, formData);
     console.log(r);
     
      setFormData({
        id:'',
        name: '',
        email: '',
        country: '',
        state: '',
        phone: '',
        address: ''
      });
      onClose()
      onRefetch();
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
<>
      <div className="flex flex-col gap-9 mt-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Client Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
               <SelectCountryRegion
                  onCountryChange={handleCountryChange}
                  onRegionChange={handleRegionChange}
               
               ></SelectCountryRegion>

          
              </div>
              <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>  
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>  
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>  
        

            
                <div className="flex justify-between mt-4">
  <button className="flex-1 mr-2 rounded bg-green-500 p-3 font-medium text-white hover:bg-green-600" onClick={handleSubmit}>
    Update Client
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

export default UpdateClientForm;
