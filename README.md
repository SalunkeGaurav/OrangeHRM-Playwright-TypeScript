# OrangeHRM Playwright Automation

A UI test automation portfolio project for OrangeHRM built with **Playwright Test and TypeScript**. It demonstrates the Page Object Model (POM), custom fixtures, environment-based configuration, login validation, employee workflows, and AI-assisted test planning and generation.

> **Scope:** This project tests the public OrangeHRM demo. It is a learning/portfolio project, not a production test suite. The demo is shared and may be slow or temporarily unavailable.

## Coverage

### Login and password recovery
- Successful login and invalid-credential validation (existing tests)
- Required-field validation for empty username, empty password, and both fields empty
- Navigation to and cancellation from the password-recovery page
- Required-username validation on the password-recovery page

### Employee workflows
- Employee creation
- Employee search
- Employee first-name update
- Employee deletion

The password-recovery tests verify navigation and client-side required-field validation. They do **not** verify email delivery or successful account recovery.

## Tech stack

- TypeScript and Node.js
- Playwright Test
- Page Object Model (POM)
- Custom Playwright fixtures
- Environment variables with dotenv
- GitHub Actions for continuous integration
- Playwright MCP agent configurations for AI-assisted test planning, test generation, and test failure investigation

## Project structure

```text
.
├── .codex/
│   └── agents/
│       ├── playwright_test_generator.toml
│       ├── playwright_test_healer.toml
│       └── playwright_test_planner.toml
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test.ts
├── pages/
│   ├── AddEmployeePage.ts
│   ├── DashboardPage.ts
│   ├── EmployeeDetailsPage.ts
│   ├── EmployeeListPage.ts
│   ├── LoginPage.ts
│   └── PIMPage.ts
├── specs/
│   ├── README.md
│   └── login-test-plan.md
├── test-data/
├── tests/
│   ├── employee/
│   │   └── employee.spec.ts
│   ├── login/
│   │   ├── empty-credentials.spec.ts
│   │   ├── empty-password.spec.ts
│   │   ├── empty-username.spec.ts
│   │   ├── login.spec.ts
│   │   ├── password-reset-empty-username.spec.ts
│   │   └── password-reset-navigation.spec.ts
│   └── seed.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

- A current Node.js LTS release
- Git

## Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/SalunkeGaurav/OrangeHRM-Playwright-TypeScript.git
   cd OrangeHRM-Playwright-TypeScript
   npm ci
   npx playwright install chromium
   ```

2. Create a `.env` file in the project root using `.env.example` as a template:

   ```env
   BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
   ORANGEHRM_USERNAME=your_username
   ORANGEHRM_PASSWORD=your_password
   ```

   Use credentials you are authorized to use. Do not commit `.env` or real credentials. The public demo's availability and credentials can change.

## Run tests

Run the full suite sequentially:

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Run a specific test file:

```bash
npx playwright test tests/login/login.spec.ts
npx playwright test tests/login/empty-credentials.spec.ts
npx playwright test tests/employee/employee.spec.ts
```

Open the HTML report after a test run:

```bash
npm run test:report
```

## Configuration and CI

- `playwright.config.ts` loads environment variables using dotenv and configures Chromium.
- `BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD` are read from environment variables.
- GitHub Actions runs the suite for pushes and pull requests targeting `main` or `master`. Configure the corresponding repository Actions secrets if your workflow requires them.
- The workflow uploads the Playwright HTML report as an artifact after a run.

## AI-assisted test workflow

The `.codex/agents/` directory contains configurations for three Playwright MCP agents:

- **Planner:** explores the application and saves test plans.
- **Generator:** uses a test plan and browser observations to help generate Playwright tests.
- **Healer:** investigates failing tests and attempts targeted fixes, followed by verification.

The current additional scenarios are documented in [`specs/login-test-plan.md`](specs/login-test-plan.md). These configurations provide AI-assisted workflows; they do not guarantee autonomous or self-healing tests. Review generated changes and rerun the suite before accepting them. Agent use requires a compatible Codex/MCP setup.

## Notes and limitations

- The public OrangeHRM demo is a shared environment; network issues, changes to the site, and concurrent use can affect results.
- Employee tests create, update, and delete demo records. Run them only against an environment where you have permission to perform these actions.
- Password recovery is not tested end-to-end because submitting a real account recovery request can trigger an external flow.
- When a test fails, inspect the error and Playwright trace before changing timeouts or selectors.
