import { useAccessLists, useUserAccess } from '../../../hooks/useAccessList';
import { useMutate } from '../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Checkbox } from 'antd';
import { convertUserList } from '../../../utils/convertArray';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UpdateUserPermission = () => {
  const mutuation = useMutate();
  const history = useHistory();
  const { access_lists } = useAccessLists();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const data = access_lists?.data;
  const { user_access, refetch } = useUserAccess(email);
  const userAccessLists = user_access?.data;

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = convertUserList(data);
  const defaultCheckedList = userAccessLists?.accessItems;

  useEffect(() => {
    setCheckedList(defaultCheckedList);
  }, [defaultCheckedList]);

  const onSubmit = () => {
    setLoading(true);
    const formData = {
      userPhoneNumberOrEmail: email,
      updatedAccessitems: checkedList.toString(),
    };
    mutuation.mutate(
      {
        url: `/v1/ManageSetUps/Update-User-Access-Items`,
        method: 'POST',
        data: formData,
      },
      {
        onSuccess(res) {
          setLoading(false);
          if (res.statusCode == 205) {
            const { Message } = res;
            toast.error(Message);
          } else if (res.statusCode == 200) {
            toast.success(res.message);
          }
        },
        onError(err) {
          setLoading(false);
          const error_response = err.response.data;
          const errorMsg = error_response.Message;
          toast.error(errorMsg);
        },
      }
    );
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Update User Permission</h4>
            <h6>Manage user permissions</h6>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-lg-4 col-sm-12'>
                <div className='form-group'>
                  <label>
                    User Email/Phone Number <span className='manitory'>*</span>
                  </label>
                  <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-4 mt-3'>
                <button
                  onClick={() => refetch()}
                  className='btn btn-submit me-2'>
                  Check Access
                </button>
              </div>
              {user_access?.data && (
                <>
                  <div className='row mb-4'>
                    <div className='col-4'>
                      <div className='productdetails product-respon'>
                        <h4 className='h6'>User&apos;s Menu Access</h4>
                        {plainOptions && (
                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedList}
                            onChange={onChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <button
                        onClick={onSubmit}
                        className='btn btn-submit me-2'>
                        {loading ? (
                          <div
                            className='spinner-border'
                            style={{ height: '1.2rem', width: '1.2rem' }}></div>
                        ) : (
                          'Submit'
                        )}
                      </button>
                      <a onClick={() => history.goBack()} className='btn btn-cancel'>
                        Cancel
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPermission;
