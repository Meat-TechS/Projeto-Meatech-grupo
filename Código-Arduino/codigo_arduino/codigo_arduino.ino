#include <Ultrasonic.h>

int pinoTrigger = 12;
int pinoEcho = 13;
HC_SR04 sensor(pinoTrigger, pinoEcho);
const int PINO_SENSOR_TEMPERATURA = A0;
float temperaturaCelsius;

void setup() {
 Serial.begin(9600);
}

void loop() {
  float distancia = sensor.distance();
  int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA);
  temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01;



  if (distancia > 0) {
    Serial.print(1);
  } else {
    Serial.print(0);
  }
  Serial.print(";");
  Serial.println(temperaturaCelsius);

  delay(1000);
}
