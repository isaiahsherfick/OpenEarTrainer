import {Note} from '../Note';
import {NoteName} from '../NoteName';
import {Interval, Intervals} from '../Interval';
import {getRandomIntervalAscending} from '../TrainingEngine';

describe('TrainingEngine', () => {
    it('Should be able to generate random ascending intervals', () => {
        const maxAttempts = 50000;
        let actualAttempts = 0;
        const targetInterval = Interval.AscendingInterval(
            new Note(NoteName.C, 4),
            Intervals.majorSecond,
        );
        let actualInterval: Interval = getRandomIntervalAscending();
        while (!actualInterval.equals(targetInterval)) {
            actualInterval = getRandomIntervalAscending();
            actualAttempts += 1;
            if (actualAttempts > maxAttempts) {
                console.log("Max attempts reached.");
                break;
            }
        }
        expect(actualInterval.equals(targetInterval)).toEqual(true);
    });
});
