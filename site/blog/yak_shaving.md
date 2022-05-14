---
rss_chan_id=c1 
rss_pubdate=Mon, 09 May 2022 16:30:00 +0100 
title=the joy of yak shaving 
rss_description=in which i explain why building things yourself is so much fun 
---
 
##BODY## 
 
# *yak shaving* 
 
we've all been there. you're about to set off on a large-scale project (say, 
rebuilding your website) when you suddenly realise there's something you need to 
do first before you can even start (say, building a new neocities API tool). 
this, of course, is a recursive process. i'll have the update ready as soon as 
i've finished shaving this yak. 
 
it's not all bad, though. i'll use my recent projects 
[drneo](https://github.com/ambyshframber/drneo) and 
[staticcc](https://github.com/ambyshframber/staticcc) as examples. my first 
thought was "i should really rework my website to use markdown. manually writing 
html is a pain" and then i thought "well i may as well shift the entire project 
over to rust" which logically led to "i should make the neocities api 
integration internal instead of external". my train of thought continued: "i 
might wanna make my own neocities api bindings too". 
 
my train of thought has no brakes. 
 
after a few days of bashing my head on the brick wall that is http, 
[neoercities](https://github.com/ambyshframber/neoercities) was done. shortly 
after, i had drneo in a usable state, and then like 2 days after i moved over to 
an oracle free tier vm instead of neocities. "damn," i thought, "the neocities 
api isn't gonna work here". 
 
what followed was drneo's local mode. an abomination, quite frankly. it worked, 
sure, but it really was not pretty, and implementing rss support would be a 
nightmare. i started working on staticcc, aiming to produce a static site 
generator with rss support and fairly easy configuration. i was close to 
building my own rss library, but opted to use the rust-syndication rss crate, 
which was probably a wise move. 
 
the point that i'm getting at is that yak shaving can be a long winded process, 
but it's also fun. at no point in the process of making either of these tools 
did i stop and think "i'm really not enjoying this". i also learned a surprising 
amount about how http and rss work, as well as how to recognise bad 
documentation and write good documentation (i hope). it also makes the end 
product feel way more personal. i built this entire website (minus the actual 
server but shh) from a bunch of libraries and a language literally named after 
corroded metal. 
 
verdict: yak shaving is pona 
 
*[back 2 blog](/blog)* 
 

