import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
export class OrderPage extends BasePage {
  readonly page: Page
  readonly statusButton: Locator
  readonly userNameField: Locator
  readonly createOrderButton: Locator
  readonly commentField: Locator
  readonly phoneField: Locator
  readonly mainPageLink: Locator
  readonly orderCreatedButton: Locator
  readonly logOutButton: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderSubmitButton: Locator
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userNameField = page.getByTestId('username-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.commentField = page.getByTestId('comment-input')
    this.phoneField = page.getByTestId('phone-input')
    this.mainPageLink = page.getByTestId('mainPage-link')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logOutButton = page.getByTestId('logout-button')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.searchOrderSubmitButton = page.getByTestId('searchOrder-submitButton')
  }
}
