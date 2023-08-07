---
title=bare metal raspberry pi
rss_chan_id=c1
rss_pubdate=Fri, 25 Nov 2022 23:47:18 +0000
rss_description=gay nerd cant shut the fuck up about forth
template=blog
---
##BODY##

# *bare metal programming*

there is a kind of allure to bare metal. it's mostly pointless. there are plenty of operating systems out there. but running code without any safety guards or predefined structure is actually really fun. the normal hit of "i'm so fucking cool" when your program works is amplified tenfold when you're running it on bare metal.

recently, i've been messing about with bare metal forth on raspberry pi (my last post mentioned this). [kestrel](https://github.com/ambyshframber/kestrel) has involved a lot of reading documentation and a lot of power cycling. my main goal at the moment is peripheral interfacing. the BCM2835 (the soc in the pi) has a whole shitfuck load of peripherals: gpio, emmc, uart, the works. they are laid out (as is typical) as memory mapped io, with memory mapped registers to control certain things. there is [a very nice document](https://www.raspberrypi.org/app/uploads/2012/02/BCM2835-ARM-Peripherals.pdf) from broadcom that details all of them, and that's what i've primarily been working from.

## gpio

the first peripheral i tackled was the gpio. for many people, the gpio is the first pi peripheral they use (barring obvious stuff like usb and hdmi). it's also a bit out of the ordinary: not many computers have gpio.

the pi has 54 gpio pins. a lot of them aren't broken out on the board. each pin can have one of eight functions at a given time: input, output, altfn{0..=5}. the alternate functions are used to connect the pin to some other peripheral. for example, altfn0 for pins 14 and 15 is uart tx and rx respectively, altfn5 for pin 18 is pwm0, etc. also of note is that pin 16 is connected to the onboard ACT led. clearing gpio 16 turns the led on; setting it turns it off.

the memory mapped gpio interface is interesting. there are 6 function registers containing functions for 10 pins each (3 bits per pin, 32 bits per register). there are then separate set/clear registers (two of each), to save on read/modify/write cycles; followed by the level registers (again, two of them). after that, there's a whole bunch of interrupt related stuff that i haven't bothered with yet because i don't have any interrupt handling code at all.

the fact that parts of the interface overflow into multiple registers presents a challenge, and also a clear use case for forth's /MOD.

```
: SETGPIOFN ( pin fn -- )
    SWAP 10 /MOD
    4 * GPIOBASE + SWAP 3 *
    GPIO_FNMASK OVER LSHIFT INVERT
    ROT TUCK @ AND
    2SWAP LSHIFT OR
    SWAP !
;
```

this is the code for setting a gpio pin function. there are 10 pins in a register, meaning that to get the bit position you need (#pin % 10) * 3. to get the register you need #pin / 10, rounded down. /MOD provides both of those. this code /MODs the pin number by 10, then does the relevant adjustments to get the memory address and the position inside the register. it then gets the old value, masks out the old function, ors the new function, and stores it back.

in the interests of transparency, that's not what the code looks like inside kestrel. it actually looks like this:

```
: SETGPIOFN ( pin fn -- )
    SWAP ( fn pin )
    \ 10 pins per fn select reg, 3 bits per pin, 4 bytes per reg
    10 /MOD ( fn ofs/3 reg )
    4 * GPIOBASE + SWAP 3 * ( fn reg_address ofs )
    GPIO_FNMASK OVER LSHIFT INVERT ( fn reg_address ofs ~mask )
    ROT TUCK ( fn ofs reg_address ~mask reg_address )
    @ AND ( fn ofs reg_address masked_val )
    2SWAP ( ra mv fn ofs )
    LSHIFT OR ( reg_addr value )
    SWAP !
;
```

you have to put your head on backwards to write forth.

## time

time is an interesting problem to solve. processors don't usually have an inbuilt timer, and when they do it's something along the lines of the pentium's RDTSC (read timestamp counter), which returns the number of cycles since the processor was turned on. RDTSC is great for benchmarking extremely small sections of code, like individual functions or loops, but it's not great for timing things. particularly as most modern cpus have frequency scaling.

to solve this problem, the raspberry pi has a memory mapped timer. well, it technically has two, but i only use one. the system timer contains a 64 bit free-running 1mhz counter. it also has some interrupt stuff, which again i haven't bothered with because i haven't got any interrupt code. the timer is probably the simplest peripheral to use: you just load a value. the tricky bit comes when you want to do things with the time. initially i wanted to implement some 64 bit arithmetic, but after bashing my head against 64 bit division on a 32 bit machine for hours, i decided to just use the lower 32 bits. this limits the time that kestrel can measure to about 71 minutes, but that's not gonna be an issue for a while. hopefully.

## dma

dma stands for direct memory access. it's a way to do memory transfers without using the cpu, meaning you can run peripheral access in the background. this is obviously useful for things like disk access or ethernet/wifi.

the pi has 16 dma channels. the channels are controlled by things called "control blocks". each control block represents one transfer (source address, destination address, length etc). each block also links to the next block to execute, forming a linked list of individual transfers. you start the dma by writing the address of the first control block to the next control block register in the channel. it then grabs the control block from memory and Does The Thing. when the transfer is done, the channel loads its own next control block register with the next block from the first block. this process then repeats.

```
: DMA0ADDCONBLK ( *conblk -- )
    DMA0FETCHSTOP SWAP
    DMA0_CONBLK_AD DUP @
    BEGIN DUP WHILE 
        NIP >NEXTCONBK + DUP @
    REPEAT
    DROP ! DMA0SETACT
;
```

that's the function to add a control block to the chain. we start with the address of the next control block register, and the value of it (the pointer to the control block). we then check if the value is zero. if it is, we break from the loop, drop the value, store our new value to the field, and restart the dma. if it *isn't*, we drop the field address, add the field offset of the control block's next control block field, duplicate, and fetch. now, the stack contains the address of a next control block field and the value of said field.

the eagle eyed among you may notice that that's the same as the start of the loop. this is why i like forth. it's simultaneously a brilliant general purpose language that can tackle any problem, and the perfect tool for extremely specific problems. forth is the language in which you write your actual control language.

## future roadmap

i'm not done with dma yet, and truth be told it won't be too useful until i have some kind of interrupt system going. i also wanna get emmc working before too long, so i can have a stab at making a file system. i'll probably have to patch forth a little bit to allow reading code from buffers in memory.

i also have a primitive heap allocator on the boil, as it were. i'll probably make a post about that when i get it working.
