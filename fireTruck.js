function FireTruck(context, x, y) {
    this.context = context;
    this.xStart = x;
    this.yStart = y;
    this.dx = 0;
    this.dy = 0;
    this.movingLeft = true;
    this.changeInWheelRotateAngle = Math.PI / 28;
    this.wheelRotationAngle = 0;
    this.speed = 2.0;
}

FireTruck.prototype.draw = function () {
    this.update();
    this.drawBody();
    this.context.restore();
}

FireTruck.prototype.drawBody = function () {

    // Draw the body.
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(35, 0);
    this.context.lineTo(35, 17);
    this.context.lineTo(85, 17);
    this.context.lineTo(100, 54);
    this.context.lineTo(80, 54);
    this.context.arc(69, 54, 11, 0, Math.PI, true);
    this.context.lineTo(26, 54);
    this.context.arc(15, 54, 11, 0, Math.PI, true);
    this.context.lineTo(-10, 54);
    this.context.lineTo(-10, 24);
    this.context.lineTo(0, 0);
    this.context.stroke();
    this.context.fillStyle = '#fc2033';
    this.context.fill();
    this.context.closePath();

    // Draw the window.
    this.context.beginPath();
    this.context.moveTo(-4, 24);
    this.context.lineTo(17, 24);
    this.context.lineTo(17, 4);
    this.context.lineTo(4, 4);
    this.context.lineTo(-4, 24);
    this.context.stroke();
    this.context.fillStyle = '#99ccff';
    this.context.fill();
    this.context.closePath();

    // Draw the light.
    this.context.beginPath();
    this.context.fillStyle = 'gray';
    this.context.fillRect(53, 14, 10, 2);
    this.context.arc(58, 14, 5, 0, Math.PI, true);
    this.context.stroke();
    this.context.fillStyle = 'yellow';
    this.context.fill();
    this.context.closePath();

    // Draw the ladder.
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.fillRect(35, 20, 46, 2);
    this.context.fillRect(35, 30, 46, 2);
    this.context.fillRect(37, 20, 2, 10);
    this.context.fillRect(42, 20, 2, 10);
    this.context.fillRect(47, 20, 2, 10);
    this.context.fillRect(52, 20, 2, 10);
    this.context.fillRect(57, 20, 2, 10);
    this.context.fillRect(62, 20, 2, 10);
    this.context.fillRect(67, 20, 2, 10);
    this.context.fillRect(72, 20, 2, 10);
    this.context.fillRect(77, 20, 2, 10);
    this.context.closePath();

    // Draw the wheels.
    this.context.save();
    this.context.translate(15, 54);
    this.context.rotate(this.wheelRotationAngle);
    this.drawWheel();
    this.context.restore();

    this.context.save();
    this.context.translate(69, 54);
    this.context.rotate(this.wheelRotationAngle);
    this.drawWheel();
    this.context.restore();
}

FireTruck.prototype.drawWheel = function () {
    // Draw tire.
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(0, 0, 13, 0, 2 * Math.PI, true);
    this.context.fill();
    this.context.closePath();

    // Draw hubcap.
    this.context.beginPath();
    this.context.fillStyle = '#b3b3b3';
    this.context.arc(0, 0, 8, 0, 2 * Math.PI, true);
    this.context.fill();
    this.context.closePath();

    // Draw lines in hubcap.
    this.context.beginPath();
    this.context.strokeStyle = 'black';

    this.context.moveTo(0, -8);
    this.context.lineTo(0, 8);
    this.context.moveTo(0 - 8, 0);
    this.context.lineTo(0 + 8, 0);

    this.context.stroke();
    this.context.closePath();
}

FireTruck.prototype.update = function () {
    if (this.movingLeft == true) {
        var leftBorderOfTruck = this.xStart - 10 + this.dx;
        if (leftBorderOfTruck - this.speed >= 0) {
            this.dx -= this.speed;
            this.wheelRotationAngle -= this.changeInWheelRotateAngle;
        }
        else {
            this.movingLeft = false;
            this.dx += this.speed;
            this.wheelRotationAngle += this.changeInWheelRotateAngle;
        }
    }
    else {
        var rightBorderOfTruck = this.xStart + 100 + this.dx;
        if (rightBorderOfTruck + this.speed <= 700) {
            this.dx += this.speed;
            this.wheelRotationAngle += this.changeInWheelRotateAngle;
        }
        else {
            this.movingLeft = true;
            this.dx -= this.speed;
            this.wheelRotationAngle -= this.changeInWheelRotateAngle;
        }
    }
    this.context.save();
    this.context.translate(this.xStart + this.dx, this.yStart + this.dy);
}