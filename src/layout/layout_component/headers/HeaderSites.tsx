/* eslint-disable no-console */
// import CryptoJS from "crypto-js"; // Băm rau lợn

import React, { memo, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/vendor/redux/store';
import { Logo, Avatar, Header, ModalAvatar, FavouriteModal, ModalCartBtn, ModalCart } from '@/component';
import { handleListenerEvent, getElement, findRelatives } from '@/utils';
import HeaderMenu from './HeaderMenu';

const HeaderSites = ({
  isLSOP = ['/', '/home'], // "is Listening Scroll On Path"
  distance = 80,
}) => {
  const headRef = useRef(null);
  const avatarRef = useRef(null);
  const { pathname } = useLocation();
  const BtnRegister = 'div';
  const BtnLogin = 'div';

  const matchPath = isLSOP.some((path) => path === pathname);
  const favorites = useSelector((state: RootState) => state.app.favorites);
  const [exactPath, setExactPath] = useState(matchPath);
  const [favoriteData, setFavoriteData] = useState();
  const user = useSelector((state: RootState) => state.app.userData);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    setIsVip(user.isVip);
    setUserId(user.userId);
    setAvatarUrl(user.avatarUrl);
  }, [user]);

  useEffect(() => {
    setFavoriteData(favorites);
  }, [favorites]);

  useEffect(() => {
    setExactPath(matchPath);
  }, [pathname]);

  const headerFixed: (e: any) => void = (e) => {
    const scrollY = e.currentTarget.scrollY;
    if (headRef.current) {
      const scrolledOffset = getElement('top-bar');
      distance = scrolledOffset ? scrolledOffset.offsetHeight : distance;
      const scrolly = scrollY >= distance;
      const nextElement = findRelatives(headRef.current);
      headRef.current.classList.toggle('fix-top', scrolly);
      nextElement.classList.toggle('scrolled-offset', scrolly);
    }
  };

  useEffect(() => {
    const headElement = headRef.current;

    if (exactPath && headElement) {
      headElement.classList.remove('change-height');
    } else {
      headElement.classList.add('change-height');
    }

    exactPath && distance && handleListenerEvent(exactPath, 'scroll', headerFixed);
    if (!exactPath && distance && headElement) {
      const existClass = headElement.classList.contains('fix-top');
      const nextElement = headElement.nextElementSibling;
      if (existClass && nextElement) {
        headElement.classList.remove('fix-top');
        nextElement.classList.remove('scrolled-offset');
      }
      distance && handleListenerEvent(false, 'scroll', headerFixed);
    }
    return () => {
      handleListenerEvent(false, 'scroll', headerFixed);
    };
  }, [exactPath]);

  return (
    <Header
      ref={headRef}
      headerId='site'
      className='bg-secondary user-select-none shadow-sm'
    >
      <div className={'header-inner d-flex align-items-center  justify-content-lg-between w-100'}>
        <div className='d-flex align-items-center col-lg-8 flex-row-reverse flex-md-row flex-grow-1'>
          <Logo />
          <HeaderMenu />
        </div>

        <div className='header-control d-flex align-items-center ms-auto'>
          <div className='header-control flex-center gap-3'>
            <BtnRegister />
            <BtnLogin />
            <div className='d-flex align-items-center gap-3'>
              <div className='d-flex align-items-center'>
                <FavouriteModal data={favoriteData} />
                <ModalCart data={favoriteData}>
                  <ModalCartBtn className='position-relative d-flex align-items-center ps-xl-2 border border-start-0 rounded-end-3 bg-body shadow-sm' />
                </ModalCart>
              </div>

              <ModalAvatar avatarUrl={avatarUrl}>
                <Avatar
                  ref={avatarRef}
                  isVip={isVip}
                  src={avatarUrl}
                  userID={userId}
                  className='fs-11'
                />
              </ModalAvatar>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default memo(HeaderSites);
