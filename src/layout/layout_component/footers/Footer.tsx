// Chân giò! // Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { IconSvg, MainSection, MenuLists } from '@/component';
import { mapNavFooter } from '@/utils';

const Footer = (): JSX.Element => (
  <footer
    id='footer'
    className='container-fluid py-5 bg-secondary-subtle'
  >
    <MainSection
      id='page'
      name='footer'
      className='container py-5'
    >
      <div className='text-md-left'>
        <div className='row text-body text-opacity-75 row-gap-5'>
          <div className='col-lg-6 mt-md-0 py-3 mt-3'>
            <div className='row'>
              <div className='text-center col-md-8'>
                <div className='d-flex position-relative ps-3'>
                  <Link to='/'>
                    <IconSvg
                      className='position-absolute start-0 top-0 fs-13 rounded-circle shadow'
                      link='TikTok-icon-color'
                    />
                  </Link>
                  <h5 className='text-center w-100 text-uppercase p-2 fw-semibold'>Footer Content</h5>
                </div>
                <div className='py-3'>
                  <p className='pt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, maxime et veniam eligendi rem voluptatibus.</p>
                  <p className='pt-3 fw-light fst-italic fs-6'>Receive product news and updates.</p>
                </div>
                <div className='col-sm-10 m-auto'>
                  <Form className='d-flex position-relative'>
                    <Form.Control
                      size='lg'
                      id='footer-search'
                      type='search'
                      placeholder='Search...'
                      className='me-2 py-3 shadow'
                      aria-label='Search'
                    />
                    <Button
                      className='position-absolute top-50 end-0 translate-middle-y me-2 px-3 fs-2 border-opacity-0 shadow'
                      variant='outline'
                    >
                      <IconSvg
                        className='icon-ctrl mb-1'
                        link='magnifying-glass'
                      />
                    </Button>
                  </Form>
                </div>
                <div className='d-flex mt-5'>
                  <MenuLists
                    type='nav'
                    className='d-flex flex-wrap-reverse gap-3 w-100 ps-4 ps-sm-0 justify-content-center'
                    linkClass='p-2 bg-body-secondary shadow rounded-circle flex-center fs-2'
                    iconClass='icon-ctrl text-primary'
                    items={mapNavFooter.brand}
                  />
                </div>
              </div>
              <div className='footer-about d-none d-md-block col-md-4'>
                <h5 className='text-uppercase text-nowrap p-2 ps-4 fw-medium'>About</h5>
                <MenuLists
                  items={mapNavFooter.about}
                  type='nav'
                  className='py-3 ps-3 fw-light fs-5'
                  linkClass='w-100 p-2'
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6 mt-md-0 py-3 px-0 mt-3 text-nowrap'>
            <div className='row w-100'>
              <div className='footer-support col-sm-4 mx-auto'>
                <h5 className='text-uppercase p-2 ps-4 fw-medium'>Support</h5>
                <MenuLists
                  items={mapNavFooter.support}
                  type='nav'
                  className='py-3 ps-3 fw-light fs-5'
                  linkClass='w-100 p-2'
                />
              </div>

              <div className='footer-company d-none d-sm-block col-sm-4 mx-auto'>
                <h5 className='text-uppercase text-nowrap p-2 ps-4 fw-medium'>Company</h5>
                <MenuLists
                  items={mapNavFooter.company}
                  type='nav'
                  className='py-3 ps-3 fw-light fs-5'
                  linkClass='w-100 p-2'
                />
              </div>

              <div className='footer-started col-sm-4 d-block mx-auto'>
                <h5 className='text-uppercase text-nowrap p-2 ps-4 ps-sm-5 fw-medium'>Getting Started</h5>
                <MenuLists
                  items={mapNavFooter.started}
                  type='nav'
                  className='py-3 ps-4 ps-sm-5 fw-light fs-5'
                  linkClass='w-100 p-2'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-copyright text-center pt-5 pb-3'>
        <a
          className='pt-3 spacing-15'
          target='_blank'
          rel='noopener noreferrer'
          href='https://fullstack.edu.vn/'
        >
          <span className='copyright fs-4 fw-light fst-italic'>
            &copy;<span className='px-3'>{` ${new Date().getFullYear()} `}</span>Copyright:
          </span>
          <strong className='fs-4 fw-medium fst-italic ms-3'>Fullstack.edu.vn...</strong>
        </a>
      </div>
    </MainSection>
  </footer>
);

export default Footer;
