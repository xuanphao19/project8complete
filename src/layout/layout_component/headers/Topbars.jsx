import React from 'react';
import { ContactInfo } from '@/component';

const Topbar = () => {
  return (
    <div
      id='top-bar'
      className='top-bar bg-info bg-gradient bg-opacity-10 d-none d-md-flex'
    >
      <ContactInfo
        className='d-flex align-items-end container gap-4 p-2 fs-4'
        email='nguyenthanhhoa075@gmail.com'
        phone='+84 979351075'
      />
    </div>
  );
};

export default Topbar;
