function selectDayFromCurrent(day){
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})
    console.log("Future date is: "+futureDay+" and future month is: "+futureMonth)
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
//check the month
cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttributee =>
{
if(!dateAttributee.includes(futureMonth)){
cy.get('[data-name="chevron-right"]').click()
selectDayFromCurrent(day)
} else {
cy.get('.day-cell').not('bounding-month').contains(futureDay).click()
}
})
return dateAssert
  }



export class datepickerPage 
{
selectCommonDatePickerDateFromToday(dayFromToday)
{
    cy.contains('nb-card','Common Datepicker')
    .find('input')
    .then(input =>
        {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(dayFromToday)
        cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
        cy.wrap(input).should('have.value', dateAssert)
        })
}

selectDatePickerWithRangeFromToday(firstDay, secondDay)
{
    cy.contains('nb-card','Datepicker With Range')
    .find('input')
    .then(input =>
        {
        cy.wrap(input).click()
        let dateAssertFirst = selectDayFromCurrent(firstDay)
        let dateAssertSecond = selectDayFromCurrent(secondDay)
        const finalDate = dateAssertFirst+' - '+dateAssertSecond
        cy.wrap(input).invoke('prop','value').should('contain',finalDate)
        cy.wrap(input).should('have.value', finalDate)
        })
}

}

export const onDatePickerPage = new datepickerPage()