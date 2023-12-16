const getRandomFromRange = (min: number, max: number) => min <= max ? Math.random() * (max - min) + min : 0;

export default getRandomFromRange