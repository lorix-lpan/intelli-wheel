# Potential Wheel
A browser controlled robot with funky locomotion built for Robohacks 2016.

## What is Potential Wheel?
The potential wheel is a robot showcasing a brand-new way of displacement. It consists of a single wheel that uses inertia to propel itself. The center is mobile to the outside components, which itself is in contact with the ground. When the center starts spinning, it uses its own mass to propel the outside in the opposite circular direction. However, the robot can then move in a limited way. Fortunately, there is an additional mechanism in this robot which can lock the outside with the inside. Before the blockage, the robot accumulates potential energy in the form of internal rotation. When the blockage happens, this energy is released in the form of forward propulsion. It is important to point out that the power liberated is much greater than the power of the two DC motors combined. The robot is controlled through Wi-Fi and the instructions are sent from a web browser, then relayed through a Raspberry Pi running a http server via web sockets. Then, the Raspberry Pi transmits this information to the Arduino which translates the instructions into actions performed by the motors.

## Technology used
* Arduino
* Raspberry Pi
* NodeJS
* socket.io
* ReactJS

### Built By
Matthew Scott, Bilun Sun, Jaeeun Lee, Yixuan Wang, Xichen Zhou and Lawrence Pan
