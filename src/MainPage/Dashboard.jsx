import {
  Dash1,
  Dash10,
  Dash2,
  Dash3,
  Dash4,
  Dash7,
  Dropdown,
} from '../EntryFile/imagePath';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Helmet } from 'react-helmet';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import {
  useDashboardChartData,
  useDashboardData,
} from '../../hooks/useGetDashboard';
import { LoadingAbsolute } from '../components/Loading';
import { useState } from 'react';
import { memo } from 'react';

const Dashboard = () => {
  const [chartDate, setChartDate] = useState('2023');
  const { dashboard_data, isLoading } = useDashboardData();
  const { dashboard_chart_data, isLoading: cLoading } = useDashboardChartData(chartDate);

  const data = dashboard_data?.data;
  const todayscount = data?.todayscount;
  const thisMonthCount = data?.thisMonthCount;

  return (
    <>
      {(isLoading || cLoading) && <LoadingAbsolute />}
      <div className='page-wrapper'>
        <Helmet>
          <title>Sales Track</title>
          <meta name='description' content='Dashboard page' />
        </Helmet>
        <div className='content'>
         
          <h3 className='card-title'>Today</h3>

          <div className='row'>
            <MetricBlock
              href='/sales/history'
              text={'Total Sales Count'}
              value={todayscount?.sales?.totalSalesCount}
              src={Dash1}
            />
            <MetricBlock
              // href='/sales/history'
              text={'Sales Amount'}
              value={todayscount?.todaysSalesAmount}
              src={Dash2}
            />

            <MetricBlock
              // href='/sales/history'
              text={'Generated Receipts'}
              value={todayscount?.sales?.generatedReceiptsCount}
              src={Dash7}
            />

            <MetricBlock
              // href='/inventory/inventorylist'
              text={'Sold Products(QTY)'}
              value={todayscount?.sales?.soldProductsCount}
              src={Dash3}
            />

            <MetricBlock
              href='/expense/expenselist'
              text={'Total Expenses'}
              value={todayscount?.expenses?.totalExpensesCount}
              src={Dash4}
            />

            <MetricBlock
              // href='/expense/expenselist'
              text={'Total Expenses Amount'}
              value={todayscount?.expenses?.totalExpensesAmount}
              src={Dash10}
            />
          </div>

          <h3 className='card-title'>This Month</h3>

          <div className='row'>
            <MetricBlock2
              // href='/sales/history'
              bgClassName={'das2'}
              icon={'dollar-sign'}
              text={'Sales Amount'}
              value={thisMonthCount?.thisMonthSalesAmount}
              src={Dash1}
              currency
            />
            <MetricBlock2
              href='/sales/history'
              bgClassName={'das4'}
              icon={'file-text'}
              text={'Total Sales Count'}
              value={thisMonthCount?.sales?.totalSalesCount}
              src={Dash1}
            />

            <MetricBlock2
              // href='/sales/history'
              bgClassName={'das3'}
              icon={'book'}
              text={'Generated Receipts'}
              value={thisMonthCount?.sales?.generatedReceiptsCount}
              src={Dash2}
            />

            <MetricBlock2
              href='/sales/history'
              bgClassName={'das2'}
              icon={'shopping-cart'}
              text={'Sold Products(QTY)'}
              value={thisMonthCount?.sales?.soldProductsCount}
              src={Dash2}
            />

            <MetricBlock2
              href='/inventory/inventorylist'
              bgClassName={'das2'}
              icon={'corner-up-right'}
              text={'Total Purchase'}
              value={thisMonthCount?.purchases?.totalPurchase}
              src={Dash2}
            />

            <MetricBlock2
              // href='/inventory/inventorylist'
              bgClassName={'das4'}
              icon={'dollar-sign'}
              text={'Total Purchase Amount'}
              value={thisMonthCount?.purchases?.totalAmount}
              src={Dash2}
              currency
            />

            <MetricBlock2
              href='/inventory/inventorylist'
              bgClassName={'das3'}
              icon={'corner-up-right'}
              text={'Last Month Total Purchase'}
              value={thisMonthCount?.purchases?.lastMonthTotalPurchase}
              src={Dash2}
            />

            <MetricBlock2
              href='/inventory/inventorylist'
              bgClassName={'das2'}
              icon={'dollar-sign'}
              text={'Last Month Total Purchase Amount'}
              value={thisMonthCount?.purchases?.lastMonthTotalAmount}
              src={Dash2}
            />

            <MetricBlock2
              href='/product/productlist-product'
              bgClassName={'das2'}
              icon={'package'}
              text={'All Products'}
              value={thisMonthCount?.products?.allProducts}
              src={Dash2}
            />

            <MetricBlock2
              href='/sales/in-stock-products'
              bgClassName={'das4'}
              icon={'package'}
              text={'In Stock Products'}
              value={thisMonthCount?.products?.inStockProducts}
              src={Dash2}
            />

            <MetricBlock2
              href='/sales/out-stock-products'
              bgClassName={'das3'}
              icon={'package'}
              text={'Out Of Stock Products'}
              value={thisMonthCount?.products?.outOfStockProducts}
              src={Dash2}
            />

            <MetricBlock2
              href='/people/customerlist-people'
              bgClassName={'das2'}
              icon={'users'}
              text={'New Customers'}
              value={thisMonthCount?.customers?.newCustomers}
              src={Dash2}
            />

            <MetricBlock2
              href='/people/customerlist-people'
              bgClassName={'das2'}
              icon={'users'}
              text={'All Customers'}
              value={thisMonthCount?.customers?.allCustomers}
              src={Dash2}
            />
            <MetricBlock2
              href='/expense/expenselist'
              bgClassName={'das4'}
              icon={'corner-right-down'}
              text={'Total Expenses'}
              value={thisMonthCount?.expenses?.totalExpensesCount}
              src={Dash2}
            />

            <MetricBlock2
              // href='/expense/expenselist'
              bgClassName={'das3'}
              icon={'dollar-sign'}
              text={'Total Expenses Amount'}
              value={thisMonthCount?.expenses?.totalExpensesAmount}
              currency
              src={Dash2}
            />
          </div>
          {/* Button trigger modal */}
          <ChartComponent
            dashboard_chart_data={dashboard_chart_data}
            chartDate={chartDate}
            setChartDate={setChartDate}
          />
          <div className='d-flex justify-content-center'>
            <p>
              &copy;{' '}
              <span>
                <a
                  style={{ color: 'black', textDecoration: 'underline' }}
                  href='https://kaybilltech.com'
                  target='blank'>
                  KAYBILL TECHNOLOGIES
                </a>
              </span>
              , All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ChartComponent = ({ dashboard_chart_data, chartDate, setChartDate }) => {
  const data = dashboard_chart_data?.data?.monthlySalesPurchaseChart;

  const purchases = data?.map((x) => x.totalPurchaseQuantity) || [];
  const sales = data?.map((x) => x.totalSalesQuantity) || [];
  const instockProducts = data?.map((x) => x.inStockQuantity) || [];

  const months = data?.map((x) => x.monthName) || [];

  const state = {
    series: [
      {
        name: 'Purchase',
        data: purchases,
      },
      {
        name: 'Sales',
        data: sales,
      },

      {
        name: 'Instock',
        data: instockProducts,
      },
    ],
    options: {
      colors: ['#28C76F', '#EA5455', '#fd7e14'],
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,

        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 280,
          options: {
            legend: {
              position: 'bottom',
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          borderRadius: 5,
          borderRadiusTop: 5,
        },
      },
      xaxis: {
        categories: months,
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div className='row'>
      <div className='col-lg-12 d-flex'>
        <div className='card flex-fill'>
          <div className='card-header pb-0 d-flex justify-content-between align-items-center'>
            <h5 className='card-title mb-0'>
              Purchase vs Sales vs Product In Stock Chart
            </h5>
            <div className='graph-sets'>
              <div className='dropdown'>
                <button
                  className='btn btn-white btn-sm dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  {chartDate}
                  <img src={Dropdown} alt='img' className='ms-2' />
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'>
                  <li>
                    <button
                      onClick={() => setChartDate('2023')}
                      className='dropdown-item'>
                      2023
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setChartDate('2022')}
                      className='dropdown-item'>
                      2022
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setChartDate('2021')}
                      className='dropdown-item'>
                      2021
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <Chart
              options={state.options}
              series={state.series}
              type='bar'
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBlock = memo(({ value, text, src, href }) => {
  return (
    <>
      {!href ? (
        <div className='col-lg-3 col-sm-6 col-12'>
          <div className='dash-widget'>
            <div className='dash-widgetimg'>
              <span>
                <img src={src} alt='img' />
              </span>
            </div>
            <div className='dash-widgetcontent'>
              <h5>
                <span className='counters'>
                  <CountUp end={value} />
                </span>
              </h5>
              <h6>{text}</h6>
            </div>
          </div>
        </div>
      ) : (
        <Link to={href} className='col-lg-3 col-sm-6 col-12'>
          <div className='dash-widget'>
            <div className='dash-widgetimg'>
              <span>
                <img src={src} alt='img' />
              </span>
            </div>
            <div className='dash-widgetcontent'>
              <h5>
                <span className='counters'>
                  <CountUp end={value} />
                </span>
              </h5>
              <h6>{text}</h6>
            </div>
          </div>
        </Link>
      )}
    </>
  );
});

MetricBlock.displayName = 'MetricBlock';

const MetricBlock2 = ({
  value,
  text,
  icon,
  bgClassName,
  href,
  currency = false,
}) => {
  return (
    <>
      {!href ? (
        <div className='col-lg-3 col-sm-6 col-12 d-flex'>
          <div className={`dash-count ${bgClassName}`}>
            <div className='dash-counts'>
              <h4>
                {currency
                  ? `${
                      value?.toLocaleString('en', { currency: 'NGN' }) || ''
                    }.00`
                  : value}
              </h4>
              <h5>{text}</h5>
            </div>
            <div className='dash-imgs'>
              <FeatherIcon icon={icon} />
            </div>
          </div>
        </div>
      ) : (
        <Link to={href} className='col-lg-3 col-sm-6 col-12 d-flex'>
          <div className={`dash-count ${bgClassName}`}>
            <div className='dash-counts'>
              <h4>{value}</h4>
              <h5>{text}</h5>
            </div>
            <div className='dash-imgs'>
              <FeatherIcon icon={icon} />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Dashboard;
