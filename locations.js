const locations = [
    [-40.893762, 174.978244], 
    [-40.785002, 175.151378], 
];

function getTodaysIndex() {
    const startDate = new Date("2024-05-25"); // Starting date
    console.log(startDate)
    const today = new Date();
    console.log(today)
    const diffTime = Math.abs(today - startDate);
    console.log(diffTime)
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays)
    return diffDays;
}
