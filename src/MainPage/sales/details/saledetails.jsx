import { useGetSale } from '../../../../hooks/useGetSale';
import { useParams } from 'react-router-dom';
import Details from './details';
import { Printer } from '../../../EntryFile/imagePath';
import { ExportToExcel } from '../../../components/ExportExcel';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { Loading } from '../../../components/Loading';
import { Link } from 'react-router-dom';
import ArrowLeft from 'feather-icons-react/build/IconComponents/ArrowLeft';

const SalesDetail = () => {
  const id = useParams()?.id;
  const ref = useRef(null);
  const { sale, isLoading } = useGetSale(id);
  const data = sale?.data;
  if (isLoading) return <Loading />;

  return (
    <div className='page-wrapper'>
      {/* {isLoading && <LoadingAbsolute />} */}
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Sale Details</h4>
            <h6>View sale details</h6>
            <div className='my-3'>
              <Link to='/sales/history' className='mb-3'>
                <ArrowLeft />
                <span className='ms-2'>Go back</span>
              </Link>
            </div>
          </div>
        </div>
        <Details data={data} ref={ref}>
          <li>
            <ExportToExcel apiData={data?.itemsDescription} fileName={'sale'} />
          </li>
          <li>
            <ReactToPrint
              trigger={() => (
                <button data-tip='Print'>
                  <img src={Printer} alt='img' />
                </button>
              )}
              content={() => ref.current}
            />
          </li>
        </Details>
      </div>
    </div>
  );
};

export default SalesDetail;
