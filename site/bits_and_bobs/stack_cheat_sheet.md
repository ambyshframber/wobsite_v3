---
title=stack cheat sheet
---
##BODY##

# *stack cheat sheet*

for languages like forth, uxn etc.

- ROT is back element to front
- -ROT is front element to back

- DROP ( a -- )
- DUP ( a -- a a )
- SWAP ( a b -- b a )
- OVER ( a b -- a b a )
- ROT ( a b c -- b c a )
- -ROT ( a b c -- c a b )
- SWAP DROP ( a b -- b ), aka NIP
- SWAP OVER or DUP -ROT ( a b -- b a b ), aka TUCK
- ROT TUCK ( a b c -- b a c a )
