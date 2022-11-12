/// <reference types='Cypress' />

import { navigateTo, onNavigationPage }  from '../../support/pageObjects/navigationPage'
import { onFormLayoutPage }  from '../../support/pageObjects/formLayoutPage'
import { onDatePickerPage } from '../../support/pageObjects/datepickerPage'
import { onSmartTablePage } from '../../support/pageObjects/smartTablePage'

describe('Test with Page Objects', () =>
{
    beforeEach('open application', ()=>
    {
        cy.openHomePage()
    })

    it('verify navigation across the pages', () =>
    {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.toolTipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date', () =>
    {
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInLineFromWithNameAndEmail('sanjay','test@test.com')
        onFormLayoutPage.submitBasicFromWithEmailAndPassword('test@test.com','1234')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(30)
        onDatePickerPage.selectDatePickerWithRangeFromToday(1, 30)

        navigateTo.smartTablePage()
        onSmartTablePage.addRecorsWithFirstAndLastName('Sanjay', 'Maurya')
        onSmartTablePage.updateByFirstName('Sanjay')
        onSmartTablePage.deleteRowByIndex(1)
    })
})