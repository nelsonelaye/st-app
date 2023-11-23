/* eslint-disable react/prop-types */

import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';

const UploadComponent = ({
  setValue,
  value,
  accept = 'image/jpeg, image/png, image/webp',
}) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const dummyRequest = async ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,
    beforeUpload: (info) => {
      if (info) {
        getBase64(info, (url) => {
          setValue(value, url, { shouldValidate: true });
        });
        message.success(`${info.file.name} file selected`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    maxCount: 10,
    accept,
  };
  const uploadButton = (
    <div>
      <Button icon={<InboxOutlined />}></Button>
      <div style={{ marginTop: 8 }}>Click to Upload Image</div>
    </div>
  );

  return (
    <div>
      <Upload {...props} listType='picture-card' name='avatar'>
        {uploadButton}
      </Upload>
    </div>
  );
};

export default UploadComponent;
