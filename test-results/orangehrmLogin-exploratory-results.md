# OrangeHRM Login Exploratory Results

**Date:** 2026-10-28  
**Environment:** OrangeHRM OS 5.9 demo, explored in Chromium through Playwright MCP  
**Application:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

| Planned scenario | Result | Observation |
|---|---|---|
| Successful login / login page access | PASS | Login form, username/password fields, Login button, Forgot Password link, and branding were visible over HTTPS. `Admin` / `admin123` navigated to `/dashboard/index` and displayed the Dashboard. |
| Invalid password | PASS | `Admin` / `admin999` stayed on the login route and showed `Invalid credentials` in the alert. |
| Invalid username | PASS | `Admin123` / `admin123` stayed on the login route and showed `Invalid credentials` in the alert. |
| Empty username | PASS | Submitting with only the password entered showed `Required` for Username. |
| Empty password | PASS | Submitting with only the username entered showed `Required` for Password. |
| Both fields empty | PASS | Submitting an empty form showed two `Required` messages. |
| Logout and browser Back | PASS | Logout returned to the login page. Browser Back attempted the prior dashboard route but returned to the login page rather than restoring authenticated content. |
| Password masking and HTTPS | PASS | The password input has type `password`; the page uses HTTPS. |
| Keyboard focus navigation | Automation only | The end-to-end keyboard test passed in Chromium, Firefox, and WebKit. It was not separately exercised manually. |

Screenshots:

- Login page: `specs/OrangeHRM-login.png`
- Dashboard: `specs/OrangeHRM-dashboard.png`
- Invalid credentials: `specs/OrangeHRM-invalid-credentials.png`

Limitations: Session-timeout duration was not specified and was not tested. No evidence was collected for brute-force protections, transport encryption beyond HTTPS, or screen-reader accessibility. These require additional test design and, for session timeout, a configured timeout value.

Console observations: The browser logged a verbose suggestion to add an `autocomplete` attribute to the password field. After browser Back attempted to reopen the dashboard post-logout, dashboard API calls returned 401 while the application redirected to login; protected content was not restored. These observations did not fail the tested login/logout behavior.
