import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import DefaultLayout from '../layout/DefaultLayout';
import Reward from '../components/Tables/Reward';
const RewardTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rewards Table" />
      <div className="flex flex-col gap-10">
    <Reward/>
       
      </div>
    </DefaultLayout>
  );
};

export default RewardTables;
