---
title=forth!
rss_chan_id=c1
rss_pubdate=Mon, 21 Nov 2022 20:16:12 +0000
rss_description=raspberry pis are cool
template=blog
---

##BODY##

# *forth!*

forth is one of Those languages. like lisp, it has this air of timelessness and elegance around it. unlike lisp, it's extremely low level and gives direct access to memory and machine code. this means you can do some pretty cool stuff with it.

forth is also Tiny. a fully usable forth system can fit in rom on an 8 bit microcomputer. back in the 60s and 70s, memory was extremely expensive, so cutting down on size and making the most of a small memory space was useful.

forth is also weird. charles h. moore, its inventor, calls it a "problem oriented language". i often say that you need to put your head on backwards to program in forth. not just because you need to manage the stack by hand, but because forth has a completely unique paradigm.

## jonesforth

my first experience with forth was reading through the excellent [jonesforth](https://github.com/nornagon/jonesforth/). it explains how the dictionary works, how all the input/output routines work, and just generally why forth is Like That. i can't explain forth in this blog post, so go read jonesforth if you're interested.

i had a bit of a play with jonesforth, but it's somewhat impractical to actually use in a modern environment. particularly as i'm used to rust, and the safety that gives. i ended up leaving jonesforth behind and moving on to other projects.

## pijFORTHos

my second experience with forth was [pijFORTHos](https://github.com/organix/pijFORTHos), a bare metal forth for raspberry pi. this is much more exciting, because now i have a not-quite bare metal environment that i can work with on a raspberry pi. this is arguably what forth is for: low-footprint bare metal environments. of course, even the raspberry pi model B i'm using is orders of magnitude more capable than what moore had in the 70s, but still. it's the thought that counts.

perhaps overly ambitiously, i have set out to build a bigger system on top of pijFORTHos, provisionally named [kestrel](https://github.com/ambyshframber/kestrel). part of the fun of this is unpicking the BCM2835's peripherals and building my own drivers. so far i only have gpio read/write, and i'm working on 64 bit timer access. i have no idea where this road leads, but at the very least it's fun to play around with. hopefully it'll be self hosting one day, but that's a while off if it ever does happen.
