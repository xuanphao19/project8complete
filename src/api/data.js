const cityName = [
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Ninh Bình",
  "Đà Nẵng",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên - Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const initialUserState = {
  userId: 1,
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",

  gender: "",
  address: "",
  fullName: "",
  birthday: "",
  avatarUrl: "",
  phoneNumber: "",
  isAdmin: false,
  isVip: false,
};

const formFields = [
  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    autoComplete: "on",
    required: true,

    icon: "Admin",
    classIcon: "text-body fs-4 cursor-pointer-auto",
    iconError: "",
  },
  {
    id: "lastName",
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
    autoComplete: "on",
    required: true,

    icon: "Admin",
    classIcon: "text-success fs-4 cursor-pointer-auto",
    iconError: "",
  },
  {
    id: "fullName",
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Full Name",
    autoComplete: "on",
    required: true,

    icon: "Admin",
    classIcon: "text-success fs-4 cursor-pointer-auto",
    iconError: "",
  },
  {
    id: "username",
    name: "username",
    label: "User Name",
    type: "text",
    placeholder: "Enter User Name",
    autoComplete: "on",
    required: true,

    icon: "Admin",
    classIcon: "text-danger fs-4 cursor-pointer-auto",
    iconError: "icon-error",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
    autoComplete: "on",
    required: true,

    icon: "envelope",
    classIcon: "text-primary fs-4 cursor-pointer-auto",
    iconError: "icon-error",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Password",
    autoComplete: "off",
    required: true,

    icon: true,
    iconError: "icon-error",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Enter Confirm Password",
    autoComplete: "off",
    required: true,

    icon: true,
    iconError: "icon-error",
  },
  {
    id: "phone",
    name: "phone",
    label: "Phone:",
    type: "tel",
    placeholder: "Enter Phone",
    autoComplete: "off",
    required: true,

    icon: "phone",
    classIcon: "text-primary fs-4 cursor-pointer-auto",
    iconError: "icon-error",
  },
  {
    id: "address",
    name: "address",
    label: "Address:",
    type: "text",
    role: "textarea",
    required: true,
    placeholder: "Address (Area and street)",
    autoComplete: "on",
    as: "textarea",
    rows: 3,
  },
  {
    id: "holder",
    name: "card-holder",
    label: "Card Holder:",
    placeholder: "Enter Card Holder",
    autoComplete: "on",
    icon: "icon-error",
    required: true,
  },
  {
    id: "cardNumber",
    name: "card-details",
    label: "Card Details:",
    placeholder: "Enter Card Number",
    autoComplete: "on",
    icon: "icon-error",
    maxLength: "19",
    required: true,
    type: "number",
  },
  {
    id: "expire",
    name: "expire",
    placeholder: "MM/YY",
    icon: "icon-error",
    maxLength: "5",
    required: true,
    type: "number",
    autoComplete: "off",
  },
  { id: "cvc", name: "card-cvc", placeholder: "CVC", autoComplete: "off", icon: "icon-error", maxLength: "3", required: true, type: "number" },
];

const registerFieldLeft = ["firstName", "lastName", "username"];
const registerFieldRight = ["email", "password", "confirmPassword"];

const socialRegister = [
  { href: "https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw", icon: "google-color", className: "text-danger" },
  { href: "https://github.com/xuanphao19", icon: "GitHub", className: "text-body ms-3" },
  { href: "https://www.facebook.com/Nguyenthanhhoa075", icon: "Facebook_circle", className: "ms-3" },
];

const genderOptions = [
  { id: "male", label: "Male", value: "male" },
  { id: "female", label: "Female", value: "female" },
  { id: "other", label: "Other", value: "other" },
];

export { cityName, genderOptions, socialRegister, formFields, initialUserState, registerFieldLeft, registerFieldRight };
