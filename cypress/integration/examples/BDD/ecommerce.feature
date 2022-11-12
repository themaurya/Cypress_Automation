Feature: End to end ecommerce validation

    Buy a product from GreenKart
    @regression
    Scenario: Ecommerce products delivery
    Given I open ecommerce page
    When I add items to cart
    And validate the total price
    Then select the country and verify success message

    @smoke
    Scenario: Filling the form to shop
    Given I open ecommerce page
    When I fill the form details
    |name|gender|
    |david|Male|
    Then validate the form behaviour
    And select the shop page
    