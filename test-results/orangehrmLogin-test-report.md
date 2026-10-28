# OrangeHRM Login Test Execution Report

**Execution date:** 2026-10-28  
**Application:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Browsers:** Chromium, Firefox, WebKit  
**Story:** AG-1 — Login to OrangeHRM

## 1. Executive Summary

- **Planned scenarios:** 9
- **Manual exploratory scenarios executed:** 8 passed; keyboard focus was not separately exercised manually.
- **Automated executions:** 27 passed, 0 failed (9 scenarios across 3 browser projects).
- **Overall status:** PASS for the tested login and logout behavior, with the security, session-timeout, and accessibility gaps listed below.

The demo account `Admin` / `admin123` successfully authenticated. Invalid credentials and required-field errors matched the expected results. Logout and browser Back did not restore authenticated dashboard content.

## 2. Manual Test Results

See [exploratory results](./orangehrmLogin-exploratory-results.md) for scenario-level outcomes and observations.

Evidence:

- Login page: `specs/OrangeHRM-login.png`
- Dashboard after successful login: `specs/OrangeHRM-dashboard.png`
- Invalid credentials: `specs/OrangeHRM-invalid-credentials.png`

No unexpected functional behavior was observed in the scenarios manually exercised.

The browser console suggested adding a password `autocomplete` attribute. After logout, browser Back triggered dashboard API requests that returned 401 while the application redirected to login; authenticated content was not restored.

## 3. Automated Test Results

Automation: [login.spec.ts](../tests/orangehrmLogin/login.spec.ts)  
Plan: [Orangehrm-test-plan.md](../specs/Orangehrm-test-plan.md)

| Browser project | Passed | Failed |
|---|---:|---:|
| Chromium | 9 | 0 |
| Firefox | 9 | 0 |
| WebKit | 9 | 0 |
| **Total** | **27** | **0** |

The first Chromium run passed all 8 then-existing tests. After adding keyboard focus coverage, the complete 9-test suite passed in all 3 browser projects. No failures remained, so the test-healer was not needed and no healing changes were made.

## 4. Defects Log

No defects were identified in the tested scenarios.

## 5. Test Coverage Analysis

| Acceptance criterion / requirement | Manual | Automated |
|---|---|---|
| Successful login redirects to Dashboard | Pass | Pass in Chromium, Firefox, WebKit |
| Invalid password shows `Invalid credentials` | Pass | Pass in all 3 browser projects |
| Empty username shows `Required` | Pass | Pass in all 3 browser projects |
| Empty password shows `Required` | Pass | Pass in all 3 browser projects |
| Both empty fields show `Required` | Pass | Pass in all 3 browser projects |
| Password masking and HTTPS | Pass | Pass in all 3 browser projects |
| Logout invalidates session; Back does not restore dashboard | Pass | Pass in all 3 browser projects |
| Keyboard focus navigation | Not separately exercised manually | Pass in all 3 browser projects |
| Session timeout | Not tested | Not tested; timeout duration was not supplied |

**Coverage gaps:** Session timeout, brute-force protection, encryption properties beyond verifying HTTPS, screen-reader compatibility, responsive layouts, and the story's under-3-second performance target were not measured. The browser also suggested setting an `autocomplete` value for the password input.

## 6. Summary and Recommendations

The demo login workflow behaved as expected in Chromium, Firefox, and WebKit. All 27 automated executions passed. Add dedicated tests once the expected session-timeout duration and measurable performance environment are specified; schedule security and screen-reader testing separately.

## 7. Repository Publication

The local workspace has no Git repository initialized. The plan, automation, and text reports are being published to `savichiplunkar/playwrightmcp-firstrepo` on `main` using GitHub MCP. MCP configuration, local logs, generated browser state, and unrelated files are excluded. Screenshot evidence remains in the local workspace and is not included in the remote text-file commit.
