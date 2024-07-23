const locations = [
    [-40.893762, 174.978244], 
    [-40.785002, 175.151378],
    [-38.649647, 176.089431],
    [-40.923093, 175.102416],
    [-41.012509, 174.920589],
    [-40.923093, 175.102416],
    [-40.919358, 174.977775],
    [-40.876333, 175.066472],
    [-40.861603, 175.022028],
    [-44.693233, 169.164994],
    [-41.296634, 174.833209],
    [-38.690668, 176.070978],
    [-40.866488, 175.061997],
    [-40.995487, 175.388361],
    [-40.902235, 176.229109],
    [-40.909827, 176.221212],
    [-40.985328, 174.951122],
    [-40.922856, 175.099537],
    [-40.866490, 175.061975],
    [-40.899651, 176.231604],
    [-44.696415, 169.137580],
    [-40.902235, 176.229109],
    [-40.866530, 175.061875],
    [-40.831933, 175.055114],
    [-40.866463, 175.061981],
    [-40.893837, 174.978552],
    [-40.919248, 174.977754],
    [-41.292635, 174.778354],
    [-40.981998, 174.957280],
    [-41.137746, 174.840070],
    [-40.846577, 175.049074],
    [-38.690713, 176.070991],
    [-40.923155, 175.102643],
    [-40.894632, 174.977923],
    [-40.866518, 175.061999],
    [-40.893553, 174.979331],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263],
    [-40.893534, 174.979263], 
    [35.633053, 139.880312],
    [35.633053, 139.880312], 
    [35.633758, 139.878783],
    [26.099778, 127.658913],
    [26.205283, 127.648404],
    [35.659401, 139.700656], //50
    [34.703945, 135.500000],
    [34.687747, 135.839783],
    [34.967350, 135.775497],
    [26.099967, 127.659788],
    [34.694695, 135.502992],
    [35.764278, 140.295242],
    [35.772052, 140.389408],
    [35.711730, 139.769517],
    [35.632570, 139.881728],
    [35.700158, 139.700608]
]; 

function getTodaysIndex() {
    const startDate = new Date("2024-05-25"); // Starting date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
