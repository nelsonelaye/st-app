import { useState } from "react";
import { FullTable } from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Select from "../../components/Select";
import { search_whites, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import Swal from "sweetalert2";
import { useGetExpenseList } from "../../../hooks/useGetExpense";
import { useMutate } from "../../../hooks/useMutate";
import { toast } from "react-hot-toast";
import { formatCurrency, limitText } from "../../../utils/helpers";
import { LoadingAbsolute } from "../../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const typeList = [
  { label: "Date", value: "date" },
  { label: "Date Range", value: "date-range" },
  { label: "Monthly", value: "monthly" },
  { label: "Saved", value: "saved" },
  { label: "Rejected", value: "rejected" },
];

const monthList = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

const ExpenseList = () => {
  const [inputfilter, setInputfilter] = useState(false);

  const [filter, setFilter] = useState();

  const { expense_list, isLoading, refetch_list, search, filterExpense } =
    useGetExpenseList();

  const data = expense_list?.data || [];
  console.log(data);
  const mutation = useMutate();

  const deleteExpense = (id) => {
    mutation.mutate(
      {
        url: `/v1/Expenses/DeleteExpense/${id}`,
        method: "DELETE",
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            Swal.fire({
              type: "success",
              title: "Deleted!",
              text: "Expense deleted.",
              confirmButtonClass: "btn btn-success",
            });
            refetch_list();
          } else {
            Swal.fire({
              type: "unsuccessfull",
              title: "Not Deleted!",
              text: res?.Message,
              confirmButtonClass: "btn btn-success",
            });
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

  const confirmDelete = (id) => {
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
    }).then(({ isConfirmed }) => {
      if (isConfirmed) deleteExpense(id);
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      align: "center",
    },
    {
      title: "Reference",
      dataIndex: "referenceId",
      sorter: (a, b) => a.reference.length - b.reference.length,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "expenseDate",
      sorter: (a, b) => a.date.length - b.date.length,
      render: (value) => new Date(value).toLocaleDateString(),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (cell) => (
        <span
          className={
            cell === "Active" ? "badges bg-lightgreen" : "badges bg-lightred"
          }
        >
          {cell === 0 ? "Requested" : cell === 1 ? "Approved" : ""}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
      align: "center",
    },
    {
      title: "Request Amount",
      dataIndex: "requestAmount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: "center",
      render: (cell) => formatCurrency(cell),
    },
    {
      title: "Approved Amount",
      dataIndex: "approveAmount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: "center",
    },
    {
      title: "For",
      dataIndex: "expenseFor",
      sorter: (a, b) => a.description.length - b.description.length,
      align: "center",
      render: (cell) => limitText(cell, 25),
    },
    {
      title: "Request By",
      dataIndex: "requestBy",
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: "center",
      render: (cell) => limitText(cell, 20),
    },
    {
      title: "Approved By",
      dataIndex: "approveBy",
      sorter: (a, b) => a.amount.length - b.amount.length,
      align: "center",
      render: (cell) => limitText(cell, 20),
    },
    {
      title: "Action",
      render: (cell) => (
        <>
          <Link className="me-3" to={`/expense/editexpense/${cell?.id}`}>
            <img src={EditIcon} alt="img" />
          </Link>
          <button
            className="confirm-text"
            onClick={() => confirmDelete(cell?.id)}
          >
            <img src={DeleteIcon} alt="img" />
          </button>
        </>
      ),
      align: "center",
    },
  ];

  return (
    <>
      {isLoading && <LoadingAbsolute />}
      <FullTable
        data={data}
        columns={columns}
        pageTitle="Expense List"
        pageSubTitle="Manage your Expenses"
        addHref={"/expense/addexpense"}
        addText="Add New Expense"
        inputfilter={inputfilter}
        handleSearch={search}
        togglefilter={togglefilter}
      >
        <div
          className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
          id="filter_inputs"
          style={{ display: inputfilter ? "block" : "none" }}
        >
          <div className="row text-center">
            <button
              className="text-orange-500"
              style={{ color: "orange", marginBottom: "10px" }}
              onClick={() => {
                setFilter(undefined);
                filterExpense(undefined);
              }}
            >
              Clear Filter
            </button>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="form-group">
                <Select
                  value={typeList.find((x) => x.value === filter?.type)}
                  onChange={(e) => {
                    setFilter({ value: undefined, type: e.value });
                  }}
                  placeholder="Select Filter"
                  options={typeList}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-12">
              <div className="form-group">
                {filter?.type === "date" ? (
                  <DatePicker
                    placeholderText="Select Date"
                    selected={filter?.value}
                    onChange={(date) =>
                      setFilter((x) => ({
                        ...x,
                        value: date,
                      }))
                    }
                  />
                ) : filter?.type === "date-range" ? (
                  <div className="d-flex gap-2">
                    <DatePicker
                      placeholderText="From Date"
                      selected={filter?.value && filter?.value[0]}
                      onChange={(date) =>
                        setFilter((x) => ({
                          ...x,
                          value: [date, x?.value?.[1]],
                        }))
                      }
                    />
                    <DatePicker
                      placeholderText="To Date"
                      selected={filter?.value && filter?.value[1]}
                      onChange={(date) =>
                        setFilter((x) => ({
                          ...x,
                          value: [x?.value?.[0], date],
                        }))
                      }
                    />
                  </div>
                ) : filter?.type === "monthly" ? (
                  <>
                    <Select
                      value={monthList.find((x) => x.value === filter?.value)}
                      onChange={(e) => {
                        setFilter((x) => ({ ...x, value: e.value }));
                      }}
                      placeholder="Select Month"
                      options={monthList}
                    />
                  </>
                ) : null}
              </div>
            </div>

            <div className="col-lg col-sm-6 col-12">
              <div className="form-group">
                {/* <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "Brand",
                              }}
                            /> */}
              </div>
            </div>
            <div className="col-lg col-sm-6 col-12 ">
              <div className="form-group">
                {/* <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Price",
                              }}
                            /> */}
              </div>
            </div>
            <div className="col-lg-1 col-sm-6 col-12">
              <div className="form-group" onClick={() => filterExpense(filter)}>
                <button className="btn btn-filters ms-auto">
                  <img src={search_whites} alt="img" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </FullTable>
    </>
  );
};
export default ExpenseList;
