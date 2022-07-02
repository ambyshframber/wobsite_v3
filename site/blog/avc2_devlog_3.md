---
rss_chan_id=c1
rss_pubdate=Fri, 10 Jun 2022 21:49:02 +0100
title=AVC2 devlog 3
rss_description=a functioning dev stack, for once
template=blog
---

##BODY##

# *AVC2 dev stack is basically complete*

the main components of the dev stack are finished. nothing is self hosted yet, but that's a future project. currently there exists:
- the emulator
- the assembler
- a utility program for the virtual drive

did i mention i made a virtual drive?

one of the things that annoyed me about uxn is the fact that the file device just used the host system's fs. like cmon. that's cheating (and also carries the risk of not being portable). instead, AVC2 has a 16mb block-based drive emulation. if you want a filesystem, build one yourself (this is a roadmap goal). i have also made a bootstrap system to load block 0 of the drive and continue executing like it was loaded as a rom. it involves some very hacky stuff.

the next things to tackle are assembler macros and a possible forth implementation. assembler macros will make future big projects easier, and forth? forth is just cool.
