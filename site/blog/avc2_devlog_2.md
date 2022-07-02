---
rss_chan_id=c1
rss_pubdate=Fri, 20 May 2022 22:30:40 +0100
title=AVC2 devlog 2
rss_description=i made hello world in a hex editor
template=blog
---

##BODY##

# *AVC2, part 2*

the formal specification and emulator are done! i tested the emulator with a [hello world program written in a hex editor](https://github.com/ambyshframber/avc2/blob/master/examples/hello_world.avcr), which only proved how bad i am at programming. i completely forgot to implement a few things, and a few others were just Fucked&trade;. but i fixed them and now it works

now comes the hard part: the assembler. i've made a few assemblers in my time, one for the original AVC and another half-finished one for Uxn. both of those were half-baked and had most of the language features bolted on after the fact, which obviously isnt great. with `a2asm` i'm doing it properly from the start, so i can build a basic framework to start out and then add other things in where they should be. the full language spec is gonna be a nightmare to bootstrap but hey that's the fun part

anyway. the assembler works by first tokenising the asm code, then parsing it into words. a word is either a byte (both instructions and raw byte data), a label, a label invocation, or a pad directive. it then runs over the list of words a few times, first to get all the label positions, and a second time to actually turn it into a rom. i could theoretically get the label positions during the parsing, but that would potentially make it harder to implment stuff later.

this ends up being a 3-pass assembler, which is more than usual. after it's done, though, i should be able to extend the ISA and device spec as much as i like and only make occasional changes to the assembler. one idea i'd particularly like to try is a drive device that uses a headerless raw data file as the drive, and you have to build a file system from scratch. possibly also a "boot from drive" system. i also wanna make a higher-level language that compiles to AVC2 bytecode, but i don't know how feasible that is at my current skill level
