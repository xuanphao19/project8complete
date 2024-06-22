// Em đã đi qua nơi đâu?
import { Outlet, useNavigation, Link } from 'react-router-dom';
import { Navigation } from '@component';

const HistoryPage = () => {
  const navigation = useNavigation();
  return (
    <MainSection
      id='history'
      className='container d-flex py-6'
      name='section'
    >
      <h1>Lịch sử Của công ty</h1>
      <Navigation
        links={[
          { path: '/', name: '⭐⭐⭐' },
          { path: 'register', name: '⭐Register⭐' },
          { path: 'about/history/editor', name: '🌻🌼⭐🚗⭐' },
          { path: 'about/history/events_s', name: '🌻🌼💥💥events💥' },
          { path: 'team', name: '🌻Đội Nhóm🌼' },
        ]}
      />
      <div
        id='history-content'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <h2>"History"</h2>
        <p className='fs-1 bg-black text-end p-2 m-0 text-opacity-25'>bg-black text-body</p>
        <p className='fs-1 bg-success-subtle text-end p-2 m-0 text-body'>bg-black text-body</p>
        <Outlet />
      </div>
    </MainSection>
  );
};
export default HistoryPage;

// https://github.com/WI1IN/project-htmlcss-08
