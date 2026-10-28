# OrangeHRM Login End-to-End Test Plan

## Application Overview

Validate the OrangeHRM demo login page against the AG-1 acceptance criteria, including successful authentication, invalid credentials, required-field validation, basic password/HTTPS security, and logout/session behavior. User story URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. Test account is the demo-provided Admin/admin123.

## Test Scenarios

### 1. OrangeHRM Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login displays the Dashboard

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open the OrangeHRM login URL.
    - expect: Login form is displayed over HTTPS.
  2. Enter username Admin and password admin123, then select Login.
    - expect: Browser navigates to the Dashboard route.
    - expect: Dashboard heading is visible.

#### 1.2. Invalid password is rejected

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open the login URL and enter username Admin with an incorrect password admin999.
    - expect: Username and password fields accept input.
  2. Select Login.
    - expect: Login is rejected and the Invalid credentials message is displayed.
    - expect: The user remains on the login route.

#### 1.3. Invalid username is rejected

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open the login URL and enter username Admin123 with password admin123.
    - expect: Username and password fields accept input.
  2. Select Login.
    - expect: Login is rejected and the Invalid credentials message is displayed.

#### 1.4. Empty username shows required validation

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open login URL, leave Username blank, enter password admin123, then select Login.
    - expect: Required validation is shown for Username.
    - expect: Login remains blocked.

#### 1.5. Empty password shows required validation

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open login URL, enter username Admin, leave Password blank, then select Login.
    - expect: Required validation is shown for Password.
    - expect: Login remains blocked.

#### 1.6. Both empty fields show required validation

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open login URL and select Login without entering either field.
    - expect: Required validation is shown for Username and Password.

#### 1.7. Logout invalidates the authenticated session

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Log in using Admin/admin123.
    - expect: Dashboard is displayed.
  2. Open the user menu and select Logout.
    - expect: Login page is displayed.
  3. Use browser Back.
    - expect: The authenticated dashboard is not restored; protected content requires login.

#### 1.8. Password is masked and login page uses HTTPS

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Open login page and inspect password input type.
    - expect: Password input type is password.
  2. Inspect the secure URL.
    - expect: Page uses HTTPS.

#### 1.9. Login form supports keyboard focus navigation

**File:** `tests/orangehrmLogin/login.spec.ts`

**Steps:**
  1. Focus Username, then use Tab to move through Password and Login.
    - expect: Password and Login can be focused by keyboard.
