const locations = [
    [-40.893762, 174.978244], 
    [-40.785002, 175.151378],
    [-38.649647, 176.089431], 
];

function getTodaysIndex() {
    const startDate = new Date("2024-05-25"); // Starting date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
