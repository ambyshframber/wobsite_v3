---
rss_chan_id=c1
rss_pubdate=Sun, 11 Dec 2022 00:05:43 +0000
title=musings on stack and registers
rss_description=the utilities and drawbacks of stack and register computation
template=blog
---

##BODY##

it's gone midnight as i write this, so bear with me.

# *computation*

computation is an interesting subject. at it's lowest level, we have computation figured out. we know what can be computed, we know what can't, we can tell how certain computations will behave as the input size changes, we know what we can and can't know about any given algorithm. we figured out a lot of this three separate times in the 1930s (cf. church, godel and turing). we have also figured out how to make machines that perform computation. we call these "computers". imaginative, i know.

what we still haven't figured out is the next layer up: how humans interact with computation. a lot of people have been talking about this recently. languages like lisp have been taking off again as people realise that actually it's really nice to know what's going on inside the program as it runs. runtime introspection is the new hotness. and to be honest, we've been here before.

## forth

i know i talk a lot about forth, but forth kinda had runtime introspection down to a tee. because of what it is, you can patch functions at runtime from within the language with ease. you don't need an assembler or complicated instruction cache flushes because it's all in data memory. you can build your system to be fluid from the ground up. but the other thing about forth is that it relies on a stack.

stacks are great because you don't need to worry about saving and loading registers when you call a function, because all your data is already on the stack. you don't need to name variables and explicitly pass arguments, because all your data is already on the stack. but the cripling downside of stacks is they are slow. when you interact with a stack, you need to access memory. and memory accesses are very slow. to a modern cpu, even the cache is very far away and much slower than using data in a register. so we have this contradicting scenario of stacks being brilliant for human interface but terrible for performance. (sidenote: back in forth's heyday, computers didn't have registers to spare. you had like, accumulator and some index registers. using a stack had way less of a hit on performance.)

## risc

risc (reduced instruction set computing (or alternatively, risc is so cool)) is the logical conclusion of the "registers are fast" fact. pack a whole shitfuck load of registers into your cpu, and you can minimise accesses by leaving stuff in registers, hence making your code faster. that's the main application of risc to the current topic. designs like stanford mips, arm and risc-v take the approach of just jamming as many registers into your cpu as is feasible. mips and risc-v have 32 registers, arm has 16. instructions (usually) have two inputs and one output register, and sometimes a constant. arm plays a bit fast and loose with this, but that's a story for another time.

the OTHER approach to risc is much more interesting, but perhaps less practical. the original berkeley risc and later sparc have this really weird register windowing concept. basically, there's a whole shitload of registers in the cpu. like, upwards of 600 in some cases. only 32 are visible at any given time. r0 through r7 are the global registers. i'm not sure what these are actually used for, but it's probably something important. r8 through r15 are the out registers. these are set by the calling routine R and handed over to the current subroutine S. r16 through r23 are the true locals. nothing other than the current subroutine will see these. r24 through r31 are the in registers. these are set by the current subroutine S and handed over to the called subroutine T.

it's hard to see at first, but this forms a kind of sliding window into a really big register file. it also means you never need to go to main memory so long as you're using less than 8 registers per subroutine. HOWEVER. it limits your call depth to the size of your cpu's register file. AND it makes it really slow to do context switches because everything's in the cpu. on a regular flat register file, all the saved data is already in memory, on the stack. this means you can just save the current contents of the registers and then switch. with a big register file like sparc, you have to save and load shitloads of stuff for every context switch.

## where this goes

in my mind, the ideal system is some kinda hybrid system, with a sliding window into a big register file but without the hassle of slow context switching. i'm not sure how this would be achieved while still holding true to the "one job per instruction, one instruction per clock" philosophy of risc. maybe it would only work in a virtual machine context. maybe this idea will become the next forth. maybe i'm just tired and i should go to bed.

this has been a very rambly and possibly incoherent blog post. i had ideas in my head and now they're numbers and i hope you enjoyed reading it
