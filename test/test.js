const update = {
  title: 'Marco',
  body: 'Amazing',
  userId: 1,
};

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  //   body: JSON.stringify(update),
};

fetch('https://jsonplaceholder.typicode.com/posts/1', options)
  .then((data) => {
    if (!data.ok) {
      throw Error(data.status);
    }
    return data.json();
  })
  .then((update) => {
    console.log(update);
  })
  .catch((e) => {
    console.log(e);
  });
