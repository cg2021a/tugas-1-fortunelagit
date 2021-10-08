main();

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    }
  };

  const buffers = initBuffers(gl);

  var then = 0;

  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime);
    //draw();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function draw() {
  // Write the positions of vertices to a vertex shader
  var n = initBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a line
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function initBuffers2(gl){
  
  const vertexBuffer = gl.createBuffer(),
  vertices = [], vertCount = 3;

  for (var i=0.0; i<=360; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    // X Y Z
    var vert1 = [
      Math.sin(j),
      Math.cos(j),
      -0.031835,
    ];

    vertices = vertices.concat(vert1);
  }

  var n = vertices.length / vertCount;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var aPosition = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);

  return n;
}


function initBuffers(gl) {

  const positionBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


  const positions = [
    // BACK SIDE
    // Front face
    -3.49300, -1.01750, -0.42446,   //2
    -0.06506, -0.98757, -0.31073,   //3
     0.12154,  0.52826,  0.99275,   //0
    -3.54950,  0.49835,  0.87902,   //1

    // Back face
    -3.47850, -0.58286, -0.99275,   //7
    -3.53490,  0.98757,  0.31073,   //6
    -0.10695,  1.01750,  0.42446,   //5 
    -0.05048, -0.49835, -0.87902,   //4

    // Top face
    -3.53490,  0.98757,  0.31073,   //6
    -3.54950,  0.49835,  0.87902,   //1
     0.12154,  0.52826,  0.99275,   //0
    -0.10695,  1.01750,  0.42446,   //5

    // Bottom face
    -3.47850, -0.58286, -0.99275,   //7
    -0.05048, -0.49835, -0.87902,   //4  
    -0.06506, -0.98757, -0.31073,   //3
    -3.49300, -1.01750, -0.42446,   //2

    // Right face
    -0.05048, -0.49835, -0.87902,   //4
    -0.10695,  1.01750,  0.42446,   //5
     0.12154,  0.52826,  0.99275,   //0 
    -0.06506, -0.98757, -0.31073,   //3

    // Left face
    -3.47850, -0.58286, -0.99275,   //7
    -3.49300, -1.01750, -0.42446,   //2
    -3.54950,  0.49835,  0.87902,   //1
    -3.53490,  0.98757,  0.31073,   //6
    
    // Screen
    -3.34860, -0.87478, -0.28327,   //2
    -1.35970, -0.85742, -0.21729,   //3
    -1.40600,  0.38556,  0.85156,   //0
    -3.39490,  0.36820,  0.78558,   //1

    // RIGHT SIDE
    // Front face
     2.29760, -1.57810,  1.20220,	//2	
     3.80050, -0.37837, -1.63810,	//3
     3.73610,  1.47500, -0.88923,	//0
     2.23330,  0.27532,  1.95100,	//1

    // Back face
     1.63290, -1.47500,  0.88923,	//7
     1.55950,  0.37837,  1.63810,	//6
     3.06240,  1.57810, -1.20220,	//5
     3.12670, -0.27532, -1.95100,	//4 

    // Top face
     1.55950,  0.37837,  1.63810,	//6
     2.23330,  0.27532,  1.95100,	//1
     3.73610,  1.47500, -0.88923,	//0
     3.06240,  1.57810, -1.20220,	//5

    // Bottom face
    1.63290, -1.47500,  0.88923,	//7
     3.12670, -0.27532, -1.95100,	//4 
     3.80050, -0.37837, -1.63810,	//3
     2.29760, -1.57810,  1.20220,	//2

    // Right face
     3.12670, -0.27532, -1.95100,	//4
     3.06240,  1.57810, -1.20220,	//5
     3.73610,  1.47500, -0.88923,	//0
     3.80050, -0.37837, -1.63810,	//3

    // Left face
     1.63290, -1.47500,  0.88923,	//7
     2.29760, -1.57810,  1.20220,	//2
     2.23330,  0.27532,  1.95100,	//1
     1.55950,  0.37837,  1.63810,	//6
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
 
  
  const faceColors = [
    [1.0,  0.0,  0.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    [1.0,  0.0,  1.0,  1.0],

    [1.0,  0.0,  0.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  ];


  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
    24, 25, 26,     24, 26, 27,
    28, 29, 30,     28, 30, 31,
    32, 33, 34,     32, 34, 35,
    36, 37, 38,     36, 38, 39,
    40, 41, 42,     40, 42, 43,
    44, 45, 46,     44, 46, 47,
    48, 49, 50,     48, 50, 51,
  ];


  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things


  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate
  /*mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)*/

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const vertexCount = 78; //36 + 6 + 36
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  cubeRotation += deltaTime;
}


function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);


  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}


function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
