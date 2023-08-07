---
title=low level dev, part one
rss_chan_id=c1
rss_pubdate=Sat, 18 Feb 2023 15:01:44 +0000
rss_description=CPU basics
template=blog
---
##BODY##

# *low level dev*

this is the first of (hopefully) many posts in which i will talk about low level development, CPU functionality, memory accessing and mapping, etc. i mentioned writing a "CPU essentials" guide in a discord server and a few people said "yeah please do that" so here we are with part one.

required reading: [little man computer](https://en.wikipedia.org/wiki/Little_man_computer).

if you've properly grokked little man computer, we can continue. if not, read it again until you get it. maybe look up some other little man computer resources while you're at it.

## fact one: real computers are basically the same thing

it's true! real computers store instructions and data in the same memory. the CPU fetches an instruction, decodes it, executes it and then continues to the next instruction. real computers use binary though, not decimal. 

## fact two: real computers are still slightly different

so yknow how the little man computer has a dedicated inbox and outbox? that's generally not how real computers do it. instead, they have memory mapped I/O.

instead of the entire memory being memory, some of it is other stuff that just looks like memory. the CPU accesses it as it would memory (using load and store instructions) but the data is then handed off to some other device. this is a very clever way to do it because you don't have to implement dedicated I/O hardware and instructions on the CPU.

the way it works is slightly more complicated. physical CPUs communicate with their memory (and other peripherals) by the address bus and the data bus. the address bus holds the current address that the CPU wants to load from or store to, and the data bus holds the value that it's loading or storing. there's also a read/write line to show whether the CPU is loading or storing.

let's imagine a hypothetical CPU. it has a 16 bit address bus, meaning it can address a maximum of 2^16 = 65536 bytes of memory. it has an 8 bit data bus, meaning it can load/store one byte at a time. if the CPU wants to load the value in memory address 0x1234, it puts that value (in binary) on the 16 pins of the address bus, and the memory will get the byte at that address and put it on the 8 bits of the data bus.

the next bit is where it gets slightly more complicated. we want the CPU to be able to talk to more things than just the memory, but we don't want to add dedicated I/O instructions. what we want is for certain address ranges to correspond to certain devices. enter: chip select and logic gates.

## chip select

each peripheral device (including memory) has a chip select line. this goes alongside the data/address buses and the R/W line, and tells the device if it should do stuff or not. this is done using what's called tri-state logic. each output line of the device can either be high, low, or high-impedence (which basically means it acts like it's not connected). when the device is not selected, it ignores all inputs and sets its outputs to high-impedence. when it *is* selected, it works as normal. some chip selects are active-high (device is selected when the pin is driven to a high logic level) but most are active-low (devices is selected when the pin is pulled low).

by attaching devices' chip select lines to the address bus via some logic gates, we can make them only activate when the CPU is accessing certain regions of memory.

let's say we have a memory chip with 15 address input lines, meaning you can select one of 2^15 = 32768 addresses, and an active-low chip select. we want this chip to only activate when the CPU is accessing the lower half of memory. what we do is we connect the chip select line of the memory chip to the highest address line. remember that addresses are put on the bus in binary. any 16-bit number bigger than 2^15 will have a 1 in bit 15 (remember that the least-significant bit is bit 0), so when the CPU is accessing an address less than 2^15, the highest address line is low (and vice versa). this means the memory chip activates only when the CPU is accessing an address below 2^15.

if we want finer grained mapping, we throw logic gates into the mix. let's say we have a 16kb ROM chip that we want to only activate when the CPU is accesing the top 16kb of memory (1kb = 1024 bytes). the top 16kb corresponds to any address greater than or equal to 49152. any 16 bit integer >= that value has a 1 in bits 15 *and* 14, so we can attach an AND gate to the top two address lines to have a signal that goes high when the CPU is accessing the top 16k of the address space. but what if our ROM chip has an active-low address line? simple: use a NAND gate to have a signal that goes *low* when the CPU is accessing the top 16k of the address space.

## fact three: you'll probably never need to know how this works when writing "real" code

back in the 70s and 80s, when people were building homemade 6502 and Z80 computers, this was very important knowledge. nowadays, not so much. you'll only need to know this if you're designing a system-on-chip or building a 6502 hobby computer.

but hey, it's cool to know, right?
