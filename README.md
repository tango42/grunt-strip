# grunt-strip-nodes

Strip JavaScript nodes (like console.* or if(...) ) out of your source code.
Forked from: [Jarrod Overson][forked]
[forked]: https://github.com/jsoverson/grunt-strip

## Getting Started
Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-strip`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-strip-modules');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Configuration

### Configuration - strip all iog*, console.log* statements and all if-code-blocks starting with: "if (rtlviewmode==='test') {""
```
strip : {
  main : {
    nodes : [
      'iog', 
      'console.log',
      { //esprima parser:
          type:'IfStatement',
          operator:'===',
          leftType:'Identifier',
          leftName:'rtlviewmode',
          rightType:'Literal',
          rightValue:'test',
          replaceWith:'/* removed by strip */'
      }          
    ],
    src : 'test/fixtures/all_api_methods.js',
    dest : 'tmp/all_api_methods.js'
  }
}
```

## Release History

- 0.1.2 nodeunit tests fixed
- 0.1.1 forked

## License
Copyright (c) 2013 WillemHein Triemstra  
Licensed under the MIT license.
