/*
 * DRV8833_Test_2
 * Two-motor test for the DRV8833 library.
 * The DRV8833 is a dual motor driver carrier made by Pololu.
 * You can find it here: https://www.pololu.com/product/2130
 *
 * Attach the positive wire of a motor to the Aout1 and the negative
 * wire to the Aout2 pins on the DRV8833.
 * Attach the positive wire of a motor to the Bout1 and the negative
 * wire to the Bout2 pins on the DRV8833.
 * Attach the Arduino's ground to the one of the GND pins on the DRV8833.
 * Attach a 9V battery's positive connection to the Vin pin
 * on the DRV8833, and the negative connection to one of the GND pins.
 * 
 * Created March 31, 2015, by Aleksandr J. Spackman.
 */

#include <DRV8833.h>
#include <Servo.h> 

// Create an instance of the DRV8833:
DRV8833 driver = DRV8833();
Servo myservo; 
Servo yourservo;


int motors = 7;
int servoIn = 6;
int servoPin = 5;
int servoPinB = 3;
int directionChange = 4;

int R = A3;
int G = A2;
int B = A1;
boolean ledOn = false;


// Pin numbers. Replace with your own!
// Attach the Arduino's pin numbers below to the
// Ain1, Ain2, Bin1, and Bin2 DRV8833 pins.
const int inputA1 = 11, inputA2 = 10, inputB1 = 8, inputB2 = 9;

void setup() {
  //RGB LED
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(A0, OUTPUT);
  digitalWrite(A0, LOW);
  randomSeed(analogRead(0));
  
  // put your setup code here, to run once:
  pinMode(motors, INPUT);
  pinMode(servoIn, INPUT);
  
  myservo.attach(servoPin);
  yourservo.attach(servoPinB);
  
  // Start the serial port:
  Serial.begin(9600);
  
  // Attach the motors to the input pins:
  driver.attachMotorA(inputA1, inputA2);
  driver.attachMotorB(inputB1, inputB2);
  Serial.println("Ready!");

}

void loop() {
  // put your main code here, to run repeatedly:  
  if (digitalRead(motors) == HIGH && digitalRead(directionChange) == 0) {
  Serial.println("Forward LOOL");
  driver.motorAForward();
  driver.motorBForward();
  } 

  else if (digitalRead(motors) == HIGH && digitalRead(directionChange) == 1){
  Serial.println("Reverse WTTTFFFF");
  // Stop:
  driver.motorAReverse();
  driver.motorBReverse();
  }

  else if (digitalRead(motors) == LOW) {
  Serial.println("Stop:");
  driver.motorAStop();
  driver.motorBStop();
  }

  if (digitalRead(servoIn) == LOW){
    myservo.write(45);
    yourservo.write(45);
  } else {
    myservo.write(0);
    yourservo.write(0);
  }
  //------------------------------------

  if (digitalRead(ledPin) == HIGH && ledOn == false){
    int red = random(255);
    int green = random(255);
    int blue = random(255);
    analogWrite(R, red);
    analogWrite(G, green);
    analogWrite(B, blue);
    ledOn = true;
  } 
  if (digitalRead(ledPin) == LOW && ledOn == true){
    analogWrite(R, 0);
    analogWrite(G, 0);
    analogWrite(B, 0);
    ledOn = false;
  } 
}
