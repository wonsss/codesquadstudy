const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getLine = (function () {
  const getLineGen = (async function* () {
    for await (const line of rl) {
      yield line;
    }
  })();
  console.log('@', getLineGen.next());
  return async () => (await getLineGen.next()).value;
})();

const main = async () => {
  let a = Number(await getLine());
  let b = Number(await getLine());
  console.log(a + b);
  process.exit(0);
};

main();
