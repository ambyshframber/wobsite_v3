---
rss_chan_id=c1
rss_pubdate=Sat, 14 May 2022 17:50:00 +0100
title=AVC2 devlog 1
rss_description=in which i embark on a quest to make another VCPU
---

##BODY##

# *AVC2*

a while back, i made [AVC](https://github.com/ambyshframber/avc), a simple virtual cpu. it was fun, but it never went anywhere and i could never get the assembler to work right. more recently, i stumbled across [Uxn](https://wiki.xxiivv.com/site/uxn.html), a stack-based minimal VCPU with "only 32 instructions" (in reality it uses all 256 byte values and has no NOP). i had a quick play with it, and decided to make my own assembler with better macro support than the provided one (the provided assembler did macros with essentially a find-replace and didn't support macro arguments). this is where the issues started.

Uxn is woefully underdocumented. rom files are loaded into memory with byte zero of the rom positioned at byte 0x0100 of memory. this is mentioned nowhere. adding a relative label to your code actually takes the label destination, subtracts the label invocation point, then subtracts an additional 2. this makes sense, but is mentioned nowhere. STH moves a value from the working stack to the return stack. this is mentioned. the fact that STHr moves a value back is not.

i have decided to begin work on my second VCPU, with a rigourus specification from day 1. my aim is to produce a functioning emulator and assembler, with full documentation for both. the standard [opcode table](opcode_table.txt) is *almost* frozen, and even if it does turn out ive missed something, i've given myself an `EXT` opcode to test if extensions are available. the general structure is similar to Uxn: 5 bits for the op, 3 bits for modes. i have, however, managed to cut 4 entire instructions (`INC`, `NIP`, `LTH` and `NEQ`) and the `k` modes for the stack primitives. i also moved device i/o to a memory-mapped model, like real cpus. the stacks are in memory too, and there's `PIC` and `PUT` opcodes for accessing bytes further down the stack. the arithmetic functions use a carry bit in the status register, meaning calculations larger than 16 bits can be made.

hopefully, i'll be able to make this work without too much hassle.

*[back 2 blog](/blog)*
