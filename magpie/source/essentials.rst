Essentials
==========

Magpie:

- is little-endian
- has a 16 bit data bus
- has 16 bit instructions
- uses memory-mapped i/o
- has one delay slot on load (including stack pop) and branch instructions
- uses condition code branching.

When Magpie starts up, it gets the address at 0xfffe and jumps to it (cf. 6502).
