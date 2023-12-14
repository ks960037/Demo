export default defineEventHandler(async (event) => {
  console.log("送出hello");
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  return data;
})
