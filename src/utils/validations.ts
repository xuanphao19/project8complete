// Các hàm kiểm tra tính hợp lệ của dữ liệu, chẳng hạn như kiểm tra định dạng email, password mạnh, hay các điều kiện khác.

const pattern = {
  regex: /^((?=.*[aeiou])(?:[a-zĐ]{1,8}))((\s{1})((?=.*[aeiou])(?:[a-zĐ]{1,8})))*?(\S)$/i,
  names:
    /^(((?=.*[aeiouyàáạảãăằắặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõơờớợởỡôồốộổỗùúụủũưừứựửữyỳýỵỷỹ])(?:[a-zàáạảãăằắặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõơờớợởỡôồốộổỗùúụủũưừứựửữyỳýỵỷỹĐđ]{1,8}))((\s{1})((?=.*[aeiouyàáạảãăằắặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõơờớợởỡôồốộổỗùúụủũưừứựửữyỳýỵỷỹ])(?:[a-zàáạảãăằắặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõơờớợởỡôồốộổỗùúụủũưừứựửữyỳýỵỷỹĐđ]{1,8})))*?(\S))$/i,
  username: /^(?=.{3,20}$)[a-zA-Z][a-zA-Z0-9_-]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])\S{8,}$/,
  phone: /^(0|(\+84))([35789])[0-9]{8}$/,
  cvc: /^\d{3}$/,
  date: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cardNumber: /^([\d]{4} ){3}[\d]{4}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,

  //  .match(/^[^!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$/);

  // email: /^[a-zA-Z0-9.#$%&'*/?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  //  .match(/^[^@]+@[^@]+$/);
  // .match( /^[^@]+@[^@]+$/
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // );
};

const testMaps = {
  cvc: "cvc",
  expire: "date",
  email: "email",
  phone: "phone",
  name: "names",
  holder: "names",
  firstName: "names",
  fullName: "names",
  lastName: "names",
  username: "username",
  password: "password",
  confirmPassword: "password",
  cardNumber: "cardNumber",
};
const verifyInput = (tests: string, value: string, cond = "", isBroError) => {
  if (!testMaps[tests]) return;
  const test = testMaps[tests] || tests;

  try {
    if (tests === "confirmPassword") {
      if (value && !cond) {
        return "Vui lòng nhập Password!";
      } else if (value && isBroError && cond) {
        return "Vui lòng sửa lại Password!";
      } else if (value && !pattern["password"].test(value)) {
        return `${tests} không hợp lệ!!`;
      } else if (cond !== value && !isBroError) {
        return `${tests} không chính xác!`;
      } else if (value && cond === value) {
        return "";
      }
    } else if (value && pattern[test].test(value)) {
      return "";
    } else if (value) {
      return `${tests} không hợp lệ!`;
    }
  } catch (error) {
    console.log('There is an error in the "verifyInput" function:', error);
  }
};

const handleQuickTestForm = (isError: any, Obj: any, Arr: any) => {
  for (const field of Arr) {
    if (!Obj[field]) {
      if (field === "gender") return "Vui lòng chọn giới tính!";
      else return "Vui lòng hoàn thành các trường nhập liệu!";
    }
  }
  if (isError) return "Có lỗi trong form, Vui lòng kiểm tra lại các trường biểu mẫu!";
  return "";
};

const validateForm = (element: any) => {
  return element.querySelector(".error");
};

export { verifyInput, handleQuickTestForm, validateForm };
