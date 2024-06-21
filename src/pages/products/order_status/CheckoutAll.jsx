import React, { useState, useEffect } from 'react';
import { useCallback, useRef, useMemo, memo } from 'react';
import { Link, useActionData } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { fetchData } from '@/api';
import { Image } from '@/assets/images';
import { updatedFavorite } from '@/vendor';
import { ConfirmDelete } from './ModalUpdateAddress';
import { IconSvg, FormInputSelect, multiUseCheckbox } from '@/component/';
import { CountProducts, Loading } from '@/component/';
const valueOption = ['LavAzza', 'Arabica', 'Robusta'];

const action = async ({ request }) => {
  try {
    const dataAction = await request.json();
    return dataAction;
  } catch (error) {
    console.error(error);
    throw new Error('Error action Checkout All::');
  }
};
// anchor-point
const CheckoutAll = memo(() => {
  const selectRef = useRef([]);
  const countRef = useRef([]);
  const [count, setCount] = useState({});
  const [select, setSelect] = useState({});
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const actionData = useActionData();
  const [ship, setShip] = useState({ shipping: 50 });
  const [total, setTotal] = useState({
    price: 0,
    quantity: 0,
  });

  const setRef = useCallback((node, index, type) => {
    if (node) {
      if (type === 'select') {
        selectRef.current[index] = node;
      } else if (type === 'count') {
        countRef.current[index] = node;
      }
    }
  }, []);

  useEffect(() => {
    const handleCheckoutData = async () => {
      try {
        const products = actionData ? actionData : await fetchData('favoritesData');
        if (products.length > 0) {
          setProducts(products);
          dispatch(updatedFavorite(products));
        } else {
          navigate('/products', { replace: true });
        }
      } catch (error) {
        console.log('Error during checkout:', error);
      }
    };

    handleCheckoutData();
  }, [actionData, location.key]);

  const referenceInitialize = useMemo(() => {
    if (products.length > 0) {
      const newCheck = [''];
      const newCount = {};
      const newSelect = {};
      products.forEach((item, i) => {
        const random = Math.ceil(Math.random() * 3);
        newCount[`count${i + 1}`] = { quantity: 0, totalPrice: 0 };
        newSelect[`select${i + 1}`] = { option: valueOption[random] };
        newCheck[`${i + 1}`] = '';
      });
      return { newCount, newSelect, newCheck };
    }
    return { newCount: {}, newSelect: {}, newCheck: {} };
  }, [products]);

  useEffect(() => {
    setCount(referenceInitialize.newCount);
    setSelect(referenceInitialize.newSelect);
    setChecked(referenceInitialize.newCheck);
  }, [referenceInitialize]);

  useEffect(() => {
    const abs = Object.values(count).some((item) => item.quantity != 0);
    abs && handleAudit(0);
  }, [count]);

  const handleChangeSelect = useCallback((name, value) => {
    if (!name || !value) return;
    setSelect((prev) => ({ ...prev, [name]: { option: value } }));
  }, []);

  const handleAudit = useCallback(
    (event) => {
      const newPrice = reduceTotal('totalPrice');
      const newQuantity = reduceTotal('quantity');
      setTotal((prevTotal) => ({ ...prevTotal, price: newPrice, quantity: newQuantity }));
      const newShip = parseFloat((50 - newPrice * 0.1).toFixed(2));
      const change = event === 0 ? true : event && false;
      setShip({ change: change, shipping: newShip > 0 ? newShip : 0 });
    },
    [count]
  );

  const handleCount = useCallback((event, countId, price) => {
    const { name, value } = countRef.current[countId].setCount(event);
    if (name) {
      setCount((prev) => ({ ...prev, [name]: { quantity: value, totalPrice: value * price } }));
      setShip((prev) => ({ ...prev, change: true }));
    }
  }, []);

  const reduceTotal = (key) => {
    return Object.values(count).reduce((acc, curr) => acc + curr[key], 0);
  };

  const glowOnSelect = (event) => {
    const id = event.target.closest('.input-checkbox')?.id;
    setChecked((prev) => multiUseCheckbox(prev, 'checkAll', id));
  };

  if (Object.keys(count).length === 0) {
    return <Loading className='vh-60 flex-center' />;
  }

  return (
    <React.Fragment>
      <Row className='product-checkout gx-5'>
        <Col className='mb-5'>
          <div className='px-5 py-3 rounded-5 bg-secondary-subtle rounded-5 shadow'>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='py-3 fw-semibold'>Favourite List</h1>
              <div className='py-2 fs-2'>
                {`${products.length > 0 && products.length}`}
                <span className='ms-3'>{`( items )`}</span>
              </div>
            </div>

            <div
              id={`checkAll`}
              className='input-checkbox select-all mt-3 d-inline-flex align-items-center gap-4 cursor-pointer user-select-none hover-8'
              onClick={glowOnSelect}
            >
              <IconSvg
                className={`flex-center mb-4 fs-13${checked[0] ? ' text-info-emphasis' : ' text-transparent'}`}
                link='checked'
              />
              <span className={`label fs-5 fst-italic${checked[0] && ' text-info-emphasis'}`}>Select All</span>
            </div>
            {products.length > 0 &&
              products.map((item, i) => {
                const countId = `count${i + 1}`;
                const currentCount = count[countId];
                const selectId = `select${i + 1}`;
                const currentSelect = select[selectId];
                return (
                  <article
                    key={`count0${countId + i}`}
                    className='card-item position-relative py-4 mb-3 border-bottom'
                  >
                    <IconSvg
                      id={`check${i + 1}`}
                      name={item.id}
                      className={`input-checkbox position-absolute flex-center mb-2 fs-13 z-9${
                        checked[`${i + 1}`] ? ' text-info-emphasis' : ' text-transparent'
                      }`}
                      link='checked'
                      onClick={glowOnSelect}
                    />
                    <Row className='content'>
                      <Col className='col-4 col-md-3'>
                        <Link
                          to={`/products/${item.id}/details`}
                          className='w-100 position-relative pt-90'
                        >
                          <span className='flex-center p-4 position-absolute inset-full top-0 start-0 '>
                            <Image
                              className='p-3 px-lg-5 h-auto rounded-3 d-flex'
                              src={`/assets/images/product/product${item.id}.png`}
                            />
                          </span>
                        </Link>
                      </Col>
                      <Col className='col-8 col-md-5 col-xl-4'>
                        <div className='py-3 d-flex h-100 flex-column justify-content-between'>
                          <h3 className='title fs-3 fw-normal'>
                            <Link to={`/products/${item.id}/details`}>{item.desc}</Link>
                          </h3>
                          <p className='price-status py-3 mb-0'>
                            <span className='price pe-3 border-2 border-end'>{`$ ${item.price}.00`}</span>
                            <span className='status ps-3 fst-italic text-success'>In Stock</span>
                          </p>
                          <Row className='ctrl flex-center mt-3'>
                            <Col className='form-group'>
                              {currentSelect && (
                                <FormInputSelect
                                  ref={(node) => setRef(node, i, 'select')}
                                  labelOption='-- Brand --'
                                  id={selectId}
                                  value={currentSelect.option}
                                  valueOption={valueOption}
                                  className='ctrl-item d-flex align-items-center justify-content-between fs-3 mb-4 border rounded-3 cursor-pointer'
                                  onChange={handleChangeSelect}
                                />
                              )}
                            </Col>
                            <Col className='form-group'>
                              <CountProducts
                                id={countId}
                                ref={(node) => setRef(node, countId, 'count')}
                                value={count[countId]?.quantity}
                                className='ctrl-item form-control d-flex align-items-center justify-content-between mb-4 mt-md-0 p-2 fs-3 user-select-none border rounded-3'
                                onClick={(e) => handleCount(e, countId, item.price)}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col className='ms-sm-auto'>
                        <Row className='d-md-flex py-3 h-100'>
                          <p className='price sub-total-price d-flex align-items-center justify-content-center align-items-md-start justify-content-md-end col-4 col-md-12 mb-4 text-center text-nowrap text-md-end fs-2'>
                            {currentCount && `$ ${currentCount.totalPrice} . 00`}
                          </p>
                          <div className='ctrl-btn col-6 col-md-12 d-flex align-items-center justify-content-end px-0 text-center text-md-end ms-auto mb-4'>
                            <Link
                              type='button'
                              className={`btn btn-save d-flex align-items-center justify-content-between py-3 px-4 fs-4${
                                ship.change ? ' change' : ''
                              }`}
                              reloadDocument
                              to='#anchor-payment'
                              onClick={handleAudit}
                            >
                              <IconSvg
                                className='icon me-3'
                                link='heart'
                              />
                              Save
                            </Link>

                            <ConfirmDelete
                              id={item.id}
                              action={`/products/checkout/${item.id}/destroyFavourite`}
                              message='Do you want to remove this item from shopping cart?'
                            >
                              <button
                                className='btn btn-destroy d-flex align-items-center justify-content-between p-2 px-4 fs-4 hover-8'
                                type='submit'
                              >
                                <IconSvg
                                  className='icon me-3'
                                  link='trash'
                                />
                                Delete
                              </button>
                            </ConfirmDelete>
                          </div>

                          <div className='ctrl-btn col-6 col-md-12 d-flex align-items-center justify-content-end mt-md-auto px-0 text-center text-md-end ms-auto mb-4'>
                            <Link
                              to={'/products/checkout'}
                              type='button'
                              className={`d-flex align-items-center py-2 px-5 fs-2 text-bg-warning text-nowrap rounded-pill`}
                            >
                              <span className='py-1'>Check Out</span>
                            </Link>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </article>
                );
              })}
            <div
              id='anchor-payment'
              className='anchor-point scroll-margin-top180'
            ></div>
            <Row
              id='card-footer'
              className='card-info scroll-margin-top100 card-footer py-4 d-flex'
            >
              <Col className='col-7 d-flex align-items-end mb-3 py-3'>
                <div className='card-prev'>
                  <Link
                    to='/products'
                    className='card-link d-flex align-items-center gap-3 fw-medium'
                  >
                    <IconSvg
                      className='icon fs-2 hover-8'
                      link='chevron-left'
                    />
                    <span className='fs-3 hover-8'>Continue Shopping</span>
                  </Link>
                </div>
              </Col>

              <Col className='col-5 mb-3 py-3'>
                <div className='card-calc d-flex align-items-center justify-content-between mb-2 px-2 fs-3'>
                  <span>Quantity:</span>
                  <span>
                    {`${total.quantity && total.quantity}`}
                    <span className='ms-3'>{`(items)`}</span>
                  </span>
                </div>

                <div className='card-calc d-flex align-items-center justify-content-between px-2 fs-3'>
                  <span>Subtotal:</span>
                  <span>{`$ ${total.price && total.price.toFixed(2)}`}</span>
                </div>

                <div className='card-calc d-flex align-items-center justify-content-between px-2 py-4 fs-3 border-bottom'>
                  <span>Shipping:</span>
                  <span>
                    {ship.shipping > 0 ? `$ ${ship.shipping}` : <span className='py-2 px-4 rounded-3 fst-italic text-bg-info'>Free !</span>}
                  </span>
                </div>

                <div className='card-calc d-flex align-items-center justify-content-between px-2 pt-4 fs-3 fw-medium'>
                  <span>Total:</span>
                  <span>{`$ ${total.price && (total.price + ship.shipping).toFixed(2)}`}</span>
                </div>

                <div className='ctrl-btn col-12 col-lg-8 col-xl-6 d-flex align-items-center justify-content-end mt-md-auto px-0 text-center text-md-end ms-auto'>
                  <Link
                    to={'/products/checkout/'}
                    type='button'
                    className={`d-flex align-items-center justify-content-center w-100 mt-5 py-2 px-5 fs-2 text-bg-warning text-nowrap rounded-pill`}
                  >
                    <span className='py-1'>Go to checkout</span>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
});

export { action };
export default CheckoutAll;

/*
Điều khiển checkbox dạng Object :
  Cấu trúc dữ liệu:
    Obj = {
    checkAll: true,
    items: {key: value, ...}
    }
  const glowOnSelect = (event) => {
    const id = event.target.closest(".input-checkbox")?.id;
    setChecked((prev) => {
      if (id === "checkAll") {
        const newState = !prev.checkAll;
        return {
          checkAll: newState,
          items: Object.keys(prev.items).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
          }, {}),
        };
      } else {
        const newItems = { ...prev.items, [id]: !prev.items[id] };
        const selectAll = Object.values(newItems).filter((item) => !item).length === 0;
        return {
          checkAll: selectAll,
          items: newItems,
        };
      }
    });
  };

*/
