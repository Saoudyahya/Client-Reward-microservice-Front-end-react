import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import DefaultLayout from '../layout/DefaultLayout';
import User from '../components/Tables/User';
const UserTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Client Table" />
      <div className="flex flex-col gap-10">
      <User/>
       
      </div>
    </DefaultLayout>
  );
};

export default UserTables;
