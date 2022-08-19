Feature: Filtering and Comparison related test cases

  Background:
    Given I reset the webcontainer

#----------------------------------------------------------------------------------------------------------------------
# TEST CASE: As a Customer I can filter cryptocurrency prices compare content
#----------------------------------------------------------------------------------------------------------------------
  Scenario: Filter Cryptocurrency prices table and compare data before and after filtering
    Given I goto LANDING page
    And I remove any popup in homepage
    Then I can see cryptocurrency price table
    And I filter table to 20 rows
    And I browse crypto table and capture page contents
    And I note currency names from current table
    When I filter Algorithm crypto table with value PoW
    And I open More Filters window
    And I toggle Mineable option in More Filters
    And I select option Coins for Cryptocurrencies in More Filters
    And I select minimum price to 100 and maximum price to 10000 in More Filters
    And I close More Filters window
    Then I browse crypto table and capture page contents
    And I do see common currency name with noted ones in the new list
