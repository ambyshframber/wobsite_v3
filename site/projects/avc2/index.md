---
title=a virtual cpu
---
##BODY##

# *avc2*

avc2 is my second virtual cpu, as the name would suggest. it is a stack based 16-bit virtual machine, with an emulated memory-mapped io system.

avc2 came about after i discovered Uxn, another virtual stack machine. Uxn is a lovely little system with a few crippling flaws, the main one being the documentation. Uxn has no published specification. the assembler isn't great either. i was gonna make some stuff for uxn, but after realising how hard it would be to make my own better assmbler/toolchain i decided to just go again from the ground up.

the thing about stack machines is they make simple things easier, but complicated things much harder (from a programming standpoint at least). when the stack is coupled to a register (a la x86) you can just move the whole thing, and essentially have multiple stacks for free. this, coupled with hardware interrupts, makes multithreading almost trivial. only having two stacks and no way to move either of them, or get the current stack pointer, makes multithreading pretty much impossible. but then again, avc2 was never meant to be a proper cpu, just an experiment to improve where uxn failed.

[avc2 on github](https://github.com/ambyshframber/avc2)

## adjacent projects

avc2 has a couple other sub-projects that together form something of an ecosystem. the first was [**a2asm**](https://github.com/ambyshframber/a2asm), an fairly well-featured assembler. a2asm has directives, macros, labels and data literals. it's nothing close to gas or any modern compiler, but it's cool and i'm proud of it.

[a2xxd](https://github.com/ambyshframber/a2xxd) is a disassembler and hexdumper for avc2 roms and other adjacent files.

[avdrw](https://github.com/ambyshframber/avdrw) is a block read/write tool for avd archives.

the only other implementation of avc2 i know of was made by [ilo kali](https://ilokali.neocities.org/), and is located [here](https://github.com/jan-pi-sona-lili/avc2.lua).
