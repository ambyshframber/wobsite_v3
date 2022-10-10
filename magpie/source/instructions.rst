Instructions
============

Magpie instructions are 16 bits and come in 4 formats::

            bit
    format  15      11      7       3      0
    I       | val[7:0]      | rd    | opcode
    M       | ra    | ro    | rd    | opcode
    J       | offset[12:1]          | opcode
    R       | rs    | rd    | opcode

M, I and J formats have a 4 bit opcode. The R format has an 8 bit opcode.

All instructions are documented below, grouped by format. Instruction names will be given in full where appropriate.

Refer to the `opcode table`_ for the byte values of opcodes.

.. _opcode table: https://docs.google.com/spreadsheets/d/e/2PACX-1vRKMKaw6kuIRY-BMueZwszHq2VRLC3c-7IzmFyby_uexP8XFDTCdrUfpKxU9VpqPNx9IIZcN6OnY__A/pubhtml?gid=1509653137&single=true

I format
--------

I format instructions operate between an immediate value and a register.

ldl - load low
^^^^^^^^^^^^^^

Loads an 8 bit value into rd, sign-extending it to 16 bits as it does so. The immediate load instruction is split into two for a few reasons:

- loading from memory takes 2 cycles anyway
- about 80% of constants are 0, 1 or 2. 

This means most constants can be loaded in one cycle, without impacting the fixed instruction length of a RISC processor. ldl and ldh do not have a delay slot.

ldh - load high
^^^^^^^^^^^^^^^

Loads an 8 bit value into the top half of rd.

adi - add immediate
^^^^^^^^^^^^^^^^^^^

Adds an 8-bit unsigned value to rd. The carry flag is set if the calculation would overflow a 16 bit unsigned integer, otherwise it is cleared.

sbi - subtract immediate
^^^^^^^^^^^^^^^^^^^^^^^^

Subtracts an 8-bit unsigned value to rd. The carry flag is cleared if the calculation would underflow a 16 bit unsigned integer, otherwise it is set.

M format
--------

M format instructions operate between registers and memory.

ld - load
^^^^^^^^^

Load a 16 bit value from memory, using an address from ra and an offset from ro, into rd.

st - store
^^^^^^^^^^

Store the value in rd to memory, using an address from ra and an offset from ro.

ldb - load byte
^^^^^^^^^^^^^^^

Load an 8 bit value from memory, using an address from ra and an offset from ro, into rd.

stb - store byte
^^^^^^^^^^^^^^^^

Store the value in the bottom 8 bits of rd to memory, using an address from ra and an offset from ro.


J format
--------

J format instructions are 13-bit relative jumps.

rjmp - relative jump
^^^^^^^^^^^^^^^^^^^^

Jump to an addres calculated thusly:

- shift the 12-bit literal one bit left
- zero extend it to 16 bits
- subtract 4096 (2**12)
- add it to the program counter.

Relative jumps can move 4096 instructions in either direction.

rjal - relative jump and link
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As above, but store the return address in r14.

rjz - relative jump zero
^^^^^^^^^^^^^^^^^^^^^^^^

rjmp iff the zero flag is set.

rjn - relative jump negative
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

rjmp iff the negative flag is set.

R format
--------

R format instructions operate between two registers.

add
^^^

Adds the value in rs to rd, storing in rd. The carry flag is set if the calculation would overflow a 16 bit unsigned integer, otherwise it is cleared.

adc - add with carry
^^^^^^^^^^^^^^^^^^^^

Adds the value in rs to rd, then adds the carry flag, storing in rd. The carry flag is set if the calculation would overflow a 16 bit unsigned integer, otherwise it is cleared.

sub
^^^

Subtracts the value in rs from rd, storing in rd. The carry flag is cleared if the calculation would underflow a 16 bit unsigned integer, otherwise it is set.

sbc - subtract with carry
^^^^^^^^^^^^^^^^^^^^^^^^^

Subtracts the value in rs from rd, then subtracts the inverse of the carry flag, storing in rd. The carry flag is cleared if the calculation would underflow a 16 bit unsigned integer, otherwise it is set.

and
^^^

Performs a bitwise and between rs and rd, storing in rd.

not
^^^

Stores the complement of rd in rd. rs is unused.

or
^^

Performs a bitwise or between rs and rd, storing in rd.

xor
^^^

Performs a bitwise xor between rs and rd, storing in rd.

lsl - logical shift left
^^^^^^^^^^^^^^^^^^^^^^^^

Shifts rd left rs bits, then stores in rd.

lsr - logical shift right
^^^^^^^^^^^^^^^^^^^^^^^^^

Shifts rd right rs bits, then stores in rd.

asl - arithmetic shift left
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Shifts rd left rs bits, then stores in rd. The sign bit (bit 15) is not shifted.

asr - arithmetic shift right
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Shifts rd right rs bits, then stores in rd. Bits shifted in from the left are clones of the sign bit, instead of zero.

rol - rotate left
^^^^^^^^^^^^^^^^^

Shifts rd left rs bits, then stores in rd. Bits shifted out are shifted back in from the other end.

rol - rotate right
^^^^^^^^^^^^^^^^^^

Shifts rd right rs bits, then stores in rd. Bits shifted out are shifted back in from the other end.

gf - get flags
^^^^^^^^^^^^^^

Copies the status register into rd. rs is unused.

sf - set flags
^^^^^^^^^^^^^^

Copies rs into the status register. rd is unchanged. The zero and negative flags will not be changed during this instruction or during the two immediately after. All interrupts will be temporarily ignored during this period.

int - interrupt
^^^^^^^^^^^^^^^

Intentionally triggers an NMI (see :any:`interrupts`). rs is unused, rd is unchanged (unless the ISR uses/changes them).

gr - get return
^^^^^^^^^^^^^^^

Copies the value in iret into rd. rs is unused.

push
^^^^

Stores the value in rd to the address in rs, then decrements rs by 2. The decrement does not alter the zero and negative flags.

pop
^^^

Increments rs by 2, then loads the value at the address in rs into rd. The increment does not alter the zero and negative flags. This intruction has a load delay slot.

mov
^^^

Copies the value in rs into rd.

movsx - move with sign extension
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sign extends the bottom 8 bits of rs and stores the resulting value into rd.

jmp
^^^

Jumps to the address in rs and stores the return address in rd.

jz - jump zero
^^^^^^^^^^^^^^

jmp iff the zero flag is set.

jnz - jump not zero
^^^^^^^^^^^^^^^^^^^

jmp iff the zero flag is clear.

jn - jump negative
^^^^^^^^^^^^^^^^^^

jmp iff the negative flag is set.
