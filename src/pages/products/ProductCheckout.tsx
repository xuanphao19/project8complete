import React, { useState, useCallback, useRef, useEffect, createRef, memo } from 'react';
import { Form, Link, Outlet, useLocation, useActionData, useNavigate, useMatch, useSubmit } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchData } from '@/api';
import { Image } from '@/assets/images';
import { ConfirmDelete } from './order_status/ModalUpdateAddress';
import { updatedFavorite } from '@/vendor';
import BankCard from './BankCard';
import { IconSvg, FormInputSelect, CountProducts, Loading } from '@/component/';

const action = async ({ request }) => {
  const dataAction = await request.json();
  return dataAction;
};

const valueOption = ['LavAzza', 'Arabica', 'Robusta'];
interface Count {
  [key: string]: { quantity: number; totalPrice: number };
}

const ProductCheckout = memo(() => {
  const countRef = useRef([]);
  const selectRef = useRef([]);
  const submit = useSubmit();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const actionData = useActionData();
  const matchShip = useMatch('/products/checkout/shipping');
  const matchPay = useMatch('/products/checkout/shipping/payment');

  const [products, setProducts] = useState<any>([]);
  const [ship, setShip] = useState({ shipping: 50, change: false });
  const [count, setCount] = useState<Count>({});
  const [value, setValue] = useState({
    select1: '-- Brand --',
    select2: 'LavAzza',
    select3: 'Arabica',
  });
  const [total, setTotal] = useState({
    price: 0,
    quantity: 0,
  });

  const setRef = useCallback((node: React.ReactElement, idNode: string, type: string) => {
    if (node && idNode) {
      if (type === 'select') {
        selectRef.current[idNode] = node;
      } else if (type === 'count') {
        countRef.current[idNode] = node;
      }
    }
  }, []);

  useEffect(() => {
    const handleCheckoutData = async () => {
      try {
        if (!actionData) {
          const product = await fetchData('favoritesData');
          setProducts(product.slice(0, 3));
          if (product.length <= 0) navigate('/products', { replace: true });
          dispatch(updatedFavorite(product));
        } else {
          setProducts(actionData);
        }
      } catch (error) {
        console.log('Error during checkout:', error);
      }
    };
    handleCheckoutData();
  }, [actionData, location.key]);

  useEffect(() => {
    Object.values(count).length != 0 && handleAudit(0);
  }, [count]);

  const handleChangeSelect = useCallback((inputId: any, inputValue: any) => {
    if (!inputId || !inputValue) return;
    setValue((prev) => ({ ...prev, [inputId]: inputValue }));
  }, []);

  const handleAudit = useCallback(
    (event: any) => {
      const newPrice = reduceTotal('totalPrice');
      const newQuantity = reduceTotal('quantity');
      setTotal((prevTotal) => ({ ...prevTotal, price: newPrice, quantity: newQuantity }));
      const newShip = parseFloat((50 - newPrice * 0.1).toFixed(2));
      const change = event === 0 ? true : event && false;
      setShip({ change: change, shipping: newShip > 0 ? newShip : 0 });
    },
    [count]
  );

  const handleCount = useCallback((event: any, countId: string, price: number) => {
    const { name, value } = countRef.current[countId].setCount(event);
    if (name) {
      setCount((prev) => ({ ...prev, [name]: { quantity: value, totalPrice: value * price } }));
    }
  }, []);

  const handlePayment = (event: any) => {
    if (!matchShip) {
      event.preventDefault();
      navigate('/products/checkout/shipping', { replace: true });
      submit(
        { title: `1. Shipping, arrives between 🌼 ${timeShip(7)} 🌼` },
        { action: '/products/checkout/shipping', method: 'post', encType: 'application/json' }
      );
    } else {
      if (!confirm('Bạn đã đọc và đồng ý với các điều khoản thanh toán của chúng tôi?')) {
        event.preventDefault();
      } else {
        event.preventDefault();
        submit(
          { title: `1. Shipping, arrives between 🌺 ${timeShip(5)} 🌺` },
          { action: '/products/checkout/shipping/payment', method: 'post', encType: 'application/json' }
        );
      }
    }
  };

  const reduceTotal = (key: string) => {
    return Object.values(count).reduce((acc, curr) => acc + curr[key], 0);
  };

  return (
    <React.Fragment>
      <Row className='product-checkout gx-5'>
        <Col className='col-xl-8 mb-5'>
          <div className={`${!matchPay ? 'px-5 py-3 bg-secondary-subtle rounded-5 shadow' : ''}`}>
            <div className='outlet-product-checkout'>
              <Outlet />
            </div>
            {!matchPay && (
              <div className=''>
                {products.length > 0 &&
                  products.map((item: any, i: number) => {
                    const countId = `count${i + 1}`;
                    const currentCount = count[countId];
                    const selectId = `select${i + 1}`;
                    return (
                      <article
                        key={`count0${countId}`}
                        className='card-item position-relative py-4 mb-3 border-bottom'
                      >
                        <Row className='content'>
                          <Col className='col-4 col-md-3'>
                            <Link
                              to={`/products/${item.id}/details`}
                              className='w-100'
                            >
                              <Image
                                className='w-100 p-3 px-lg-5 h-auto rounded-3 d-flex'
                                src={`/assets/images/product/product${item.id}.png`}
                              />
                            </Link>
                          </Col>
                          <Col className='col-8 col-md-5'>
                            <div className='py-3 d-flex h-100 flex-column'>
                              <h3 className='title fs-3 fw-normal'>
                                <Link to={`/products/${item.id}/details`}>{item.desc}</Link>
                              </h3>
                              <p className='price-status py-3 mb-0'>
                                <span className='price pe-3 border-2 border-end'>{`$ ${item.price}.00`}</span>
                                <span className='status ps-3 fst-italic text-success'>In Stock</span>
                              </p>
                              <Row className='ctrl flex-center mt-3'>
                                <Col className='form-group'>
                                  <FormInputSelect
                                    ref={createRef()}
                                    id={selectId}
                                    labelOption='-- Brand --'
                                    value={i === 0 ? value.select1 : i === 1 ? value.select2 : i === 2 && value.select3}
                                    valueOption={valueOption}
                                    className='ctrl-item d-flex align-items-center justify-content-between fs-3 mb-4 border rounded-3 cursor-pointer'
                                    onChange={handleChangeSelect}
                                  />
                                </Col>
                                <Col className='form-group'>
                                  <CountProducts
                                    id={countId}
                                    ref={(node: any) => setRef(node, countId, 'count')}
                                    value={count[countId]?.quantity}
                                    className='ctrl-item form-control d-flex align-items-center justify-content-between mb-4 mt-md-0 p-2 fs-3 user-select-none border rounded-3'
                                    onClick={(e: any) => handleCount(e, countId, item.price)}
                                  />
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col className='col-12 col-md-4 ms-sm-auto'>
                            <Row className='d-md-flex py-3 h-100'>
                              <p className='price sub-total-price d-flex align-items-center justify-content-center align-items-md-start justify-content-md-end col-4 col-md-12 mb-4 text-center text-md-end fs-2'>
                                {currentCount ? `$ ${currentCount.totalPrice} . 00` : `$ ${item.price} . 00`}
                              </p>
                              <div className='ctrl-btn col-6 col-md-12 d-flex align-items-center justify-content-end mt-md-auto px-0 text-center text-md-end ms-auto mb-4'>
                                <Link
                                  type='button'
                                  className={`btn btn-save d-flex align-items-center justify-content-between p-2 px-4 fs-4${
                                    ship.change ? ' change' : ''
                                  }`}
                                  reloadDocument
                                  to='#anchor-checkout'
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
                            </Row>
                          </Col>
                        </Row>
                      </article>
                    );
                  })}
                <div
                  id='anchor-checkout'
                  className='anchor-point scroll-margin-top180'
                ></div>
                <Row className='card-info py-4 d-none d-xl-flex'>
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
                    <div className='card-calc d-flex align-items-center justify-content-between px-2 fs-3'>
                      <span>Subtotal:</span>
                      <span>{`$ ${total.price && total.price.toFixed(2)}`}</span>
                    </div>
                    <div className='card-calc d-flex align-items-center justify-content-between px-2 py-4 fs-3 border-bottom'>
                      <span>Shipping:</span>
                      <span>
                        {ship.shipping > 0 ? `$ ${ship.shipping}` : <span className='py-2 px-4 rounded-3 fst-italic text-bg-info'>Free !</span>}{' '}
                      </span>
                    </div>
                    <div className='card-calc d-flex align-items-center justify-content-between px-2 pt-4 fs-3 fw-medium'>
                      <span>Total:</span>
                      <span>{`$ ${total.price && (total.price + ship.shipping).toFixed(2)}`}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Col>

        <Col className='col-12 col-xl-4 px-4'>
          <Row className='d-flex flex-column-reverse flex-lg-row'>
            <Col className='col-12 col-lg-7 col-xl-12 mb-5'>
              <Form onSubmit={handlePayment}>
                <div className='fast-calc d-flex flex-column px-5 py-4 pb-2 bg-secondary-subtle shadow rounded-5'>
                  {matchPay && <BankCard />}
                  <div className='calculate d-flex justify-content-between pt-4 p-3'>
                    <span className='calc-title'>
                      Subtotal <span className='calc-label ms-2'>(items)</span>
                    </span>
                    <span className='calc-result'>{total.quantity && total.quantity}</span>
                  </div>
                  <div className='calculate d-flex justify-content-between p-3'>
                    <span className='calc-title'>
                      Price <span className='calc-label ms-2'>(Total)</span>
                    </span>
                    <span className='calc-result'>{`$ ${total.price && total.price.toFixed(2)}`}</span>
                  </div>
                  <div className='calculate d-flex justify-content-between mb-4 p-3'>
                    <span className='calc-title'>Shipping</span>
                    <span className='calc-result'>
                      {ship.shipping > 0 ? `$ ${ship.shipping}` : <span className='py-2 px-4 rounded-3 fst-italic text-bg-info'>Free !</span>}
                    </span>
                  </div>
                  <div className='calculate d-flex justify-content-between px-3 py-5 border-top'>
                    <span className='calc-title'>Estimated Total:</span>
                    <span className='calc-result'>{`$ ${total.price && (total.price + ship.shipping).toFixed(2)}`}</span>
                  </div>
                  <Button
                    type='submit'
                    variant={matchShip ? 'primary' : 'warning'}
                    className='card-btn col-12 col-sm-8 col-md-6 col-lg-8 col-xl-12 py-3 px-5 mb-5 m-auto fs-3 rounded-pill'
                  >
                    {matchPay ? (
                      <span className=''>{`Pay $ ${total.price && (total.price + ship.shipping).toFixed(2)}`}</span>
                    ) : (
                      <span className=''>Continue to checkout</span>
                    )}
                  </Button>
                  {matchPay && (
                    <Link
                      to={'/products'}
                      className='card-btn btn btn-primary mb-5 col-12 col-sm-8 col-md-6 col-lg-8 col-xl-12 py-3 px-5 m-auto fs-3 rounded-pill'
                    >
                      <span className=''>Continue to Shopping</span>
                    </Link>
                  )}
                </div>
              </Form>
            </Col>

            <Col
              id='gifts'
              className='gifts  scroll-margin-top70 col-12 col-lg-5 col-xl-12 mb-5'
            >
              <Link
                to='/'
                className='gift-link w-100 card-info p-4 rounded-5 bg-info bg-opacity-10 shadow-lg border border-success border-opacity-50 hover-8'
              >
                <Row className='gift-contain flex-center'>
                  <Col className='gift-item col-3'>
                    <IconSvg
                      link='gift'
                      className='gift-icons mb-3 fs-11 text-primary'
                    />
                  </Col>
                  <Col className='gift-content col-9'>
                    <h3 className='gift-title text-success fw-normal'>Send this order as a gift.</h3>
                    <p className='gift-desc text-success fw-lighter'>Available items will be shipped to your gift recipient.</p>
                  </Col>
                </Row>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {!matchPay && <div className='card-tooltip mb-5 p-3 fs-1 bg-black bg-opacity-03 rounded-4 shadow'>Xem thêm mặt hàng cùng khoảng giá:</div>}
    </React.Fragment>
  );
});

const timeShip = (d) => {
  const date = new Date();
  const results = new Date(date);
  results.setDate(results.getDate() + d);
  return results.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

export { action, timeShip };
export default ProductCheckout;

export function formatDateTime() {
  const date = new Date();
  const datePart = date.toLocaleDateString();
  let [time, amPm] = date.toLocaleTimeString().split(' ');
  const timeParts = time.split(':');
  if (timeParts.length === 3) {
    timeParts.pop();
    time = timeParts.join(':');
  }
  let result = datePart + ' ' + time;
  if (amPm) result += ' ' + amPm;

  return result;
}
