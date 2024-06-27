// Tải xuống

const DownloadButton = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.click();
  };
  return <button onClick={handleDownload}>Download </button>;
};

const DownloadPage = () => {
  return <h1>DownloadPage.js</h1>;
};

export default DownloadPage;
export { DownloadButton };
