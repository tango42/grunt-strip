var grunt = require('grunt'),
    falafel = require('falafel'),
    fs = require('fs');

exports.stripNodes = function(nodeObj, file, dest) {
  "use strict";

  var existsSync = fs.existsSync || require('path').existsSync;

  var src = existsSync(file) ? grunt.file.read(file) : file;

  var output = falafel(src, function(node){
    var replace;
    if(typeof nodeObj === 'string') {
      if (
          node.type === 'CallExpression' &&
          node.callee.object && node.callee.object.name === nodeObj
        ) {
        replace = nodeObj.replaceWith || '/* removed by strip */';
        node.update(replace);
      }
    }
    if(typeof nodeObj === 'object') {
      if (
        nodeObj.type &&
        nodeObj.operator &&
        nodeObj.leftType &&
        nodeObj.leftName &&
        nodeObj.rightType &&
        nodeObj.rightValue &&
        node.type === nodeObj.type &&
        node.test.operator === nodeObj.operator &&
        node.test.left.type === nodeObj.leftType &&
        node.test.left.name === nodeObj.leftName &&
        node.test.right.type === nodeObj.rightType &&
        node.test.right.value === nodeObj.rightValue
        ) {
        replace = nodeObj.replaceWith || '/* removed by strip */';
        node.update(replace);
      }
    }
  });

  if (dest) {
    return grunt.file.write(dest, output);
  } else {
    return output.toString();
  }
};

