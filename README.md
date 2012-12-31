# JavaScript error handling examples
This is a collection of various JavaScript error handling techniques.

- **synchronous**
  - `synchronous-return-value`: indicate error through return value
  - `synchronous-exception`: throw an exception if an error occurs
- **asynchronous**
  - `error-callbacks`: call additional error callback
  - `error-callbacks-node`: call regular callback with error argument
  - `promises`: return a promise object
  - `domain-bound-execptions`: use Node.js domains

## Usage
Run a file without arguments to watch it fail; pass an argument for success.

```bash
$ ./promises.js
Letter not sent: Cannot reach address empty
$ ./promises.js London
Letter sent with code XYZ-London
```

## Read more
This code accompanies the blog post [Asynchronous error handling in JavaScript](http://ruben.verborgh.org/blog/2012/12/31/asynchronous-error-handling-in-javascript/), which discusses the use case.
