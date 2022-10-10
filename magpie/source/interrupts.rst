Interrupts
==========

Magpie has two types of interrupt: IRQ and NMI. IRQ stands for Interrupt ReQuest, and is used for hardware interrupts. NMI stands for Non-Maskable Interrupt, and is used for internal interrupts. In general, when an interrupt occurs, the CPU will jump to an Interrupt Service Routine (ISR) and store a return address in the special register iret (see :any:`special registers <special_reg>`). This return address can be retrieved with the gr instruction. The locations of the two ISRs are stored at the top of the flat address space.

IRQs
----

IRQs will only occur if the interrupt bit is set. When an IRQ occurs, the CPU will get the address at 0xfffa and jump to it. It will store the return address in iret. It will also clear the interrupt bit, meaning no interrupts will happen until the ISR sets the bit high again.

NMIs
----

NMIs are triggered by the int instruction and, in the future, will be caused by "hardware" faults such as illegal operations. At present, the precise semantics of what counts as "illegal" are muddy at best. NMIs operate much the same as IRQs, except they will occur regardless of the interrupt being set or clear (hence "non-maskable"), and they use the address at 0xfffc.

Writing an ISR
--------------

The first thing your ISR needs to do is clear some space. Magpie has no hardwired stack pointer register, so you should designate a register to hold the stack pointer when designing your system (I recommend r13). This way you'll always know where your stack is. Upon entering the ISR, push an unnecessary register to the stack, then use gf to preserve the status register. This is so the interrupted routine doesn't observe a possibly catastrophic flag change. Make sure to reenable interrupts before you put the flags back. You'll also need to push the return address to the stack with psr.

::
    
    isr:
        psr r13
        push r13 r12
        gf r12

Once you've stored the flags register, go ahead and do your actual ISR. The next tricky part is returning.

You need to land back in the interrupted code without any change in processor state. This means:

- Putting the flags back how they were
- Putting the registers back how they were
- Jumping to the return address

Let's take an example state where we have the flags in r12 and the stack pointer in r13. The value that was in r12 is on the stack, on top of the return address.

First, put the flags back. Then, pop the old value of r12 from the stack. sf will prevent the flags from being updated during the load. Finally, use iret to pop the return address from the stack and jump to it. iret will enable interrupts if you haven't already.

::

        sf r12
        pop r13 r12
        iret r13

sf also prevents another interrupt from happening during this process, which could potentially clobber the flags and cause untold chaos down the line. It's advisable to enable interrupts again early in the ISR, such that you don't lock up the entire system while servicing the original interrupt. If you do this, make sure you turn off whatever is causing the interrupt before you enable interrupts.
