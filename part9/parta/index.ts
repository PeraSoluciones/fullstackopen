import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isArrayOfNumbers, isNotNumber } from './utils';
const app = express();

app.use(express.json());

const PORT = 3003;
app.get('/hello', (_req, res) => {
    res.send('Hello full stack!');
});
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight))
        return res.status(400).json({ error: 'malformatted parameters' });
    else return res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: 'parameters missing' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!isArrayOfNumbers(daily_exercises) || isNotNumber(target)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(calculateExercises(daily_exercises, target));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
