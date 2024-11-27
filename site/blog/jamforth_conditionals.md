---
title=jamforth conditionals
rss_chan_id=c1
rss_pubdate=Sun, 03 Mar 2024 22:11:27 +0000
rss_description=
template=blog
---
##BODY##

# *IF ... ELSE ... THEN*

Forth, being a stack language, does conditionals slightly differently. Most languages go something like this:

```
if (condition) {
    // true part
}
else {
    // false part
}
```

But forth goes like this:

```
CONDITION IF
    \ TRUE PART
ELSE
    \ FALSE PART
THEN
```

Note that in forth, `\` is a line comment. Newlines and tabs are not required but are recommended for non-trivial uses of IF.

Required reading: [jonesforth](https://github.com/nornagon/jonesforth/). The eponymous jones explains how IF works better than i ever could, and to be honest you won't understand the next bit unless you know how jonesforth works internally.

Finished reading? Good.

## "an exercise for the reader"

If you were paying attention, you will have noticed that jonesforth's IF only works in compiled code. You will also have noticed that jones left us a challenge: make IF et al work in immediate mode. This is harder than you'd think! Your initial reaction might be "well we can just have IF repeatedly call WORD until it sees THEN or ELSE" but that doesn't work. Consider:

```
0 IF
    S" a string containing THEN will break this approach"
THEN
```

I hope you can see the issue.

The solution I thought of is to compile a temporary word, EXECUTE it, then FORGET it. This requires modifications to IF and THEN, but not ELSE. The main difference is an additional value left on the stack, underneath the address of the 0BRANCH word that gets compiled. This additional value tells THEN whether to compile as normal, or end compilation and execute the word. Conveniently, we can use the xt returned by :NONAME as a flag.

```
: IF IMMEDIATE
	STATE @ IF 		\ compiling
		0 		\ leave flag for THEN
	ELSE 			\ immediate
		:NONAME 	\ start compiling an anonymous word
	THEN
	[COMPILE] IF
;

: THEN IMMEDIATE
	[COMPILE] THEN
	
	?DUP IF 		\ check flag/xt left by IF
		' EXIT , 	\ finish off word
		EXECUTE 	\ execute it
		
		LATEST @ DUP @ LATEST !
		HERE ! 		\ make sure it doesn't leak

		[COMPILE] [
	THEN
;
DROP 	\ because the above definition uses the new version of if, it leaves the flag on the stack
```

(Above code taken near-verbatim from my additions to jonesforth)

This is something of a hack but honestly I like it. It behaves exactly as IF and THEN do in compiled code, with the bonus of not requiring any modifications to ELSE, and the caveat that you can't use it to do conditional compilation.

## Short-form conditionals

These are an invention of my own. Basically, I was using `IF A THEN` and `IF A ELSE B THEN` a lot, and I thought "wouldn't it be nice to have a single word that does this for me?" Behold: `IFTHEN`, `ULTHEN`, and `IFELSE`. These are implemented in assembly, and then re-implemented in forth for the immediate versions. The assembly versions are pretty boring. They basically just conditionally increment `%esi` and then run `NEXT`. 

The forth versions are a little more interesting. First, they check STATE to see if forth is interpreting or compiling. If STATE is 1, they just compile the assembly version. Otherwise, they need to get the next word(s) from the input stream and decide which one to execute.

This kinda thing is why I love forth so much. No other language (that I know of) lets you redefine its inner workings like this. In a future blog post, I'll talk about how I made an assembler for a forth machine in forth, but at the time of writing I'm not actually done with that project yet.
