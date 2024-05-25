const locations = [
    [48.8584, 2.2945], // Eiffel Tower, Paris
    [40.6892, -74.0445], // Statue of Liberty, New York
    [-33.8568, 151.2153], // Sydney Opera House, Sydney
    // Add more locations as needed
];

function getTodaysIndex() {
    const startDate = new Date("2024-05-25"); // Starting date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays % locations.length;
}
