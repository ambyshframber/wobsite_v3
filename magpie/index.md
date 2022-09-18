---
title=magpie
template=magpie
---
##EXTRAHEAD##
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0lax{text-align:left;vertical-align:top}
.tg .tg-kd4e{background-color:#34ff34;text-align:left;vertical-align:top;color:black}
.tg .tg-gi7g{background-color:#ff00ff;text-align:left;vertical-align:top;color:black}
.tg .tg-99c3{background-color:#38fff8;text-align:left;vertical-align:top;color:black}
</style>
##BODY##

# magpie

magpie is a 16-bit RISC-like virtual CPU.

## history

many moons ago i had an idea: i was going to build a virtual operating system for a virtual cpu. a few other members of the bucket webring's discord server were on board with the project, so i started work on the cpu. originally, i planned to do something similar to the original 8086, with memory segmentation, variable length instruction encoding, the works. as the project progressed, i realised that the emulator was getting more and more complicated and that the end result would just be x86 but less interesting. at about the same time, i started reading about RISC designs: specifically, SPARC, berkely risc, and RISC-V. i then realised that a RISC-like design would be a) easier to implement and b) much more interesting to code for.

magpie's core emulator took me about 48 hours to design and implement. it's heavily based on RISC-V, except with a 16-bit word size and even less instructions (magpie has no mul, div, and nowhere near as many clever immediate instructions). it also uses condition code branching instead of compare-and-branch instructions.

## development status

at present, magpie's core emulator is in place and (hopefully) functioninc correctly. no functionality exists to load and execute code yet.

there is also no assembler and no specified assembly syntax.

## documentation

### registers

magpie has 16 visible registers. one of these (r0) is hardwired to zero: writes have no effect and any reads return 0. r15 is the program counter.

by convention, r14 is the link register (rjal is hardwired to use it, but register jumps may use any register) and r13 is the stack pointer (again, any register may be used for stack operations).

all other registers may be used for any purpose.

### load/branch delay slots

magpie has intentional load and branch [delay slots](https://en.wikipedia.org/wiki/Delay_slot) because i thought it would be fun.

### instruction formats

magpie has 5 instruction formats:
- mem-reg, which are the direct load-store instructions
- imm-reg, which operate between an 8-bit immediate value and a register
- relative jump, which jump to a signed 13-bit offset relative to the program counter
- register jump, which jumps to an address contained within a register and stores a return address in a specified link register
- reg-reg, which operates between any 2 registers

bit layouts are as follows:

<table class="tg">
<tbody>
  <tr>
    <td class="tg-0lax" rowspan="2">format</td>
    <td class="tg-0lax" colspan="16">bit</td>
  </tr>
  <tr>
    <td class="tg-0lax">15</td>
    <td class="tg-0lax">14</td>
    <td class="tg-0lax">13</td>
    <td class="tg-0lax">12</td>
    <td class="tg-0lax">11</td>
    <td class="tg-0lax">10</td>
    <td class="tg-0lax">9</td>
    <td class="tg-0lax">8</td>
    <td class="tg-0lax">7</td>
    <td class="tg-0lax">6</td>
    <td class="tg-0lax">5</td>
    <td class="tg-0lax">4</td>
    <td class="tg-0lax">3</td>
    <td class="tg-0lax">2</td>
    <td class="tg-0lax">1</td>
    <td class="tg-0lax">0</td>
  </tr>
  <tr>
    <td class="tg-0lax">mem-reg</td>
    <td class="tg-kd4e" colspan="4">ra</td>
    <td class="tg-kd4e" colspan="4">ro</td>
    <td class="tg-kd4e" colspan="4">rd</td>
    <td class="tg-gi7g" colspan="4">opcode</td>
  </tr>
  <tr>
    <td class="tg-0lax">imm-reg</td>
    <td class="tg-99c3" colspan="8">val[7:0]</td>
    <td class="tg-kd4e" colspan="4">rd</td>
    <td class="tg-gi7g" colspan="4">opcode</td>
  </tr>
  <tr>
    <td class="tg-0lax">relative jump</td>
    <td class="tg-99c3" colspan="12">offset[12:1]</td>
    <td class="tg-gi7g" colspan="4">opcode</td>
  </tr>
  <tr>
    <td class="tg-0lax">register jump</td>
    <td class="tg-kd4e" colspan="4">ra</td>
    <td class="tg-kd4e" colspan="4">rl</td>
    <td class="tg-gi7g" colspan="8">opcode</td>
  </tr>
  <tr>
    <td class="tg-0lax">reg-reg</td>
    <td class="tg-kd4e" colspan="4">r1</td>
    <td class="tg-kd4e" colspan="4">r2</td>
    <td class="tg-gi7g" colspan="8">opcode</td>
  </tr>
</tbody>
</table>

### instructions

documentation WIP
