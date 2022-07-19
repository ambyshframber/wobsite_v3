#include <LiquidCrystal.h>

#define DB0 2
#define DB1 3
#define DB2 4
#define DB3 5
#define DB4 6
#define DB5 7
#define DB6 8
#define DB7 9

#define RS 10
#define RW 11
#define E 12

#define CLEAR 13

#define WIDTH 40

LiquidCrystal lcd(RS, RW, E, DB0, DB1, DB2, DB3, DB4, DB5, DB6, DB7);

char last_line_buf[WIDTH];

byte cursor_horiz; // cursor is always on the bottom line

byte backslash[7] = {
  B00000,
  B10000,
  B01000,
  B00100,
  B00010,
  B00001,
  B00000,
};

void setup() {
  pinMode(CLEAR, INPUT);
  Serial.begin(9600);
  lcd.begin(WIDTH, 2);
  lcd.createChar(1, backslash);
  delay(500);
  lcd.setCursor(0, 1);
}

bool clearing;
void loop() {
  if (digitalRead(CLEAR) && !clearing) {
    //Serial.println("clearing...");
    robust_clear();
    clearing = true;
  }
  else if (!digitalRead(CLEAR) && clearing) {
    clearing = false;
  }
  else if (Serial.available() > 0) {
    int incoming = Serial.read();
    char c = (char)incoming;
    accept_char(c);
  }
}

bool last_was_newline = false;
void accept_char(char c) {
  if (last_was_newline) {
    scroll_down();
  }
  if (c == '\n') {
    last_was_newline = true;
  }
  else {
    last_was_newline = false;
    if (c == '\\') {
      // backslash translation unit
      do_char((char)1);
    }
    else if (c >= 0x20 && c < 0x7f) {
      // ignore nonprinting
      do_char(c);
    }
  }
}
void robust_clear() {
  lcd.clear();
  lcd.setCursor(0, 1);
  cursor_horiz = 0;
  memset(last_line_buf, 0, WIDTH); // zero buffer
}
void do_char(char c) {
  // add to buffers, print
  // check for line end, scroll if so
  if (cursor_horiz == WIDTH) {
    scroll_down();
  }
  lcd.write(c);
  last_line_buf[cursor_horiz] = c;
  cursor_horiz += 1;
}
void scroll_down() {
  lcd.clear(); // clear lcd
  lcd.print(last_line_buf); // print new top line
  memset(last_line_buf, 0, WIDTH); // zero buffer
  lcd.setCursor(0, 1);
  cursor_horiz = 0;
}
