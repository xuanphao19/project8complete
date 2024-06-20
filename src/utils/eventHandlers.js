// Các hàm xử lý sự kiện chung: click, change, submit...
// throw new Error(`Not found Element with id == ${anchor}`);

const selectElement = (el, all = false) => {
  if (!el || !el.trim()) throw new Error("Invalid provided selector!");
  try {
    const elements = all ? [...document.querySelectorAll(el)] : document.querySelector(el);
    return elements;
  } catch (error) {
    console.error("Error selecting element:", error);
    return all ? [] : null; // Default return values for error cases
  }
};

const getElement = (sl, by = "id") => {
  try {
    sl = sl && sl.trim();
    let element;
    switch (by) {
      case "class": // All phần tử có ClassName=(sl)
        element = document.getElementsByClassName(sl);
        break;
      case "tag": // All phần tử có TagName=(sl)
        element = document.getElementsByTagName(sl);
        break;
      case "name": // All phần tử có Thuộc tính name=(sl)
        element = document.getElementsByName(sl);
        break;
      default: // Phần tử có Id duy nhất
        element = document.getElementById(sl);
        break;
    }
    return element;
  } catch (error) {
    return by != "id" ? [] : null;
  }
};

const findElementParent = (target, attr) => {
  // attr Nhận string attrib "href" or CSS selector.
  // Khi click element => Parent có attrib or selector đó.

  try {
    let parentElement;
    while (target) {
      if (attr === "href" && target.getAttribute("href")) {
        parentElement = target;
        break;
      } else if (attr.startsWith(".")) {
        if (target.classList.contains(attr.substring(1))) {
          parentElement = target;
          break;
        }
      } else if (attr.startsWith("#")) {
        if (target.id === attr.substring(1)) {
          parentElement = target;
          break;
        }
      }
      target = target.parentNode;
    }
    return parentElement;
  } catch {
    return null;
  }
};

const findRelatives = (fulcrum, test = "next", selector) => {
  let relatives = null;
  if (fulcrum && test === "prev") {
    relatives = fulcrum.previousElementSibling;
  } else if (fulcrum && test === "next") {
    relatives = fulcrum.nextElementSibling;
  }
  if (relatives && selector) {
    return relatives.querySelector(selector);
  } else return relatives;
};

const findAnchorByHref = (target, attr) => {
  const element = findElementParent(target, attr);
  if (!element) return null;
  const lastHashIndex = element.getAttribute(attr).lastIndexOf("#");
  if (lastHashIndex === -1) return null;
  const targetId = element.getAttribute(attr).substring(lastHashIndex + 1);
  return getElement(targetId);
};

const handleScrollLocation = (anchor, destination, prefix) => {
  // Gọi trực tiếp: Truyền anchor = id element cần cuộn
  const scrollTo = destination && destination;
  if (!anchor) return null; // Không có element cần cuộn station scrollTo
  const station = prefix ? getElement(scrollTo, prefix) : getElement(scrollTo);
  const stationHeight = station != null ? station.offsetHeight : 50;
  const isNode = anchor instanceof Node;
  const isString = typeof anchor === "string";
  const element = isNode ? anchor : isString ? getElement(anchor) : document.documentElement;
  return window.scrollTo({ top: element.offsetTop - (stationHeight + 6), behavior: "smooth" });
};

const handleListenerEvent = (test, action, handleEvent) => {
  if (!action || typeof handleEvent !== "function") {
    throw new Error("action must be a value");
  }
  if (!test) {
    window.removeEventListener(action, handleEvent);
  } else {
    window.addEventListener(action, handleEvent);
  }
};

const scrollToTop = (top) => {
  window.scrollTo({
    top: +top,
    left: 0,
    behavior: "smooth",
  });
};

const smoothScrollToAnchor = (e, scrollTo) => {
  e.preventDefault();
  // Scroll to el has id = href trên thẻ được Click!
  const currentTarget = e.target; // ref.current
  const element = findAnchorByHref(currentTarget, "href");
  // scrollTo is id element onTop!
  handleScrollLocation(element, scrollTo);
};

export { selectElement, getElement, findElementParent, findRelatives, handleScrollLocation, scrollToTop, smoothScrollToAnchor, handleListenerEvent };
