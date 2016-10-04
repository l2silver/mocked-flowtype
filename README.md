Mocked Flowtype
=========================

For more powerful 3rd party flowtype integration

## Additional Resources
[Introducing Mocked Flowtype](https://medium.com/p/a990cb26ec8e)  

## Installation
```
$ npm install --save mocked-flowtype
```
.flowconfing
```
[options]
module.name_mapper = module.name_mapper='^pluginName$' -> 'mocked-flowtype/definitions/pluginName/x.x.x(pluginVersion)_x.x.x(flowtypeVersion)'
```

## How it works

Flow ships with a config option that allows you to stub modules with more type friendly code. The mocked-flowtype library is simply a collection of type friendly modules.