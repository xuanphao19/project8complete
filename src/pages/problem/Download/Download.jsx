// Tải xuống
 

const DownloadButton = () => {
  const handleDownload = () => {
    // Tạo một phần tử a để mô phỏng quá trình download
    const link = document.createElement("a");
    // link.href = fileUrl;
    // link.download = fileName;
    link.click();
  };

  // return <button onClick={handleDownload}>Download {fileName}</button>;
  return <button onClick={handleDownload}>Download </button>;
};

const DownloadPage = () => {
  return <h1>DownloadPage.js</h1>;
};

export default DownloadPage;
export { DownloadButton };

// =================
// App.js
// import React from 'react';
// import DownloadButton from './DownloadButton';
// const App = () => {
//   return (
//     <div>
//       <DownloadButton fileUrl="https://example.com/example.pdf" fileName="example.pdf" />
//     </div>
//   );
// };

// export default App;
