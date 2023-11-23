import { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import { Link, useHistory } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import Swal from "sweetalert2";
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import { useGetStores, useStoreSearch } from "../../../hooks/useGetStore";
import { useMutate } from "../../../hooks/useMutate";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import LoadingSpinner from "../../InitialPage/Sidebar/LoadingSpinner";

const StoreList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState(false);
  const [tableData, setTabledata] = useState([]);

  const { all_stores, refetch } = useGetStores();

  const mutuation = useMutate();
  const history = useHistory();

  useEffect(() => {
    if (all_stores?.data && keyword === "") {
      setTabledata(all_stores?.data);
      setQuery(false);
    }
  }, [all_stores, keyword]);

  const { store_search, isLoading } = useStoreSearch(query, keyword);

  useEffect(() => {
    if (keyword && store_search && query) {
      setTabledata(store_search?.data);
    }
  }, [keyword, query, store_search]);

  const handleSearch = () => {
    if (keyword) {
      setQuery(true);
    }
  };

  const handleEditNavigate = (data) => {
    history.push({
      pathname: `/store/edit-store/${data.storeId}`,
      state: data,
    });
  };

  const onDelete = (storeId) => {
    mutuation.mutate(
      {
        url: `/v1/StoreManagement/DeleteStore?storeId=${storeId}`,
        method: "Delete",
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            Swal.fire({
              type: "success",
              title: "Deleted!",
              text: res?.message,
              confirmButtonClass: "btn btn-success",
            });
            refetch();
          }
        },
        onError(err) {
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
          toast.error(errorMsg);
        },
      }
    );
  };

  const confirmDelete = async (storeId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    });
    if (isConfirmed) onDelete(storeId);
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Store Name",
      dataIndex: "storeName",
      sorter: (a, b) => a.storeName.length - b.storeName.length,
    },
    {
      title: "Store Owner",
      dataIndex: "storeOwner",
      sorter: (a, b) => a.storeOwner.length - b.storeOwner.length,
    },
    {
      title: "Phone",
      dataIndex: "contactPhone",
      sorter: (a, b) => a.contactPhone.length - b.contactPhone.length,
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    },
    {
      title: "Status",
      dataIndex: "isOpen",
      key: "isOpen",
      render: (e) => (
        <div className="status-toggle d-flex justify-content-between align-items-center">
          <input
            type="checkbox"
            id="user18"
            className="check"
            defaultChecked={e}
          />
          <label htmlFor="user18" className="checktoggle">
            checkbox
          </label>
        </div>
      ),
    },
    {
      title: "Action",
      render: (e) => {
        return (
          <>
            <a className="me-3" onClick={() => handleEditNavigate(e)}>
              <img src={EditIcon} alt="img" />
            </a>
            <button
              className="confirm-text"
              to="#"
              onClick={() => confirmDelete(e?.storeId)}
            >
              <img src={DeleteIcon} alt="img" />
            </button>
          </>
        );
      },
    },
  ];

  const printRef = useRef(null);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Store List</h4>
              <h6>Manage your Store</h6>
            </div>
            <div className="page-btn">
              <Link to="/store/addstore" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Store
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                setKeyword={setKeyword}
                keyword={keyword}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
              <div className="table-responsive">
                {tableData.length >= 1 ? (
                  <Table
                    ref={printRef}
                    columns={columns}
                    dataSource={tableData}
                  />
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreList;
