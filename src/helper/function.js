export const generateCode = (value) => {
  let output = "";
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .forEach((item) => {
      output += item.charAt(0) + item.charAt(1);
    });
  return output.toUpperCase() + value.length;
};

export const generateUserId = () => {
  // Tạo một userId mới sử dụng số ngẫu nhiên
  return Math.floor(Math.random() * 1000000); // Ví dụ: tạo một số ngẫu nhiên trong khoảng từ 0 đến 999999
};
