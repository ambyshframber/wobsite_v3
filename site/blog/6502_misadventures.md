---
title=6502 misadventures, part 1
rss_chan_id=c1
rss_pubdate=Mon, 30 Oct 2023 23:28:48 +0000
rss_description=party like it's 1975
template=blog
---

##BODY##

# *6502*

probably should have written about this months ago, but oh well. better late than never. i guess this is also technically a part two to my last blog post?

for the last few months i've been on-and-off building a 6502 computer. it's provisionally called wren, but i'll probably come up with a better name once i'm actually writing software for it

it has 32k of ram, 32k of rom (technically 128k but the cpu can only see 32k of it) and a 6522 VIA. the idea is to do everything else over SPI and maybe add another via if necessary. address decoding is done with a 74HC00, a 74HC30 and a 74HC5138. it also contains several resistors and capacitors, two oscillators, lots of debugging LEDs and at least 25 feet of wire.

why did i build a 6502 computer in the year of our lord 2023? simple: for fun. it's a neat thing to show off, and i guess it does come with some transferrable skill.

## the inevitable yak shaving

before even thinking about running code on the 6502 i had to figure out a way of programming my chosen flash chip (39sf010). most homebrew 6502 guides tell you to use a 28c256 EEPROM, but when i was buying parts they were like £10 each so i thought "fuck that" and got more rom for less money, in the form of the flash chips. however, flash is not byte programmable like eeprom: you have to erase and program 4kb at a time. so i had to build my own programmer for it. after much headscratching and lots of fucking about with adafruit's shitty code, i had a prototype on a breadboard that succesfully programmed and read back the flash chips.

and then i took it to bits and redesigned it to use shift registers, and then i soldered it to some stripboard i had lying around. fun fact: i2c is so shitty that a 1mhz atmega88 and some shift registers, at a lower serial baud rate, is FASTER than a 16mhz arduino using the io expander. and it used less than half the flash and ram.

## what next?

the computer resets and runs properly, but at the moment it has no way to talk to the outside world. my next move is to get spi working (using the VIA's shift register) and then rig up a max3100 spi uart so it can talk to the host machine (my laptop). after that, i'll probably port wozmon or something, then write my own monitor, then eventually write a forth or a basic or something. it'll be a while before i have anything remotely usable, but watch this space.
