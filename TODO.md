# TODO

## Overview

This document tracks the initial tasks for the Regexer project, marking its first steps towards development.

## Functionalities

### Common Regex Operators support

- [x] `^` Matches the beginning of a string
- [x] `$` Matches the end of a string
- [x] `.` Matches any character as a wildcard
- [x] `|` An OR character
- [x] `(...)` Captures values in the parentheses
- [x] `[...]` Matches anything within the brackets
- [ ] `[a-z]` Matches by range of characters
- [x] `{x}` Exact number of times to match
- [ ] `{x,}` Minimum amount of times to match
- [ ] `*` Matches previous statement 0 or more times \*\* (Requires clarification)
- [ ] `+` Matches previous statement 1 or more times
- [ ] `?` Makes previous statement optional

### Regexer object

- [ ] Auto-escape reserved characters during the building phase
- [ ] Allow user to access the RegExp object to use native javascript regex functionalities after being built
- [ ] Provide utility methods for matching and replacing in a easy way after being built

## README

- [ ] Describe functionalities
- [ ] Outline the goals of this project
- [ ] Provide common usage examples

## CI/CD

- [ ] Implement GitHub Actions for CI/CD
- [ ] Set up a workflow to run tests and lint
- [ ] Automate publishing to NPM through GitHub Actions
