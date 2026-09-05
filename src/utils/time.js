export function getClockData(){

const now=new Date();

const days=[
"MONDAY","TUESDAY","WEDNESDAY",
"THURSDAY","FRIDAY","SATURDAY","SUNDAY"
];

const months=[
"JAN","FEB","MAR","APR","MAY","JUN",
"JUL","AUG","SEP","OCT","NOV","DEC"
];

const h=String(now.getHours()).padStart(2,"0");
const m=String(now.getMinutes()).padStart(2,"0");

return{
time:h+":"+m,
day:days[(now.getDay()+6)%7],
date:String(now.getDate()).padStart(2,"0")+" "+months[now.getMonth()]+" "+now.getFullYear()
};

}
