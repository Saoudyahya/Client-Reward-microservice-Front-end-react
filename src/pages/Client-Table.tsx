import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import DefaultLayout from '../layout/DefaultLayout';
import Client from '../components/Tables/ClientTable';
const ClientTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Client Table" />
      <div className="flex flex-col gap-10">
      <Client/>
       
      </div>
    </DefaultLayout>
  );
};

export default ClientTables;
