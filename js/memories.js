let memoryIndex = localStorage.getItem('memoryIndex');
const memoryText = [
    'Feeling you close',
    'Sitting watching the sunset',
    'Going for a walk',
    'Riding bike',
    'Cooking together',
    'Watering the plants in Wanaka',
    'Holding your Hand (Could do this all day)',
    'Defusing Bombs! (Yes we are a great team)',
    'Buying or creating deco for our room / HOME',
    'Walking with you to the train',
    'Playing tennis with you my love and your parents',
    'Hiking in CastlePoint',
    'Hugging you all the time',
    'Enjoying life with you',
    'Going to a park and just sitting. What is life?',
    'Spotting planes, my favorite',
    'Working from home. I miss you love',
    'Just looking at you riding and holding your hand',
    'You grabbing my hand in bed before falling asleep',
    'Making a fire in the caravan',
    'Doing groceries together',
    'Lifting youuu',
    'Watching series or movies together',
    'Waking up next to you (You look beautiful)',
    'Getting breakfast together on weekends or when working from home',
    'LOADING...'
]
!memoryIndex || memoryIndex == 26 ? memoryIndex = 0 : memoryIndex = memoryIndex;
if(memoryIndex == 25){
    document.querySelector('img').setAttribute('src',`drawings/memory${memoryIndex}.gif`);
} else {
    document.querySelector('img').setAttribute('src',`drawings/memory${memoryIndex}.jpg`);
}
document.querySelector('.memory.story').textContent = memoryText[memoryIndex];
memoryIndex ++;
localStorage.setItem('memoryIndex', memoryIndex);
