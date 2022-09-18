Magpie machine instructions
===========================

Magpie instructions are 16 bits and come in 4 formats::

            bit
    format  15      11      7       3      0
    I       | val[7:0]      | rd    | opcode
    M       | ra    | ro    | rd    | opcode
    J       | offset[12:1]          | opcode
    R       | r1    | r2    | opcode

M, I and J formats have a 4 bit opcode. The R format has an 8 bit opcode.

I format
--------

M format
--------

