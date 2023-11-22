export default function delayResponse(schema, options) {
  schema.pre("find", function (next) {
    const delay = 3000; // 3 saniye gecikme
    // Bu, 'find' işlemi yapılmadan önce çalışacak
    setTimeout(() => {
      next();
    }, delay);
  });
  schema.pre("findOneAndUpdate", function (next) {
    const delay = 3000; // 3 saniye gecikme
    // Bu, 'find' işlemi yapılmadan önce çalışacak
    setTimeout(() => {
      next();
    }, delay);
  });
}
