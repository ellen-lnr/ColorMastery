// app.js

document.addEventListener("DOMContentLoaded", () => {
    const shape = document.getElementById("shape");
    const targetColorDiv = document.querySelector(".target-color");
    const hueInput = document.getElementById("hue");
    const saturationInput = document.getElementById("saturation");
    const lightnessInput = document.getElementById("lightness");
    const checkButton = document.getElementById("checkColor");
    const feedback = document.getElementById("feedback");
    const scoreBoard = document.createElement("p");
    const restartButton = document.createElement("button");
    restartButton.textContent = "Recommencer";
    restartButton.style.display = "none";
    document.body.appendChild(scoreBoard);
    document.body.appendChild(restartButton);

    const hexInput = document.createElement("input");
    hexInput.type = "text";
    hexInput.placeholder = "#RRGGBB";
    document.querySelector(".controls").appendChild(hexInput);

    let round = 0;
    let totalScore = 0;
    const maxRounds = 10;
    let targetHue, targetSaturation, targetLightness;

    function generateTargetColor() {
        targetHue = Math.floor(Math.random() * 360);
        targetSaturation = Math.floor(Math.random() * 100);
        targetLightness = Math.floor(Math.random() * 100);
        let targetColor = `hsl(${targetHue}, ${targetSaturation}%, ${targetLightness}%)`;
        targetColorDiv.style.backgroundColor = targetColor;
    }

    function updateShapeColor() {
        let h = hueInput.value;
        let s = saturationInput.value;
        let l = lightnessInput.value;
        shape.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
        hexInput.value = hslToHex(h, s, l);
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }

    function checkColorMatch() {
        let userH = parseInt(hueInput.value);
        let userS = parseInt(saturationInput.value);
        let userL = parseInt(lightnessInput.value);
        
        let hueDiff = Math.abs(userH - targetHue);
        let satDiff = Math.abs(userS - targetSaturation);
        let lightDiff = Math.abs(userL - targetLightness);

        let totalDiff = hueDiff + satDiff + lightDiff;
        let score = totalDiff <= 10 ? 10 : totalDiff < 50 ? 5 : 0;

        totalScore += score;
        feedback.textContent = `Score du round : ${score}/10`;
        scoreBoard.textContent = `Score total : ${totalScore}/${maxRounds * 10}`;

        if (++round < maxRounds) {
            generateTargetColor();
        } else {
            feedback.textContent += ` Partie terminée ! Score final : ${totalScore}/${maxRounds * 10}`;
            checkButton.disabled = true;
            restartButton.style.display = "block";
        }
    }

    function restartGame() {
        round = 0;
        totalScore = 0;
        scoreBoard.textContent = "";
        feedback.textContent = "";
        checkButton.disabled = false;
        restartButton.style.display = "none";
        generateTargetColor();
    }

    restartButton.addEventListener("click", restartGame);
    hueInput.addEventListener("input", updateShapeColor);
    saturationInput.addEventListener("input", updateShapeColor);
    lightnessInput.addEventListener("input", updateShapeColor);
    checkButton.addEventListener("click", checkColorMatch);

    generateTargetColor();
});
