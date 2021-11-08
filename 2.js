function a(x, y, z) {
  console.log(this, x, y, z);
}

const b = {
  isThis: 'thisthis',
};

a.call(b, 1, 2, 3);
// { isThis: 'thisthis' } 1 2 3
a.apply(b, [1, 2, 3]);
// { isThis: 'thisthis' } 1 2 3
const c = a.bind(b, 1, 2, 3);
c(1, 2, 3);
// { isThis: 'thisthis' } 1 2 3
const d = a.bind(b);
d(1, 2, 3);
// { isThis: 'thisthis' } 1 2 3
