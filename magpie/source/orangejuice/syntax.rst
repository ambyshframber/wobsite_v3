Syntax
======

orangejuice's syntax is based on AT&T syntax. Source operands preceed destination operands. However, because Magpie is RISC, there's no need for loads of glyphs and punctuation.

Instructions
------------

All I format instructions are written the same::

    name value rd

``value`` is either an integer literal or identifier. There is also an additional fake instruction: ldi, load immediate. ldi desugars into a ldl and a ldh upon being parsed, making it simpler to write a 16-bit load.

M format instructions are written::

    name ra ro rd

J format instructions are written::

    name destination

``destination`` can be a literal or an identifier. orangejuice will automatically work out the excess-K offset for you.

Almost all R format instructions are written the same::

    name rs rd

The exceptions are int (just written as ``int``); gf, gr, not (written ``name rd``); and sf (written ``sf rs``).


Registers
---------

Registers 0-15 are available as r0 through to r15. There are also some aliases:

- pc for r15
- link for r14
- sp for r13
- 0 for r0


Identifiers and labels
----------------------

Labels are defined in the usual way: the name and then a colon at the start of a line. Arbitrary values can be defined with the .set directive.

Values can be referred to with either just the name, or the name followed by ``/l`` for the lower 8 bits, or the name followed by ``/h`` for the upper 8 bits.