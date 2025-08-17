interface BmiValues {
    height: number;
    weight: number;
}
export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else {
        return 'Overweight';
    }
};

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
        errorMessage += ' Error: ' + e.message;
    }
    console.log(errorMessage);
}
