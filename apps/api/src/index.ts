import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'fp-ts-exercises API is running' });
});

app.get('/api/exercises', (req, res) => {
  res.json({
    categories: [
      {
        id: 'option',
        name: 'Option',
        description: 'Learn about the Option type for handling nullable values',
        exercises: [
          { id: '01', name: 'Some and None', slug: 'some-and-none' },
          { id: '02', name: 'Of', slug: 'of' },
          { id: '03', name: 'From Predicate', slug: 'from-predicate' },
          { id: '04', name: 'Fold', slug: 'fold' },
          { id: '05', name: 'From Nullable', slug: 'from-nullable' },
          { id: '06', name: 'To Nullable', slug: 'to-nullable' },
          { id: '07', name: 'To Undefined', slug: 'to-undefined' },
          { id: '08', name: 'Get Or Else', slug: 'get-or-else' },
          { id: '09', name: 'Filter', slug: 'filter' },
          { id: '10', name: 'From Either', slug: 'from-either' }
        ]
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
