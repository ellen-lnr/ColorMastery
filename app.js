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

    function updateShapeColor() {
        let h = hueInput.value;
        let s = saturationInput.value;
        let l = lightnessInput.value;
        let hslColor = `hsl(${h}, ${s}%, ${l}%)`;
        shape.style.backgroundColor = hslColor;
        hexInput.value = hslToHex(h, s, l);
    }

    function updateFromHex() {
        let hex = hexInput.value;
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = hex;
        let computed = ctx.fillStyle;
        if (computed.startsWith("rgb")) {
            shape.style.backgroundColor = computed;
        }
    }

    hueInput.addEventListener("input", updateShapeColor);
    saturationInput.addEventListener("input", updateShapeColor);
    lightnessInput.addEventListener("input", updateShapeColor);
    hexInput.addEventListener("input", updateFromHex);

    generateTargetColor();
});
