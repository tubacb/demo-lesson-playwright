import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.mainPageLink).toBeVisible();
  await expect(orderCreationPage.userNameField).toBeVisible();
  await expect(orderCreationPage.orderCreatedButton).toBeVisible();
})

test('login with correct credentials and create order', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(2));
  await orderCreationPage.phoneField.fill(faker.lorem.word(6));
  await orderCreationPage.createOrderButton.click();
  await expect(orderCreationPage.orderCreatedButton).toBeVisible();
})

test('login with correct credentials and logout', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logOutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('to show disabled order creation button and username, phone fields input errors and after login with correct credentials and fill the username and phone then clear them', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(3));
  await orderCreationPage.userNameField.clear();
  await expect(orderCreationPage.userNameFieldInputError).toBeVisible()
  await orderCreationPage.phoneField.fill(faker.lorem.word(6));
  await orderCreationPage.phoneField.clear();
  await expect(orderCreationPage.phoneInputError).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeDisabled();
})

test('to show phone input error and disabled order creation button after login with correct credentials and fill phone less than 6 characters', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.phoneField.fill(faker.lorem.word(5));
  await expect(orderCreationPage.phoneInputError).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeDisabled();
})

test('to create order after entering correct credentials for login and order pages and to close the popup with OK button and to log out', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(6));
  await orderCreationPage.phoneField.fill(faker.lorem.word(6));
  await orderCreationPage.commentField.fill(faker.lorem.word(6));
  await orderCreationPage.createOrderButton.click();
  await expect(orderCreationPage.orderCreatedButton).toBeVisible();
  await orderCreationPage.orderCreatedButton.click();
  await expect(orderCreationPage.orderCreatedPopup).toBeVisible();
  await orderCreationPage.logOutButton.click()
  await expect(authPage.signInButton).toBeVisible()

})