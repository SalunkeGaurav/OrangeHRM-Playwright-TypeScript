import { Page } from '@playwright/test';
import { DashboardPage } from './DashboardPage';

export class LoginPage {
    usernameInput;
    passwordInput;
    loginButton;

    constructor(private page: Page) {
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(username: string, password: string): Promise<DashboardPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new DashboardPage(this.page);
    }
}