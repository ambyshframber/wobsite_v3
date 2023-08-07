---
rss_chan_id=c1
rss_pubdate=Sat, 17 Dec 2022 21:16:21 +0000
title=further thoughts on risc
rss_description=i was wrong about context switching
template=blog
---

##BODY##

# *RISC*

risc **is** so cool. my last blog post touched on that, and also mentioned how berkeley-style register windowing makes context switches slower. having thought about that, i was wrong.

when you context switch, you have to save the current context to memory. on a flat register file, this involves saving the registers to memory, then loading another set, then jumping. on a register windowing system, you have to save the entire used register file, then load another entire register file, then jump. at first glance, that looks slower. but consider: on a flat file, all that saving and loading *has already been done*. it happens as you go up and down the call stack. what this means is that the same amount of loading and storing happens; it just gets concentrated into one place on a windowing system.

it's also not actually the same amount. consider a situation where you're about to nest 3 subroutines deep and then return. on a flat file, all the state is saved and then loaded, regardless of if a context switch happens. on a windowing system, saving and loading only occurrs if a context switch happens. a smart system would implement some way to tell the scheduler "hey maybe don't context switch for the next ~500 cycles cuz im about to nest a bunch of calls".

## running out of space

the one hiccup present in this system is what happens when you reach the end of the register file? obviously you can't nest any deeper, because you've run out of space. it also probably wouldn't be great to statically abort the program. what you *could* do is save the bottom half (or so) of the register file, then keep going, looping back to the bottom of the register file. because (non-supervisor) code doesn't know where it is in the register file, this works perfectly. however, it means you have to add some instructions to save portions of the register file that aren't visible. this would likely break the one-instruction-per-clock Thing that risc usually does, but i think breaking principle in just this one place is a fair compromise for a system that works.

## register-level dirty switch

if you have a system similar to sparc (8 global, 8 in, 8 local, 8 out), and you can find 16 spare bits somewhere (maybe cut one of the locals in half), you can implement a register-level dirty switch. basically, you record which registers get written to after jumping into a subroutine, and when it comes to save to memory you can just not write the ones that haven't been touched. the same can happen when loading: just load the bitmap first and then only load the registers that are used. i have no idea if this would be useful or even result in more performance gain than you'd lose to overhead, but it's a cool idea.
