# qthrottle

Limits concurrency of promise returning functions.

## Installation

    $ npm install qthrottle

## Example

### Before

The downloader function will start as many download sessions as it is called.

```
    var downloader = (function() {

        return function(url) {
            // return an promise
        };

    })();
```

### After

The new downloader function will start at most 10 download sessions at once.

```
    var downloader = (function() {

        var throttle = require('qthrottle')(10);

        var download = function(url) {
            // return an promise
        };

        return function(url) {
            return throttle.fcall(download, null, url);
        };

    })();
```

## API

```
    var throttle = require('qthrottle')(limit)
```

* limit - concurrency limit

```
    var promise = throttle.fcall(func, thisArg, arg1, arg2, ...)
```

* promise - an [Q](https://github.com/kriskowal/q) promise which is going to be resolved once promise returned by func resolves

* func - function which is going to be limited

* thisArg - this object or null for calling the function

* arg1, arg2, ... - variable arguments list for func

```
    var promise = throttle.fapply(func, thisArg, args)
```

* promise - an [Q](https://github.com/kriskowal/q) promise which is going to be resolved once promise returned by func resolves

* func - function which is going to be limited

* thisArg - this object or null for calling the function

* args - arguments array for calling the function


## Author

Karol Maciaszek <karol.maciaszek@gmail.com>

## License

(The MIT License)

Copyright (c) 2014 Karol Maciaszek <karol.maciaszek@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
