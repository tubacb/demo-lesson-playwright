import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found-page'
import { OrderFound } from '../pages/order-found'

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
  await expect(orderCreationPage.mainPageLink).toBeVisible()
  await expect(orderCreationPage.userNameField).toBeVisible()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login with correct credentials and create order', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(2))
  await orderCreationPage.phoneField.fill(faker.lorem.word(6))
  await orderCreationPage.createOrderButton.click()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login with correct credentials and logout', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logOutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('verify language toggle is visible', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.verifyLanguageSelector()
})

test('verify language toggle is visible in order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.verifyLanguageSelector()
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
  await expect(orderCreationPage.logOutButton).toBeVisible()
})
test('verify policy links in the footer in order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.verifyPolicyLinksInTheFooter()
})
test('verify policy links in the footer after login', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.verifyPolicyLinksInTheFooter()
})

test('verify order not found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('9999999')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderNotFound = new OrderNotFoundPage(page)
  await expect(orderNotFound.orderNotFoundTitle).toBeVisible()
  await orderNotFound.verifyPolicyLinksInTheFooter()
})

test('Verify order found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('13582')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderFound = new OrderFound(page)
  await expect(orderFound.statusListItem).toBeVisible()
  await orderFound.verifyPolicyLinksInTheFooter()
})
