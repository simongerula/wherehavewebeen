const locations = [
    [-40.893762, 174.978244], 
    [-40.785002, 175.151378], 
];

function getTodaysIndex() {
    const startDate = new Date("2024-05-25"); // Starting date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays % locations.length;
}
