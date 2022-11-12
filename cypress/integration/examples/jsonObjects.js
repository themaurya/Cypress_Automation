/// <reference types = "Cypress" />

describe('JSON Objects', () =>
{
    it('JSON Objects', () =>
    {
        cy.openHomePage()

        const simpleObject = {'key1' : 'value1', 'key2' : 'value2'}

        const simpleArrayOfValues = ['one', 'two', 'three']

        const arrayOfObjects = [{'key1' : 'value1'}, {'key2' : 'value2'}, {'key3' : 'value3'}]

        const typesOfData = {"string" : "This is a string", "number" : 10}

        const mix = {
            "firstName" : "Prakash",
            "lastName" : "Sharma",
            "age" : 35,
            "students" : [
                {
                    "firstName" : "Dinesh",
                    "lastName" : "Pundit"
                },{
                    "firstName" : "Nilo",
                    "lastName" : "Boro"
                }
            ]

        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[2].key3)
        console.log(mix.students[1].firstName)
        console.log(mix.students[1].lastName)
    })
  

})