# Test Automation examples Playwright

Test automation examples with [jaktestowac.pl.](https://www.youtube.com/watch?v=JqEp2cjnzAo&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&ab_channel=jaktestowacpl) <br>
The repository contains tests written based on the course.

## Links

- Course [jaktestowac.pl.](https://www.youtube.com/watch?v=JqEp2cjnzAo&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&ab_channel=jaktestowacpl) <br>
- [Test site](https://demo-bank.vercel.app/) if link is broken go to [jaktestowac.pl.](https://jaktestowac.pl/lesson/pw1s01l01/)

## Commit Message Guidelines

From 1st August 2023, new commit message guidelines are in effect. Commit messages should start with a capital letter and be written in the present tense, beginning with an imperative verb. For example:

- "Add feature to handle user authentication"
- "Fix issue with data processing"
- "Update documentation for new API endpoints"

## Getting Started

You'll need [Node.js](https://nodejs.org) installed on your computer in order to use Playwright.<br>

### Playwright

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

## Other

### Prettier

In the project, [Prettier](https://prettier.io/) extension has been used for proper code formatting.

Install Prettier:

```bash
$ npm install --save-dev --save-exact prettier
```

Configure Prettier:

- exlude files in `.prettierignore`

```bash
package-lock.json
playwright-report
test-results
```

- set rules in `.prettierrc.json`

```bash
{
  "singleQuote": true,
  "endOfLine": "auto"
}
```

Run Prettier:

```bash
npx prettier --write .
```

Additionaly you can install Visual Studio Code extension: Prettier
