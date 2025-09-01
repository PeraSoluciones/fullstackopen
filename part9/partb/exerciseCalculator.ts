import { isArrayOfNumbers, isNotNumber } from './utils';
interface Arguments {
    dailyHours: number[];
    target: number;
}
interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
export const calculateExercises = (
    dailyHours: number[],
    target: number
): Results => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((day) => day > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    const ratingDescription = 'not too bad but could be better';
    if (Math.ceil(average) > target) rating = 3;
    if (Math.ceil(average) === target) rating = 2;
    if (Math.ceil(average) < target) rating = 1;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const _parseArguments = (args: string[]): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = args[2];
    const dailyHours = args.slice(3);
    if (!isNotNumber(target) && isArrayOfNumbers(dailyHours)) {
        return {
            dailyHours: args.slice(3).map((day) => Number(day)),
            target: Number(args[2]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { dailyHours, target } = _parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error:' + error.message;
    }
    console.log(errorMessage);
}
