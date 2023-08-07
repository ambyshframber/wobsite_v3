emu
===

emu is a virtual computer built around the Magpie CPU. It contains 32kb of RAM, 4kb of ROM, and a serial port.

Memory map
----------

- 0x0000 - 7fff: RAM
- 0xe000: serial TX
- 0xe002: serial RX
- 0xe100: shutdown
- 0xf000 - ffff: ROM

Usage
-----

The 4kb ROM can be loaded with data before the CPU starts up. This provides an easy way to get programs into the computer without having to write a full program-loader-over-serial.

The serial device holds an internal 16 byte buffer, and will interrupt if either:

- 4 or more are in the buffer
- it has been 16 or more clock cycles since the buffer was last empty.

Bytes are added to the buffer from the emulator's stdin. emu sets the terminal to raw mode, so control characters like ^C and ^D are passed through into the emulator.

Writing a byte to serial TX will send it to the emulator's standard output. Bear in mind that emu sets the terminal to raw mode, so you'll need to write CRLF for a newline, not just LF. Reading 16 bits from e002-e003 will return the next byte in the buffer if one is present, or -1 (ffff) if one is not.

Writing any value to e100 will stop the emulator.
