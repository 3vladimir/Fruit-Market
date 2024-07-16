
export default function findProductFarsiName(inputProductName) {
    switch (inputProductName) {
      case "banana":
        return "موز";
      case "orange":
        return "پرتقال";
      case "apple":
        return "سیب";
      default:
        throw new Error("محصول مورد نظر در سایت موجود نمی باشد");
    }
  }