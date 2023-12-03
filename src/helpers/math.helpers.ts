//---------------------- Degree-Based Math Functions -----------------------

export const degreeToRadians = (degree: number) => (degree * Math.PI) / 180.0;

export const radiansToDegree = (radians: number) => (radians * 180.0) / Math.PI;

export const sin = (degree: number) => Math.sin(degreeToRadians(degree));
export const cos = (degree: number) => Math.cos(degreeToRadians(degree));
export const tan = (degree: number) => Math.tan(degreeToRadians(degree));

export const arcsin = (degree: number) => radiansToDegree(Math.asin(degree));
export const arccos = (degree: number) => radiansToDegree(Math.acos(degree));
export const arctan = (degree: number) => radiansToDegree(Math.atan(degree));

export const arccot = (degree: number) =>
	radiansToDegree(Math.atan(1 / degree));
export const arctan2 = (y: number, x: number) =>
	radiansToDegree(Math.atan2(y, x));

const fix = (value: number, limit: number) => {
	const adjustedValue = value - limit * Math.floor(value / limit);
	return adjustedValue < 0 ? adjustedValue + limit : adjustedValue;
};
export const fixAngle = (angle: number) => fix(angle, 360);
export const fixHour = (hour: number) => fix(hour, 24);

//---------------------- Astronomical Math Functions -----------------------

// compute declination angle of sun and equation of time
// Ref: http://aa.usno.navy.mil/faq/docs/SunApprox.php
export const getSunPosition = (julianDate: number) => {
	const d = julianDate - 2451545.0;
	const g = fixAngle(357.529 + 0.98560028 * d);
	const q = fixAngle(280.459 + 0.98564736 * d);
	const l = fixAngle(q + 1.915 * sin(g) + 0.02 * sin(2 * g));

	const e = 23.439 - 0.00000036 * d;
	const ra = arctan2(cos(e) * sin(l), cos(l)) / 15;

	return {
		declination: q / 15 - fixHour(ra),
		equation: arcsin(sin(e) * sin(l)),
	};
};

// Compute mid-day time
export const getMidDay = (julianDate: number, time: number) => {
	const equation = getSunPosition(julianDate + time).equation;
	return fixHour(12 - equation);
};

export const getSunAngleTime = (
	julianDate: number,
	angle: number,
	time: number,
	latitude: number,
	direction: "ccw" | "cw",
): number => {
	const sunDeclination = getSunPosition(julianDate + time).declination;
	const noon = getMidDay(julianDate, time);
	const t =
		(1 / 15) *
		arccos(
			(-sin(angle) - sin(sunDeclination) * sin(latitude)) /
				(cos(sunDeclination) * cos(latitude)),
		);
	return noon + (direction === "ccw" ? -t : t);
};

// return sun angle for sunset/sunrise
export const getRiseSetAngle = (elevation: number) => {
	// const earthRadius = 6371009; // in meters
	// const angle = arccos(earthRadius / (earthRadius + elevation));
	const angle = 0.0347 * Math.sqrt(elevation); // ~ an approximation
	return 0.833 + angle;
};

// Compute the fixed difference between two times
export const getTimeDifference = (time1: number, time2: number) =>
	fixHour(time2 - time1);
