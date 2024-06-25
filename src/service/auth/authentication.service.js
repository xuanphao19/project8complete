import { authF8, createUser, sendEmail, deleteUser, setPersistence } from "@/config/authConfig";
import { EmailProvider, browserSession, reauthenticate, signInWith, signOut, resetPassword } from "@/config/authConfig";

const returnError = (error, errDesc) => {
  console.error(`⛔${errDesc}:::`, error);
  console.error("\n⭐Error.code:", error.code);
  console.error("\n⭐Error.message:", error.message);
  return { success: false, code: error.code, message: error.message };
};

/* ==== Gửi Mail yêu cầu xác thực! === */
const sendEmailAuth = async (user, message = "Một email đã gửi tới hòm thư của bạn. Vui lòng kiểm tra Email và làm theo hướng dẫn!") => {
  try {
    await sendEmail(user);
    return { success: true, message: message };
  } catch (error) {
    return returnError(error, "Error sending verification email:");
  }
};

/* ==== Đăng ký người dùng mới! === */
const registerNewUser = async (email, password) => {
  if (!email || !password) return { success: false, message: "Email & password is required!" };
  if (email === authF8.currentUser?.email) return { success: false, message: "Hàng đã qua sử dụng - Không tái sử dụng!" };
  try {
    const userCredential = await createUser(authF8, email, password);
    const user = userCredential.user;
    const emailSended = await sendEmailAuth(
      user,
      "Chúc mừng bạn đẵ đăng ký thành công tài khoản! Một email xác nhận đã được gửi địa chỉ email của bạn. Vui lòng kiểm tra hòm thư và làm theo hướng dẫn để kích hoạt tài khoản i-💔-f8!",
    );
    if (user) await logoutUser("Đã đăng xuất người dùng mới");
    return {
      user: { ...user.reloadUserInfo, username: user.displayName },
      register: { success: emailSended.success, message: emailSended.message },
    };
  } catch (error) {
    return returnError(error, "Error during user registration:");
  }
};

/* ==== Đăng Nhập Xác thực!   === */
const authUserLogin = async (email, password, message = "Đăng nhập thành công") => {
  if (!email || !password) return { success: false, message: "Email & password is required!" };
  if (authF8.currentUser && authF8.currentUser.email === email) {
    return { success: false, message: "Người dùng đang đăng nhập!" };
  } else signOut(authF8);
  try {
    // setPersistence => PHIÊN đăng nhập (trình duyệt).
    await setPersistence(authF8, browserSession);
    const userCredential = await signInWith(authF8, email, password);
    const user = userCredential.user;
    if (user && user.emailVerified === false) {
      logoutUser("Đăng xuất người dùng chưa xác minh email!");
      return { success: false, message: "Bạn chưa xác thực Email. Vui lòng truy cập và là theo hướng dẫn tại Email đã đăng ký!" };
    } else {
      return {
        ...user.reloadUserInfo,
        avatarUrl: user.photoURL,
        username: user.displayName,
        phoneNumber: user.phoneNumber,
        success: true,
        message: message,
      };
    }
  } catch (error) {
    return returnError(error, "Error signing in:");
  }
};

/* ==== Đăng xuất người dùng! === */
const logoutUser = async (message = "User logged out successfully!") => {
  try {
    await signOut(authF8); //=> user: null;
    return { user: authF8.currentUser, success: true, message: message };
  } catch (error) {
    return returnError(error, "Error logging out:");
  }
};

/* ==== Xóa tài khoản người dùng! === */
// Popper Trước khi Xóa cấp password cho: reAuthUser
const deleteAccount = async (email, password, message = "User account deleted successfully!") => {
  if (!email || !password) return { success: false, message: "Email & password is required!" };
  try {
    const currentUser = authF8.currentUser;
    if (!currentUser) {
      throw new Error("No Current User, at delete User Account.");
    }
    const reAuth = await reAuthUser(email, password);
    if (reAuth.success) {
      const user = reAuth.user;
      await deleteUser(user);
      console.log(message);
      return { success: reAuth.success, message: message, email: email };
    }
  } catch (error) {
    return returnError(error, "Error deleting user account:");
  }
};

/* ==== Xác thực lại người dùng === */
// Tạo Popup cấp password khi gọi reAuthUser
const reAuthUser = async (email, password) => {
  if (!email || !password) return { success: false, message: "Email & password is required!" };
  // Lấy User hiện tại.
  const currentUser = authF8.currentUser;
  if (!currentUser) {
    throw new Error("reAuthUser: No Current User, is currently signed in.");
  }
  // Gửi yêu cầu tạo chứng chỉ (credential để đối sánh)!
  const credential = EmailProvider.credential(email, password);
  try {
    // Đối sánh currentUser với credential ?
    const reAuth = await reauthenticate(currentUser, credential);
    if (reAuth) {
      // reAuth => Cho phép các hành động tiếp theo!
      const user = reAuth.user;
      return { user, success: true, message: "User reauthenticated successfully." };
    }
  } catch (error) {
    // Error => Hạn chế các hành động tiếp theo!
    return returnError(error, "Error reAuthUser");
  }
};

const sendPasswordReset = async (email, password) => {
  if (!email || !password) return { success: false, message: "Email & password is required!" };
  if (!authF8.currentUser) {
    return { success: false, message: "Người dùng chưa đăng nhập!" };
  } else signOut(authF8);

  try {
    await resetPassword(authF8, email);
    alert("Password Reset Email Sent!");

    return { success: true, message: `Đã gửi email tới ${email}. Vui lòng kiểm tra và làm theo hướng dẫn!` };
  } catch (error) {
    return returnError(error, "Error sendPasswordReset:");
  }
};

export default registerNewUser;
export { sendEmailAuth, authUserLogin, logoutUser, deleteAccount, reAuthUser, sendPasswordReset };

/*
const handleRegister = async (email, password) => {
  try {
    // Bước 1: Tạo người dùng mới và đăng xuất ngay lập tức
    const newUser = await registerNewUser(email, password);
    // Bước 2: Gửi email xác minh cho người dùng mới
    const verificationMessage = await sendVerificationEmail(newUser);
    console.log(verificationMessage);
    // Thông báo cho người dùng về việc gửi email xác minh thành công
    alert(verificationMessage);
  } catch (error) {
    console.error('Registration process failed:', error);
    // Thông báo cho người dùng về lỗi xảy ra
    alert(`Error: ${error.message}`);
  }
};
// // Gọi hàm Đăng ký:
// const onSubmit = async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;
//   await handleRegister(email, password);
// };

const handleLogin = async (email, password) => {
  try {
    const user = await authUserLogin(email, password);
    alert('User signed in successfully.');
  } catch (error) {
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message}`);
  }
};
// // Gọi hàm Đăng nhập:
// const onSubmit = async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;
//   await handleLogin(email, password);
// };

const handleDeleteAccount = async (email, password) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteAccount(user, email, password);
      alert('User account deleted successfully.');
    } catch (error) {
      console.error('Account deletion failed:', error);
      alert(`Account deletion failed: ${error.message}`);
    }
  } else {
    alert('No user is currently signed in.');
  }
};
// // 3. Xóa tài khoản người dùng
// const onSubmit = async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;
//   await handleDeleteAccount(email, password);
// };
*/
