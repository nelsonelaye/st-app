import PosLeft from './posleft';
import Transactions from './transactions';
import CountUp from 'react-countup';
import Metric from './Metric';
import PosRight from './posRight';
// import { useHistory } from 'react-router-dom';
import { formatCurrency } from '../../../../utils/helpers';
import { useState } from 'react';
import { useGetSaleStatistics } from '../../../../hooks/useGetSale';
import { LoadingAbsolute } from '../../../components/Loading';
import { useProductList } from '../../../../hooks/useProductList';
import { useGetAllCustomers } from '../../../../hooks/useGetCustomer';
import { memo } from 'react';

const Pos = () => {
  const { product_list, refetch_list, isLoading: pLoading } = useProductList();
  const { customers_list, isLoading: cLoading } = useGetAllCustomers();
  const { sale_statistics, isLoading: sLoading } = useGetSaleStatistics();
  // const history = useHistory();

  const [sale, setSale] = useState({
    items: [],
    // customer: { code: '', name: '' },
    paymentMethods: [],
  });

  const addToCart = (product) => {
    if (product.quantity < 1) return;
    setSale((x) => {
      const items = x.items;
      if (items.some((y) => y.id === product.id)) {
        return { ...x, items };
      } else {
        return { ...x, items: [...items, { ...product, quantity: 1 }] };
      }
    });
  };

  return (
    <>
      {(cLoading || pLoading || sLoading) && <LoadingAbsolute />}
      <div className='main-wrappers'>
        <div className='page-wrapper'>
          <div className='content'>
            <Metrics sale_statistics={sale_statistics} />
            <div className='row'>
              <PosLeft
                addToCart={addToCart}
                product_list={product_list}
                refetch_list={refetch_list}
              />
              <PosRight
                setSale={setSale}
                sale={sale}
                customers_list={customers_list}
              />
            </div>

            {/* <div className='col-lg-12'>
              <button
                // disabled={!isDirty}
                // type='submit'
                className='btn btn-submit me-2'>
                Preview
              </button>
              <button
                type='button'
                className='btn btn-cancel'
                onClick={() => history.goBack()}>
                Cancel
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Transactions />
    </>
  );
};

const Metrics = memo(({ sale_statistics }) => {
  const data = sale_statistics?.data;

  return (
    <div className='row'>
      <Metric value={data?.totalSalesCount || 0} text='Total Sold Items' />
      <Metric
        value={data?.todaysSalesAmount || 0}
        currency
        text='Total Sales Amount'
      />
      <Metric
        value={data?.generatedReceiptsCount || 0}
        text='Generated Receipts'
      />
      <Metric value={data?.soldProductsCount || 0} text='Sold Products' />
      <div className='col-lg-3 col-sm-6 col-12'>
        <div className='dash-widget'>
          <div className='dash-widgetcontent'>
            <h5 className='counters'>
              <CountUp
                formattingFn={(n) => formatCurrency(n)}
                end={data?.todaysSalesAmount || 0}
              />
            </h5>
            <h6>Today Sales </h6>
          </div>

          <div className='dash-widgetcontent'>
            <h5 className='counters'>
              <CountUp
                formattingFn={(n) => formatCurrency(n)}
                end={data?.yesterdaySalesAmount || 0}
              />
            </h5>
            <h6>Yesterday Sales</h6>
          </div>
        </div>
      </div>
    </div>
  );
});

Metrics.displayName = 'Metrics';

export default Pos;
