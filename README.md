# Test Automation examples Playwright

Test automation examples with [jaktestowac.pl.](https://www.youtube.com/watch?v=JqEp2cjnzAo&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&ab_channel=jaktestowacpl) <br>
The repository contains tests written based on the course.

## Links

- Course [jaktestowac.pl.](https://www.youtube.com/watch?v=JqEp2cjnzAo&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&ab_channel=jaktestowacpl) <br>
- [Test site](https://demo-bank.vercel.app/) if link is broken go to [jaktestowac.pl.](https://jaktestowac.pl/lesson/pw1s01l01/)

## Getting Started

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.<br>

New project with Playwright:

```bash
$ npm init playwright@latest
```

Record tests for given site:

```bash
$ npx playwright codegen https://demo-bank.vercel.app/
```

Run tests:

```bash
$ npx playwright test
```

Run tests with browser GUI:

```bash
$ npx playwright test --headed
```

View report:

```bash
$ npx playwright show-report
```
