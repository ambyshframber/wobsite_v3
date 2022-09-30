Directives
==========

orangejuice supports a range of directives to make programming easier. These are mostly based on AT&T/as directives such as set and space. All directives are prefixed with ``.`` (ascii dot). The syntax description here uses ``name`` to mean an identifier, ``value`` to mean an identifier or literal, and ``int`` to mean an integer literal.

org
^^^

Syntax: ``.org int``

Assemble the binary such that labelling starts at the given address. This essentially means that the binary "expects" to have its first byte positioned at the given address. This can be used for (for example) writing programs for the boot rom, which starts at 0xf000.

org will fail to assemble unless no byte values are generated before it. This is due to how orangejuice works internally.

space
^^^^^

Syntax: ``.space int``

Leave a gap in the binary of the number of bytes given. space will add an additional byte if the value given is odd. This is to ensure later instructions are 16-bit alligned.

spaceto
^^^^^^^

Syntax: ``.spaceto int``

Leave a gap in the binary up to the address given. This is basically necessary for writing rom programs, which need specific values right up at the top end of memory. For example, ::

    .spaceto 0xfffe
    .data start

puts the address of your "start" label into the processor's reset vector.

spaceto will fail to compile if it would require padding backwards, or if the address given is odd.

data
^^^^

Syntax: ``.data value``

Place the value given, as a 16 bit uint, in the binary.

set
^^^

Syntax: ``.set name value``

Set the value of the given identifier to the given value. This will fail to assemble if the identifier is used as a label anywhere in the code. This will overwrite previous values given to the identifier.
