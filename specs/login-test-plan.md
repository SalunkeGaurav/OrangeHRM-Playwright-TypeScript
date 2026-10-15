# OrangeHRM Login and Password Recovery Test Plan

## Application Overview

Plan for additional login and password recovery behaviors on the configured OrangeHRM public demo (https://opensource-demo.orangehrmlive.com/). Existing project login tests already cover valid and invalid credentials; those scenarios are intentionally not duplicated here. The browser was initialized with tests/seed.spec.ts. Live browser observations verified the Login page controls, required-field messages, Forgot your password navigation, Reset Password page controls, required username validation, and Cancel return path. See the verified/unverified notes in this plan.

## Test Scenarios

## Coverage notes

- Existing project tests already cover successful authentication with valid credentials and rejection of invalid credentials. This plan does not add those scenarios again.
- The additional scenarios below cover the required-field checks that distinguish blank username, blank password, and both blank, plus the visible password-recovery navigation and its blank-username validation.
- Keep all scenarios independent and begin each in a fresh unauthenticated browser context. Do not include credentials in plan artifacts.

## Browser verification

Browser exploration used the project seed `tests/seed.spec.ts` through `planner_setup_page`. The seed paused on `about:blank`, so the browser was navigated to the configured target `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`.

**Verified in the live browser on 2026-10-15:**

- Login page title is `OrangeHRM`; the page exposes a `Login` heading, `Username` and `Password` textboxes, a `Login` button, and `Forgot your password?`.
- Submitting both fields empty leaves the login route unchanged and displays `Required` under both fields.
- Submitting a non-empty password with an empty username leaves the login route unchanged and displays `Required` under Username.
- Submitting a username with an empty password leaves the login route unchanged and displays `Required` under Password.
- Selecting `Forgot your password?` opens `/web/index.php/auth/requestPasswordResetCode`, with heading `Reset Password`, username input, account-identification instructions, and `Cancel` and `Reset Password` buttons.
- Submitting the reset form empty leaves that route open and displays `Required` under Username.
- Selecting `Cancel` from the reset page returns to `/web/index.php/auth/login`.

**Not verified in this exploration:**

- The valid and invalid credential scenarios were not re-executed; they are already covered by the project's existing login tests and are outside the additional scenarios in this plan.
- Password reset submission for a named account was not attempted because it could initiate an external recovery flow. Its success confirmation, unknown-user behavior, and any email delivery cannot be asserted from this browser session.
- No Dashboard behavior was exercised during this pass. The no-Dashboard criteria in the blank-field scenarios are based on the observed unchanged login route and should be asserted when those scenarios are automated.

### 1. Additional login validation and password recovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. LGIN-03 — Require username when password is provided

**File:** `tests/login/empty-username.spec.ts`

**Steps:**
  1. Start in a fresh unauthenticated browser context at the OrangeHRM login page. Leave Username blank and enter a non-empty arbitrary password.
    - expect: Username and Password fields and Login button are visible.
  2. Click Login.
    - expect: A Required message is displayed under Username.
    - expect: The URL remains on /web/index.php/auth/login; no Dashboard is shown.

#### 1.2. LGIN-04 — Require password when username is provided

**File:** `tests/login/empty-password.spec.ts`

**Steps:**
  1. Start in a fresh unauthenticated browser context. Enter a username and leave Password blank.
    - expect: The login form is displayed with the entered username.
  2. Click Login.
    - expect: A Required message is displayed under Password.
    - expect: The URL remains on /web/index.php/auth/login; no Dashboard is shown.

#### 1.3. LGIN-05 — Require both credentials when submitted empty

**File:** `tests/login/empty-credentials.spec.ts`

**Steps:**
  1. Start in a fresh unauthenticated browser context and leave Username and Password blank.
    - expect: The login form is displayed with both fields empty.
  2. Click Login.
    - expect: Required messages are displayed under both Username and Password.
    - expect: The URL remains on /web/index.php/auth/login; no Dashboard is shown.

#### 1.4. LGIN-06 — Open and cancel password recovery

**File:** `tests/login/password-reset-navigation.spec.ts`

**Steps:**
  1. Start in a fresh unauthenticated browser context on Login and select Forgot your password?.
    - expect: The Reset Password heading and username field are visible.
    - expect: Instruction text asks for a username to identify the account.
    - expect: Cancel and Reset Password buttons are visible.
    - expect: The URL is /web/index.php/auth/requestPasswordResetCode.
  2. Select Cancel.
    - expect: The application returns to the Login page at /web/index.php/auth/login.
    - expect: The Login heading and credential fields are visible.

#### 1.5. LGIN-07 — Require username for password recovery

**File:** `tests/login/password-reset-empty-username.spec.ts`

**Steps:**
  1. Start in a fresh unauthenticated browser context and open Forgot your password?. Leave the reset Username field blank.
    - expect: The Reset Password page is displayed with an empty username field.
  2. Select Reset Password.
    - expect: A Required message is displayed under Username.
    - expect: The reset form remains displayed at /web/index.php/auth/requestPasswordResetCode.
