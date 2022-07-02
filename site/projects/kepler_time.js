let now = (new Date).getTime();
let kepler_init = (new Date("2022-07-01")).getTime();
let diff = now - kepler_init;
let days = Math.floor(diff / (1000 * 3600 * 24));
//console.log(days);
let span = document.getElementById("kepler_lifetime");
span.innerHTML = "for " + days + " days";
