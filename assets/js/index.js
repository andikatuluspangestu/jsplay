const outputElement = document.getElementById('output');
const codeEditor = document.getElementById('code');

codeEditor.addEventListener('input', updateOutput);

function updateOutput() {
  try {
    const code = codeEditor.value;
    const output = captureConsoleLog(() => {
      eval(code);
    });
    outputElement.innerHTML = `<pre>${output}</pre>`;
  } catch (error) {
    outputElement.innerHTML = `<pre style="color: #ff9580;">Error: ${error}</pre>`;
  }
}

function captureConsoleLog(callback) {
  const originalConsoleLog = console.log;
  let output = '';

  console.log = (...args) => {
    originalConsoleLog(...args);
    output = `${output}${args.join(' ')}\n`;
  };

  callback();

  console.log = originalConsoleLog;
  return output;
}

updateOutput();