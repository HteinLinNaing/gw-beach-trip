import React, {  } from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';

const Countdown = () => {
	return (
		<FlipCountdown
			hideYear
			hideMonth
			// hideHour
			// hideMinute
			// hideSecond
			dayTitle='Days'
			hourTitle='Hours'
			minuteTitle='Minutes'
			secondTitle='Seconds'
			theme='dark' // Options (Default: dark): dark, light.
			titlePosition='top' // Options (Default: top): top, bottom.
			size='large' // Options (Default: medium): large, medium, small, extra-small.
			endAtZero
			endAt={'2024-07-19 00:00:00'} // Date/Time
			onTimeUp={() => console.log("Time's up ⏳")}
		/>
	);
};

export default Countdown;
