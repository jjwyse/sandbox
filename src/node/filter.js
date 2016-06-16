const results = [
{
   "id": 1,
   "name": "josh"
},
{
   "id": 2,
   "name": "laura"
}
];

const id = results.filter(i => i.name === 'josh')[0].id;
console.log(id);
