import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import {
  useProductByBrand,
  useProductByCat,
  // useProductByCode,
  useProductByStore,
  useProductSearch,
} from "../../../hooks/useProductList";
import { useGetStores } from "../../../hooks/useGetStore";
import {
  convertArray,
  convertStore,
  monthList,
} from "../../../utils/convertArray";
import { useBrandList } from "../../../hooks/useBrandList";
import { useMainCategory } from "../../../hooks/useProductCategory";
import { useProductList } from "../../../hooks/useProductList";
import { useMutate } from "../../../hooks/useMutate";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../InitialPage/Sidebar/LoadingSpinner";
import moment from "moment";

const data = [
  { label: "Store", value: "store" },
  { label: "Category", value: "Category" },
  { label: "Brand", value: "Brand" },
  { label: "Expiring Date", value: "Expiring Date" },
];

const ProductList = () => {
  const history = useHistory();
  const mutuation = useMutate();
  const [loading, setLoading] = useState(false);
  // const [Searchloading, setsearchLoading] = useState(false);
  const [inputfilter, setInputfilter] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [storeId, setStoreId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [catId, setCatId] = useState("");
  const [keyword, setKeyword] = useState("");
  // const [code, setCode] = useState('');
  const [query, setQuery] = useState(false);
  const [tableData, setTabledata] = useState([]);

  const { product_list, refetch_list } = useProductList();
  const { all_stores } = useGetStores();
  const { brand_list } = useBrandList();
  const { main_categories } = useMainCategory();

  const { product_search, isLoading } = useProductSearch(query, keyword);

  const storeOptions = convertStore(all_stores?.data);
  const brandOptions = convertArray(brand_list?.data);
  const categoryOptions = convertArray(main_categories?.data);

  const { product_bystore, refetch } = useProductByStore(storeId);
  const { product_bybrand, brandRefetch } = useProductByBrand(brandId);
  const { product_bycat, refetchCat } = useProductByCat(catId);

  const transformDate = (data) => {
    const updated_list = data?.map((product) => {
      if (product.expiredDate === null) {
        return product;
      } else {
        return {
          ...product,
          expiredDate: moment(product?.expiredDate).format("DD MMMM YYYY"),
        };
      }
    });

    return updated_list;
  };

  useEffect(() => {
    if (product_list?.data && keyword === "") {
      setTabledata(transformDate(product_list?.data));
      setQuery(false);
    }
  }, [product_list, keyword]);

  useEffect(() => {
    if (keyword && product_search && query) {
      setTabledata(transformDate(product_search?.data));
      // setQuery(false)
    }
  }, [keyword, query, product_search]);

  useEffect(() => {
    if (filterType === "store" && product_bystore?.data) {
      setTabledata(transformDate(product_bystore?.data));
    } else if (filterType === "Brand" && product_bybrand?.data) {
      setTabledata(transformDate(product_bybrand?.data));
    } else if (filterType === "Category" && product_bycat?.data) {
      setTabledata(transformDate(product_bycat?.data));
    } else if (filterType === "Code") {
      // setTabledata([product_code?.data]);
    } else if (filterType === "All") {
      setTabledata(transformDate(product_list?.data));
    }
  }, [
    filterType,
    product_bystore?.data,
    product_bybrand?.data,
    product_bycat?.data,
    // product_code?.data,
    product_list?.data,
  ]);

  const handleNavigate = (data) => {
    history.push({
      pathname: `/product/product-details/${data.id}`,
      state: data,
    });
  };
  const handleEditNavigate = (data) => {
    history.push({
      pathname: `/product/editproduct-product/${data.id}`,
      state: data,
    });
  };

  const handleSearch = () => {
    if (keyword) {
      setQuery(true);
    }
  };

  const handleViewChange = async () => {
    setLoading(true);
    if (filterType === "store") {
      await refetch();
      setFilterType(filterType);
      setLoading(false);
    } else if (filterType === "Brand") {
      await brandRefetch();
      setFilterType(filterType);
      setLoading(false);
    } else if (filterType === "Category") {
      await refetchCat();
      setFilterType(filterType);
      setLoading(false);
    }
  };

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const handleDelete = (id) => {
    Swal.fire({
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
    }).then(function (t) {
      t.value &&
        mutuation.mutate(
          {
            url: `/v1/Product/Delete?Id=${id}`,
            method: "DELETE",
            data: "",
          },
          {
            onSuccess(res) {
              if (res.statusCode == 200) {
                const { message } = res;
                toast.success(message);
                refetch_list();
              }
            },
            onError(err) {
              const error_response = err.response.data;
              const errorMsg = error_response.Message;
              toast.error(errorMsg);
            },
          }
        );
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <a className="product-img">
            <img alt="" src={record?.image} />
          </a>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {text}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Code",
      dataIndex: "productCode",
      sorter: (a, b) => a.productCode.length - b.productCode.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      sorter: (a, b) => a.brandName.length - b.brandName.length,
    },
    {
      title: "Price",
      dataIndex: "unitPrice",
      sorter: (a, b) => a.unitPrice.length - b.unitPrice.length,
    },

    {
      title: "Qty",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.length - b.quantity.length,
    },
    {
      title: "Expiring Date",
      dataIndex: "expiredDate",
      sorter: (a, b) => a.expiredDate.length - b.expiredDate.length,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      sorter: (a, b) => a.createdDate.length - b.createdDate.length,
      render: (item) => {
        const newDate = new Date(item);
        const [month, day, year] = [
          newDate.getMonth(),
          newDate.getDate(),
          newDate.getFullYear(),
          newDate.getDay(),
        ];
        return <p>{` ${day} ${monthList[month]}, ${year} `}</p>;
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <a className="me-3" onClick={() => handleNavigate(record)}>
              <img src={EyeIcon} alt="img" />
            </a>
            <a className="me-3" onClick={() => handleEditNavigate(record)}>
              <img src={EditIcon} alt="img" />
            </a>
            <a className="confirm-text" onClick={() => handleDelete(record.id)}>
              <img src={DeleteIcon} alt="img" />
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            <div className="page-btn">
              <Link to="/product/addproduct-product" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Product
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop
                keyword={keyword}
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
              >
                <div className="card-body mb-4">
                  <div className="row">
                    <div className="col-lg-9 col-sm-6">
                      <div className="row">
                        <div className="col-lg mb-2 me-2">
                          <Select
                            className="select"
                            options={data}
                            placeholder="Choose filter by"
                            onChange={(e) => {
                              const value = e.value;
                              setFilterType(value);
                              if (value === "store") {
                                setFilterBy(storeOptions);
                              } else if (value === "Brand") {
                                setFilterBy(brandOptions);
                              } else if (value === "Category") {
                                setFilterBy(categoryOptions);
                              } else if (value === "Expiring Date") {
                                setFilterBy(categoryOptions);
                              }
                            }}
                          />
                        </div>
                        <div className="col-lg mb-2 me-2">
                          {filterType.toLowerCase() === "expiring date" ? (
                            <div className="form-group mb-0">
                              <input type="date" placeholder="" />
                            </div>
                          ) : (
                            <Select
                              className="select"
                              options={filterBy}
                              placeholder="Choose filter type"
                              onChange={(e) => {
                                const value = e.value;
                                if (filterType === "store") {
                                  setStoreId(value);
                                } else if (filterType === "Brand") {
                                  setBrandId(value);
                                } else if (filterType === "Category") {
                                  setCatId(value);
                                }
                              }}
                            />
                          )}
                        </div>
                        <div className="col-lg d-flex">
                          <div className="form-group mb-0 me-5">
                            <button
                              // disabled={storeId === '' || brandId === '' || catId === ''}
                              className="btn btn-filters ms-auto"
                              onClick={() => {
                                handleViewChange();
                              }}
                            >
                              {loading ? (
                                <div
                                  className="spinner-border"
                                  style={{
                                    height: "1.2rem",
                                    width: "1.2rem",
                                  }}
                                ></div>
                              ) : (
                                <img src={search_whites} alt="img" />
                              )}
                            </button>
                          </div>
                          <div className="align-center me-2">
                            <div className="row text-center">
                              <a
                                className="text-orange-500"
                                onClick={() => setFilterType("All")}
                              >
                                Clear Filter
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                {tableData ? (
                  <Table columns={columns} dataSource={tableData} />
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
export default ProductList;
