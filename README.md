# OrangeHRM Playwright Automation

A UI test automation project for OrangeHRM built with **Playwright Test and TypeScript**. The project uses the **Page Object Model (POM)** to keep page locators and actions separate from test scenarios.

## Coverage

- Login with valid credentials
- Login validation with invalid credentials
- Employee creation
- Employee search
- Employee first-name update
- Employee deletion

## Tech stack

- TypeScript
- Playwright Test
- Node.js and npm
- Page Object Model
- dotenv for environment configuration
- GitHub Actions for CI

## Project structure

```text
.
├── .github/workflows/playwright.yml
├── fixtures/
│   └── test.ts
├── pages/
│   ├── AddEmployeePage.ts
│   ├── DashboardPage.ts
│   ├── EmployeeDetailsPage.ts
│   ├── EmployeeListPage.ts
│   ├── LoginPage.ts
│   └── PIMPage.ts
├── test-data/
├── tests/
│   ├── employee.spec.ts
│   └── login.spec.ts
├── .env.example
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Prerequisites

- Install a current Node.js LTS release.
- Install Git.

## Setup

1. Clone this repository and enter the project folder:

   ```bash
   git clone https://github.com/SalunkeGaurav/OrangeHRM-Playwright-TypeScript.git
   cd OrangeHRM-Playwright-TypeScript
   npm install
   npx playwright install chromium
   ```

2. Create a `.env` file in the project root using `.env.example` as a template:

   ```env
   BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
   ORANGEHRM_USERNAME=your_username
   ORANGEHRM_PASSWORD=your_password
   ```

   Use credentials you are authorized to use. Do not commit your `.env` file or real credentials.

## Run tests

The public OrangeHRM demo is a shared environment and can become slow under concurrent requests. Run the state-changing employee tests sequentially for more reliable results:

```bash
npx playwright test --workers=1
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts --workers=1
npx playwright test tests/employee.spec.ts --workers=1
```

Run with a visible browser:

```bash
npx playwright test --headed --workers=1
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Configuration

- `playwright.config.ts` loads environment variables with dotenv.
- The base URL and credentials are read from environment variables.
- The current configuration targets Chromium.
- GitHub Actions runs the Playwright suite on pushes and pull requests to `main` or `master`. Configure the repository Actions secrets `BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD` before relying on the workflow.

## Notes

- This is a learning and portfolio project using the public OrangeHRM demo; its availability and response time are outside this project's control.
- The tests create, update, and delete demo employee records. Use only an environment where you have permission to perform these actions.
- If a test fails, inspect the error and Playwright trace rather than increasing timeouts repeatedly.
