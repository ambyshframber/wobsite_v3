.. magpie documentation master file, created by
   sphinx-quickstart on Sun Sep 18 17:57:17 2022.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Magpie, a 16-bit RISC-like virtual cpu
======================================

What is Magpie?
---------------

Magpie is my 4th virtual CPU. The first two were avc and avc2, neither of which fared too well. avc2 got further, but I ran out of energy for building an infrastructure soon after making a boot-from-drive system. My third was bcpu, which is much more relevant to Magpie.

A while back, me and some mates in the bucket webring discord server decided to make a toy OS. I then decided I was gonna make a CPU for it to run on. bcpu was heavily based on x86. In retrospect, this wasn't the smartest choice, because x86 actually isn't that interesting. You get some GPRs and some overbuilt instructions. Decoding is complicated, register-register operations are complicated, it's all a bit naff really. I had almost finished the core emulator when I happened upon the wikipedia article on SPARC. This led me down a rabbit hole of RISC architectures, including ARM, MIPS, the original Berkeley RISC, and RISC-V, which is where Magpie began.

Magpie is heavily based on RISC-V and SPARC. It has 16-bit instructions, condition code branching, branch and load delay slots, and a flat register file.

The Magpie emulator is available on github here_.

.. _here: https://github.com/ambyshframber/magpie


.. toctree::
   :maxdepth: 2
   :caption: Contents:

   essentials
   registers
   instructions
   interrupts


Project status
--------------

Currently, the Magpie core emulator is finished. The surrounding "virtual computer" (memory, serial i/o, etc) is still unfinished, and there's no assembler.
