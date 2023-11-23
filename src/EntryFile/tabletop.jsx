import { Link } from 'react-router-dom';
import {
  ClosesIcon,
  Filter,
  Printer,
  Search,
  search_whites,
} from '../EntryFile/imagePath';
import { ExportToExcel } from '../components/ExportExcel';
import ReactToPrint from 'react-to-print';
import { useState } from 'react';

const Tabletop = ({
  inputfilter,
  togglefilter,
  setKeyword,
  keyword,
  handleSearch,
  isLoading,
}) => {
  return (
    <div className='table-top'>
      <div className='search-set'>
        <div className='search-path'>
          <button
            className={` btn ${
              inputfilter ? 'btn-filter setclose' : 'btn-filter'
            } `}
            id='filter_search'
            onClick={() => togglefilter(!inputfilter)}>
            <img src={Filter} alt='img' />
            <span>
              <img src={ClosesIcon} alt='img' />
            </span>
          </button>
        </div>
        <div className='search-input'>
          <input
            className='form-control form-control-sm search-icon'
            type='text'
            placeholder='Search...'
            value={keyword}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== '') {
                setKeyword(value);
              } else {
                handleSearch(undefined);
                setKeyword(value);
              }
            }}
          />
          <Link to='#' className='btn btn-searchset'>
            <img src={Search} alt='img' />
          </Link>
        </div>
        <div className='ms-2'>
          <div className='form-group mb-0'>
            <button
              disabled={keyword?.length < 1}
              className='btn btn-filters'
              onClick={() => handleSearch(keyword)}>
              {isLoading ? (
                <div
                  className='spinner-border'
                  style={{ height: '1.2rem', width: '1.2rem' }}></div>
              ) : (
                <img src={search_whites} alt='img' />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className='wordset'>
        {/* <ul>
          <li>
            <ExportToExcel apiData={excelData} fileName={excelFilename} />
          </li>
          <ReactToPrint
            trigger={() => (
              <button data-tip='Print'>
                <img src={Printer} alt='img' />
              </button>
            )}
            content={refFn}
          />
          <li></li>
        </ul> */}
      </div>
    </div>
  );
};

export default Tabletop;

export const TableHeader = ({
  inputfilter,
  togglefilter,
  handleSearch,
  excelData,
  excelFilename,
  refFn,
  children,
}) => {
  const [keyword, setKeyword] = useState();

  return (
    <div className='table-top'>
      <div className='d-flex flex-column flex-md-row gap-4 w-100'>
        <div className='search-set'>
          <div className='search-path'>
            <button
              className={` btn ${
                inputfilter ? 'btn-filter setclose' : 'btn-filter'
              } `}
              id='filter_search'
              onClick={() => togglefilter(!inputfilter)}>
              <img src={Filter} alt='img' />
              <span>
                <img src={ClosesIcon} alt='img' />
              </span>
            </button>
          </div>
          <div className='search-input'>
            <input
              className='form-control form-control-sm search-icon'
              type='text'
              placeholder='Search...'
              value={keyword}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 0) {
                  setKeyword(value);
                } else {
                  handleSearch(undefined);
                  setKeyword(value);
                }
              }}
            />
            <Link to='#' className='btn btn-searchset'>
              <img src={Search} alt='img' />
            </Link>
          </div>
          <div className='ms-2'>
            <div className='form-group mb-0'>
              <button
                disabled={keyword?.length < 1}
                className='btn btn-filters'
                onClick={() => handleSearch(keyword)}>
                <img src={search_whites} alt='img' />
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>

      <div className='wordset'>
        <ul>
          <li>
            <ExportToExcel apiData={excelData} fileName={excelFilename} />
          </li>
          <ReactToPrint
            trigger={() => (
              <button
                disabled={!excelData || excelData?.length < 1}
                data-tip='Print'>
                <img src={Printer} alt='img' />
              </button>
            )}
            content={refFn}
          />
          <li></li>
        </ul>
      </div>
    </div>
  );
};
