import { useState } from 'react';
import { Root } from '@radix-ui/react-dialog';
import { Content } from '@radix-ui/react-dialog';
import './style.css';
import { Portal } from '@radix-ui/react-dialog';
import { Overlay } from '@radix-ui/react-dialog';
import { useMutate } from '../../../../../hooks/useMutate';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { nanoid } from 'nanoid';
import { LoadingAbsolute } from '../../../../components/Loading';
import Preview from './preview';
import Receipt from './receipt';
import { useHistory } from 'react-router-dom';

const Modal = ({ sale, subTotal, setSale }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const items = sale.items;

  const qc = useQueryClient();
  const mutation = useMutate();

  const saveSale = async () => {
    const payload = {
      customerCode: sale.customer?.code,
      orderRef: nanoid(),
      paymentMethods: sale.paymentMethods.join(','),
      paymentDescription: sale.paymentDescription,
      soldItems: sale.items.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      })),
      totalAmount: subTotal,
    };

    mutation.mutate(
      {
        url: `/v1/ManageSales/Save`,
        method: 'POST',
        data: payload,
      },
      {
        onSuccess(res) {
          if (res.statusCode == 200) {
            toast.success(res.message);
            qc.refetchQueries({ queryKey: ['all-sales-history'] });
            qc.refetchQueries({ queryKey: ['sale-statistics'] });
            // history.push({
            //   pathname: '/sales/history',
            // });
          } else {
            toast.error(res.message);
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

  return (
    <>
      <button
        disabled={(items && items.length < 1) || !sale.customer?.code}
        onClick={() => setOpen(true)}
        className='btn btn-submit w-100 my-3'>
        <h5>Preview</h5>
      </button>
      <Root
        open={open}
        onOpenChange={(state) => {
          if (mutation.status === 'success' && !state) {
            history.push('/sales/history');
          } else {
            setOpen(state);
          }
        }}>
        <Portal>
          <Overlay className='DialogOverlay' />
          {mutation.isLoading && <LoadingAbsolute />}
          <Content className='DialogContent'>
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='close-modal'
                onClick={() =>
                  mutation.status === 'success'
                    ? history.push('/sales/history')
                    : setOpen(false)
                }>
                <span aria-hidden='true'>×</span>
              </button>
            </div>

            {mutation.status !== 'success' ? (
              <Preview
                sale={sale}
                setSale={setSale}
                saveSale={saveSale}
                subTotal={subTotal}
              />
            ) : (
              <Receipt data={mutation.data?.data?.receiptInfo} />
            )}
          </Content>
        </Portal>
      </Root>
    </>
  );
};

export default Modal;
