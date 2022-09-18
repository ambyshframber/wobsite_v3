Registers
=========

Magpie has 16 visible registers, r0 through r15. One of these (r0) is hardwired to zero: writes have no effect and any reads return 0. r15 is the program counter.

By convention, r14 is the link register (rjal is hardwired to use it, but register jumps may use any register) and r13 is the stack pointer (again, any register may be used for stack operations).

All other visible registers may be used for any purpose.

.. _special_reg:

Special registers
-----------------

Magpie has two additional hidden registers: the interrupt return address (iret) and the status register. iret is covered in detail in the documentation for :any:`interrupts`.

The status register contains the zero, negative, carry, interrupt and fault bits, which influence processor operation. It can be read from or written to with the gf and sf instructions. The zero and negative flags are used when branching.

The remaining 11 bits of the status register are reserved.

Flags in detail
---------------

zero
^^^^

The zero flag is updated most times a value is written to a register. If the value is zero, the flag is set, otherwise it is cleared.

The flag will not be updated if:

- The register is the program counter
- The register is the pointer argument in a stack instruction
- The value arrived in a load delay during a sf instruction
- The previous instruction was a sf instruction

Those last two are surprise tools that will help us later.

negative
^^^^^^^^

The negative flag is updated in the same situations as the zero flag. If the value written, when interpreted as a 2's-complement signed integer, would be negative, the flag is set, otherwise it is cleared.

carry
^^^^^

The carry flag is used in add, adc, sub and sbc instructions. Refer to their documentation for more information.

interrupt
^^^^^^^^^

The interrupt flag determines whether the processor will respond to IRQs (hardware interrupts). It can only be set by getting the flags register, changing the value, and returning it.

fault
^^^^^

The fault bit is currently unused, but in the future will be used to determine if an NMI was created by the int instruction or by an illegal operation.
