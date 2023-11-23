import { Upload } from "../../EntryFile/imagePath";

const ImportTransfer = () => {
 
  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     height: "2.4rem",
  //     minHeight: "fit-content",
  //   }),
  //   valueContainer: (base) => ({
  //     ...base,
  //     maxHeight: "2.4rem",
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     marginBottom: "14px",
  //   }),
  // };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Import Transfer</h4>
              <h6>Add/Update Transfer</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>From</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose",
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>To</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose",
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label> Status </label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose status",
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <a className="btn btn-submit w-100">
                          Download Sample File
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Upload CSV File</label>
                    <div className="image-upload">
                      <input type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Shipping</label>
                    <input type="text" defaultValue={0} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2">Submit</button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportTransfer;
