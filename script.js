function handleEncrypt() {
  const cipherType = document.getElementById('cipherSelect').value;
  const input = document.getElementById('textInput').value;

  if (cipherType === 'caesar') {
    encryptCaesar(input);
  } else if (cipherType === 'shift') {
    const shiftValue = parseInt(document.getElementById('shift').value);
    encryptGeneralShift(input, shiftValue);
  } else if (cipherType === 'affine') {
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    encryptAffine(input, a, b);
  } else if (cipherType === 'transposition') {
    encryptTransposition(input);
  }
}

function handleDecrypt() {
  const cipherType = document.getElementById('cipherSelect').value;
  const input = document.getElementById('textInput').value;

  if (cipherType === 'caesar') {
    decryptCaesar(input);
  } else if (cipherType === 'shift') {
    const shiftValue = parseInt(document.getElementById('shift').value);
    decryptGeneralShift(input, shiftValue);
  } else if (cipherType === 'affine') {
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    decryptAffine(input, a, b);
  } else if (cipherType === 'transposition') {
    decryptTransposition(input);
  }
}

function encryptCaesar(input) {
  let encrypted = input.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) + 3);
  }).join('');
  document.getElementById('resultBox').textContent = 'Encrypted (Caesar): ' + encrypted;
}

function decryptCaesar(input) {
  let decrypted = input.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) - 3);
  }).join('');
  document.getElementById('resultBox').textContent = 'Decrypted (Caesar): ' + decrypted;
}

function encryptGeneralShift(input, shift) {
  let encrypted = input.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) + shift);
  }).join('');
  document.getElementById('resultBox').textContent = 'Encrypted (Shift ' + shift + '): ' + encrypted;
}

function decryptGeneralShift(input, shift) {
  let decrypted = input.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) - shift);
  }).join('');
  document.getElementById('resultBox').textContent = 'Decrypted (Shift ' + shift + '): ' + decrypted;
}

function encryptAffine(input, a, b) {
  let encrypted = input.split('').map(char => {
    return String.fromCharCode(((a * (char.charCodeAt(0) - 65) + b) % 26) + 65);
  }).join('');
  document.getElementById('resultBox').textContent = 'Encrypted (Affine): ' + encrypted;
}

function decryptAffine(input, a, b) {
  let modInverse = modInverseAffine(a, 26);
  let decrypted = input.split('').map(char => {
    return String.fromCharCode(((modInverse * (char.charCodeAt(0) - 65 - b)) % 26) + 65);
  }).join('');
  document.getElementById('resultBox').textContent = 'Decrypted (Affine): ' + decrypted;
}

function modInverseAffine(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
}

function encryptTransposition(input) {
  let columns = 4; // For example
  let grid = [];
  let encrypted = '';

  for (let i = 0; i < input.length; i += columns) {
    grid.push(input.slice(i, i + columns));
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < grid.length; j++) {
      encrypted += grid[j][i] || '';
    }
  }

  document.getElementById('resultBox').textContent = 'Encrypted (Transposition): ' + encrypted;
}

function decryptTransposition(input) {
  let columns = 4; 
  let rows = Math.ceil(input.length / columns);
  let grid = [];
  let decrypted = '';

  for (let i = 0; i < rows; i++) {
    grid.push(input.slice(i * columns, (i + 1) * columns).split(''));
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      decrypted += grid[j][i] || '';
    }
  }

  document.getElementById('resultBox').textContent = 'Decrypted (Transposition): ' + decrypted;
}

document.getElementById('cipherSelect').addEventListener('change', function() {
  const selectedCipher = this.value;
  document.getElementById('shiftParam').style.display = selectedCipher === 'shift' ? 'block' : 'none';
  document.getElementById('affineParams').style.display = selectedCipher === 'affine' ? 'block' : 'none';
});
