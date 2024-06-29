// Các hàm giúp thực hiện các tác vụ nhỏ và phổ biến, như định dạng dữ liệu, xử lý chuỗi, hay các tác vụ tính toán đơn giản.
import { selectElement, loadedIdSvg } from "@/utils/";

const callPhone = (phoneNumber = "0979351075") => {
  window.location.href = `tel:+84 ${phoneNumber}`;
};

const removePreloader = (selector) => {
  selectElement(selector)?.remove();
};

const appendSymbol = (source, data) => {
  const symbol = data.getElementById(`${source}`);
  if (!symbol) return `Not found symbol: ${source}`;

  const iconExists = loadedIdSvg.includes(symbol.id);
  if (iconExists) {
    return null;
  } else if (symbol && !iconExists) {
    loadedIdSvg.push(symbol.id);
    let svgStore = document.querySelector("#SVG-Store");
    if (!svgStore) {
      const newClasses = "w-0 h-0 position-absolute bt-n100 hide";
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("id", "SVG-Store");
      svgElement.setAttribute("class", newClasses);
      document.body.appendChild(svgElement);
      svgStore = svgElement;
    }
    svgStore.appendChild(symbol);
    return null;
  }
};

const getRandomItems = (quota, data) => {
  const remainingItems = [...data];
  const randomItems = [];
  for (let i = 0; i < quota; i++) {
    const randomIndex = Math.floor(Math.random() * remainingItems.length);
    const randomItem = remainingItems[randomIndex];
    randomItems.push(randomItem);
    remainingItems.splice(randomIndex, 1);
  }
  return randomItems;
};

const getRandomNumber = (min, max) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  let number = 0;
  while (numbers.length > 0) {
    const random = Math.floor(Math.random() * numbers.length);
    number = numbers[random];
    numbers.splice(random, 1);
  }
  return number;
};

const getWifeNeighbors = (array, id, x = 1) => {
  const index = array.findIndex((item) => item.id === id);
  if (index === -1) return ["ID không hợp lệ"];

  const half = Math.floor((x - 1) / 2);
  let start = Math.max(0, index - half);
  let end = start + x;

  if (end > array.length) {
    end = array.length;
    start = Math.max(0, end - x);
  }

  return array.slice(start, end);
};

const handleFullscreen = (id) => {
  const node = document.getElementById(id);
  if (node.requestFullscreen) {
    node.requestFullscreen();
  } else if (node.mozRequestFullScreen) {
    node.mozRequestFullScreen();
  } else if (node.webkitRequestFullscreen) {
    node.webkitRequestFullscreen();
  } else if (node.msRequestFullscreen) {
    node.msRequestFullscreen();
  }
};

const getDate = (string) => {
  let [_, month, day, year] = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
};

export { callPhone, getRandomNumber, getRandomItems, removePreloader, appendSymbol, getWifeNeighbors, getDate, handleFullscreen };
