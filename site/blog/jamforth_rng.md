---
title=jamforth RNG
rss_chan_id=c1
rss_pubdate=Sun, 10 Mar 2024 17:30:24 +0000
rss_description=
template=blog
---
##BODY##

# *random numbers*

Generating random numbers is surprisingly hard. The simple fact is, modern computers are deterministic. True randomness is impossible (unless you take entropy from somewhere else but we'll get to that). So, when I wanted to roll dice in my forth, I had an issue.

## attempt 1: RDTSC

RDTSC is an x86 instruction, introduced with the pentium, that gets the number of processor cycles since reset. It used to be great for high-resolution timers, but since the advent of CPU frequency scaling, it's not so good (cf. [bogomips](https://en.wikipedia.org/wiki/BogoMips)). However, it's still (theoretically) a good source of noise if you're not concerned about cryptographic security.

My first implementation of RANDOM just called RDTSC a few times, pulled out some low-order bits, and concatenated them together. Unfortunately, this led to weird patterns, like giving disproportionately low amounts of odd numbers. I concluded that purely relying on RDTSC would be No Good.

## attempt 2: add an LFSR

This goes back all the way to the old days of computing. A [Linear Feedback Shift Register](https://en.wikipedia.org/wiki/Linear-feedback_shift_register) is a simple but powerful PRNG that can be implemented efficiently in hardware or software. I used a 16 bit [xorshift](https://en.wikipedia.org/wiki/Xorshift), initialised using RDTSC and advanced a random number of times (determined by RDTSC) each time it was read. This worked perfectly - which isn't that surprising, seeing as larger xorshifts are some of the best PRNGs out there at the moment.

## attempt 3: /dev/urandom

Unfortunately, all good things must come to an end. When I added a c implementation of the QOI image format (more on that in another post) to the gcc command, RDTSC mysteriously stopped working. The version that Jones defines using Jonesforth's built-in assembler segfaulted, which I assume is because adding a c file changed the stack/heap execution permissions. Even stranger, though, is that when I defined RDTSC in assembly directly it also didn't work. Somehow, running the instruction managed to completely skip the two push instructions following it, and not even segfault or anything.

Regardless, I still wanted random numbers, so I turned to another source: the Linux kernel.

Linux very kindly provides two sources of random numbers: /dev/random and /dev/urandom. I'm still not entirely clear on the differences between them, but I know that urandom is recommended for most things. So I ripped out the RDTSC-xorshift hybrid and replaced it with a 512-byte buffer that gets refilled periodically. Chances are I'll go back and implement a halfway decent PRNG seeded by urandom later, to save eating the entire entropy pool every time I wanna roll shitloads of dice, but that's for future me to sort out.
